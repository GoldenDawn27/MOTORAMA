import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/server/prisma";
import { requireAuth } from "@/server/auth";

export async function GET(req: NextRequest, { params }: { params: { patent_draft_id: string } }) {
  requireAuth(req);
  const draft = await prisma.patentDraft.findUnique({ where: { patent_draft_id: params.patent_draft_id } });
  if (!draft) return NextResponse.json({ error: "not_found", message: "Patent draft not found" }, { status: 404 });
  return NextResponse.json({
    patent_draft_id: draft.patent_draft_id,
    project_id: draft.project_id,
    variant_id: draft.variant_id,
    snapshot_id: draft.snapshot_id,
    type: draft.type,
    status: draft.status,
    created_at: draft.created_at.toISOString(),
    sections: draft.sections,
    terminology_report: draft.terminology_report,
    readiness: draft.readiness
  });
}
