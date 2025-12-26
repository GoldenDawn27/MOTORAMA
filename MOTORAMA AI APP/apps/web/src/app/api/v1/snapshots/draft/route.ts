import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/server/prisma";
import { requireAuth } from "@/server/auth";

function compute(inputs: any) {
  const e = inputs?.powertrain?.electric;
  const total_power_kw = (e?.motor_count ?? 0) * (e?.power_per_motor_kw ?? 0);
  return { total_power_kw: total_power_kw || null, total_torque_nm: null, curb_weight_kg_est: null, range_km_est: null, top_speed_kph_est: null };
}

export async function POST(req: NextRequest) {
  requireAuth(req);
  const body = await req.json();
  const { project_id, variant_id, inputs } = body ?? {};
  if (!project_id || !variant_id || !inputs) {
    return NextResponse.json({ error: "bad_request", message: "project_id, variant_id, inputs required" }, { status: 400 });
  }
  const computed = compute(inputs);
  const snapshot = await prisma.engineeringSnapshot.create({
    data: {
      project_id,
      variant_id,
      created_by: { actor_type: "user", actor_id: "unknown", persona: "Motorama" },
      lock_state: "draft",
      inputs,
      computed,
      validation: { errors: [], warnings: [], notes: [], engineering_readiness_score: 100 }
    }
  });
  return NextResponse.json({
    snapshot_id: snapshot.snapshot_id,
    project_id: snapshot.project_id,
    variant_id: snapshot.variant_id,
    created_at: snapshot.created_at.toISOString(),
    created_by: snapshot.created_by,
    lock_state: snapshot.lock_state,
    inputs: snapshot.inputs,
    computed: snapshot.computed,
    validation: snapshot.validation
  }, { status: 201 });
}
