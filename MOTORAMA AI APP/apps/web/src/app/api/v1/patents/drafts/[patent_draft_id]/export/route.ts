import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/server/auth";
import { randomUUID } from "node:crypto";

export async function POST(req: NextRequest, { params }: { params: { patent_draft_id: string } }) {
  requireAuth(req);
  return NextResponse.json({ patent_draft_id: params.patent_draft_id, asset_id: randomUUID(), status: "ready" });
}
