import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/server/prisma";
import { requireAuth } from "@/server/auth";

export async function POST(req: NextRequest) {
  requireAuth(req);
  const body = await req.json();
  const { project_id, variant_id, snapshot_id, type } = body ?? {};
  if (!project_id || !variant_id || !snapshot_id || !type) {
    return NextResponse.json({ error: "bad_request", message: "project_id, variant_id, snapshot_id, type required" }, { status: 400 });
  }

  const sections = [
    { anchor_id: "sec.title", title: "Title", content: "Vehicle System", locked_until_accept: false },
    { anchor_id: "sec.background", title: "Background", content: "Background information...", locked_until_accept: false },
    { anchor_id: "sec.summary", title: "Summary", content: "Summary of the invention...", locked_until_accept: false },
    { anchor_id: "sec.detailed_description", title: "Detailed Description", content: "Detailed description...", locked_until_accept: false },
    { anchor_id: "sec.claims", title: "Claims", content: "1. A vehicle comprising...", locked_until_accept: true }
  ];

  const draft = await prisma.patentDraft.create({
    data: { project_id, variant_id, snapshot_id, type, status: "draft", sections, terminology_report: { warnings: [], errors: [] }, readiness: { score: 0, missing_items: [] } }
  });

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
  }, { status: 201 });
}
