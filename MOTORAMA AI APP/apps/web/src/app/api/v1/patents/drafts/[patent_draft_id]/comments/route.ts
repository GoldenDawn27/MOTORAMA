import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/server/prisma";
import { requireAuth } from "@/server/auth";

export async function POST(req: NextRequest, { params }: { params: { patent_draft_id: string } }) {
  requireAuth(req);
  const body = await req.json();
  const { anchor_id, range, severity, comment_text, creates_task } = body ?? {};
  if (!anchor_id || !range || !severity || !comment_text) {
    return NextResponse.json({ error: "bad_request", message: "anchor_id, range, severity, comment_text required" }, { status: 400 });
  }

  const comment = await prisma.counselComment.create({
    data: { patent_draft_id: params.patent_draft_id, anchor_id, range, severity, comment_text, created_by: { role: "counsel", user_id: "unknown" }, status: "open", creates_task: !!creates_task }
  });

  const task = creates_task ? await prisma.counselTask.create({
    data: {
      comment_id: comment.comment_id,
      title: "Define thermal isolation structure",
      linked_screen: "EngineeringBay.Thermal",
      linked_field_paths: ["inputs.thermal.battery_loop","inputs.thermal.cooling_package_size"],
      acceptance_criteria: [
        "Dedicated battery loop selected in engineering snapshot",
        "Detailed Description includes isolation structure narrative",
        "Dependent claim added referencing enclosure and coolant loop"
      ],
      status: "open"
    }
  }) : null;

  return NextResponse.json({
    comment_id: comment.comment_id,
    patent_draft_id: comment.patent_draft_id,
    anchor_id: comment.anchor_id,
    range: comment.range,
    severity: comment.severity,
    comment_text: comment.comment_text,
    created_by: comment.created_by,
    created_at: comment.created_at.toISOString(),
    status: comment.status,
    creates_task: comment.creates_task,
    task
  }, { status: 201 });
}
