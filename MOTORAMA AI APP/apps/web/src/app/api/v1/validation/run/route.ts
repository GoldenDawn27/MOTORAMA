import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/server/prisma";
import { requireAuth } from "@/server/auth";
import ruleset from "@motorama/shared/src/validation/rulesets/motorama_validation_rules_v2.json";
import { loadRulesFromJson, runValidation } from "@motorama/shared";

export async function POST(req: NextRequest) {
  requireAuth(req);
  const body = await req.json();
  const { snapshot_id } = body ?? {};
  if (!snapshot_id) return NextResponse.json({ error: "bad_request", message: "snapshot_id required" }, { status: 400 });

  const snap = await prisma.engineeringSnapshot.findUnique({ where: { snapshot_id } });
  if (!snap) return NextResponse.json({ error: "not_found", message: "Snapshot not found" }, { status: 404 });

  const rules = loadRulesFromJson(ruleset);
  const result = runValidation({ inputs: snap.inputs, computed: snap.computed }, rules);

  await prisma.engineeringSnapshot.update({ where: { snapshot_id }, data: { validation: result } });

  return NextResponse.json({
    snapshot_id,
    errors: result.errors,
    warnings: result.warnings,
    notes: result.notes,
    engineering_readiness_score: result.engineering_readiness_score
  });
}
