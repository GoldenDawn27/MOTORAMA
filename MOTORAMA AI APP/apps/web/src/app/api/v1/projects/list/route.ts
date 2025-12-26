import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/server/prisma";
import { requireAuth } from "@/server/auth";

export async function GET(req: NextRequest) {
  requireAuth(req);
  const items = await prisma.project.findMany({ orderBy: { created_at: "desc" }, take: 50 });
  return NextResponse.json({ items, next_cursor: null });
}
