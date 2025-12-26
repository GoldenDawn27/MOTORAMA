import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/server/prisma";
import { requireAuth } from "@/server/auth";

export async function GET(req: NextRequest) {
  requireAuth(req);
  const status = new URL(req.url).searchParams.get("status") ?? "open";
  const items = await prisma.counselTask.findMany({ where: { status }, take: 200 });
  return NextResponse.json({ items });
}
