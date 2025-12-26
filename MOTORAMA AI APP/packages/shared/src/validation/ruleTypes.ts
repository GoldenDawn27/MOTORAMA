import { z } from "zod";

export const ConditionSchema = z.object({
  path: z.string(),
  op: z.string(),
  value: z.any()
});

export const WhenSchema = z.object({
  all: z.array(ConditionSchema).default([])
});

export const ThresholdConditionSchema = z.object({
  if: z.object({ all: z.array(ConditionSchema) }),
  then: z.object({
    severity: z.enum(["NOTE","WARN","FAIL"]),
    code: z.string()
  })
});

export const FixActionSchema = z.object({
  id: z.string(),
  label: z.string(),
  type: z.enum(["patch","navigate"]),
  patch: z.array(z.any()).optional(),
  navigate_to: z.string().optional(),
  safe: z.boolean()
});

export const ValidationRuleSchema = z.object({
  rule_id: z.string(),
  title: z.string(),
  severity: z.enum(["NOTE","WARN","FAIL"]),
  category: z.string(),
  screen: z.string(),
  field_paths: z.array(z.string()),
  when: WhenSchema,
  logic: z.object({
    type: z.literal("threshold"),
    conditions: z.array(ThresholdConditionSchema)
  }),
  message: z.string(),
  fix_actions: z.array(FixActionSchema)
});

export type ValidationRule = z.infer<typeof ValidationRuleSchema>;
export type ValidationSeverity = "NOTE"|"WARN"|"FAIL";

export interface ValidationFinding {
  finding_id: string;
  rule_id: string;
  severity: ValidationSeverity;
  screen: string;
  field_path: string;
  code: string;
  message: string;
  suggested_fix_action_ids: string[];
  created_at: string;
}
