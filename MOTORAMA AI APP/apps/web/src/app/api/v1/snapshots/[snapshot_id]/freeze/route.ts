import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/server/prisma";
import { requireAuth } from "@/server/auth";

export async function POST(req: NextRequest, { params }: { params: { snapshot_id: string } }) {
  requireAuth(req);
  const snap = await prisma.engineeringSnapshot.findUnique({ where: { snapshot_id: params.snapshot_id } });
  if (!snap) return NextResponse.json({ error: "not_found", message: "Snapshot not found" }, { status: 404 });

  const updated = await prisma.engineeringSnapshot.update({
    where: { snapshot_id: params.snapshot_id },
    data: { lock_state: "frozen" }
  });

  return NextResponse.json({
    snapshot_id: updated.snapshot_id,
    project_id: updated.project_id,
    variant_id: updated.variant_id,
    created_at: updated.created_at.toISOString(),
    created_by: updated.created_by,
    lock_state: updated.lock_state,
    inputs: updated.inputs,
    computed: updated.computed,
    validation: updated.validation
  });
}
