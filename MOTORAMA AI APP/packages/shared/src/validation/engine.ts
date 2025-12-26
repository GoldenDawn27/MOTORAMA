import { ValidationRule, ValidationFinding, ValidationSeverity, ValidationRuleSchema } from "./ruleTypes";
import { randomUUID } from "node:crypto";

type AnyObj = Record<string, any>;

function getPath(obj: AnyObj, path: string): any {
  return path.split(".").reduce((acc, key) => (acc == null ? acc : acc[key]), obj);
}

function cmp(op: string, left: any, right: any): boolean {
  switch (op) {
    case "==": return left === right;
    case "!=": return left !== right;
    case ">": return typeof left === "number" && left > right;
    case ">=": return typeof left === "number" && left >= right;
    case "<": return typeof left === "number" && left < right;
    case "<=": return typeof left === "number" && left <= right;
    case "in": return Array.isArray(right) && right.includes(left);
    default: return false;
  }
}

function matchAll(snapshot: AnyObj, conditions: Array<{path:string; op:string; value:any}>): boolean {
  return conditions.every(c => cmp(c.op, getPath(snapshot, c.path), c.value));
}

export function loadRulesFromJson(json: any): ValidationRule[] {
  const rules = Array.isArray(json?.rules) ? json.rules : [];
  return rules.map((r: any) => ValidationRuleSchema.parse(r));
}

export function runValidation(snapshot: AnyObj, rules: ValidationRule[]): {
  errors: ValidationFinding[];
  warnings: ValidationFinding[];
  notes: ValidationFinding[];
  engineering_readiness_score: number;
} {
  const errors: ValidationFinding[] = [];
  const warnings: ValidationFinding[] = [];
  const notes: ValidationFinding[] = [];

  for (const rule of rules) {
    if (!matchAll(snapshot, rule.when.all)) continue;

    for (const cond of rule.logic.conditions) {
      if (!matchAll(snapshot, cond.if.all)) continue;

      const sev = cond.then.severity as ValidationSeverity;
      const finding: ValidationFinding = {
        finding_id: randomUUID(),
        rule_id: rule.rule_id,
        severity: sev,
        screen: rule.screen,
        field_path: rule.field_paths[0] ?? "",
        code: cond.then.code,
        message: rule.message,
        suggested_fix_action_ids: rule.fix_actions.map(a => a.id),
        created_at: new Date().toISOString()
      };

      if (sev === "FAIL") errors.push(finding);
      else if (sev === "WARN") warnings.push(finding);
      else notes.push(finding);

      break; // one finding per rule per run
    }
  }

  let score = 100 - errors.length * 20 - warnings.length * 5;
  if (score < 0) score = 0;

  return { errors, warnings, notes, engineering_readiness_score: score };
}
