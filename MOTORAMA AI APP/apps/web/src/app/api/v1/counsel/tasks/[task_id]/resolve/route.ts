import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/server/prisma";
import { requireAuth } from "@/server/auth";

export async function POST(req: NextRequest, { params }: { params: { task_id: string } }) {
  requireAuth(req);
  const body = await req.json();
  const { resolution_note } = body ?? {};
  if (!resolution_note) return NextResponse.json({ error: "bad_request", message: "resolution_note required" }, { status: 400 });
  const task = await prisma.counselTask.update({ where: { task_id: params.task_id }, data: { status: "resolved", resolution_note } });
  return NextResponse.json(task);
}
