import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/server/prisma";
import { requireAuth } from "@/server/auth";

export async function GET(req: NextRequest) {
  requireAuth(req);
  const seedRankLte = new URL(req.url).searchParams.get("seed_rank_lte");
  const where: any = {};
  if (seedRankLte) where.seed_rank = { lte: Number(seedRankLte) };
  const items = await prisma.vehicle.findMany({ where, orderBy: { seed_rank: "asc" }, take: 200 });
  return NextResponse.json({ items, next_cursor: null });
}
