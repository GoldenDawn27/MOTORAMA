import { NextResponse } from "next/server";
import { readData } from "@/server/storage";

export const GET = async (request: Request) => {
  const { searchParams } = new URL(request.url);
  const seedRankParam = searchParams.get("seed_rank_lte");
  const seedRankLimit = seedRankParam ? Number(seedRankParam) : null;

  const data = await readData();
  const vehicles = seedRankLimit
    ? data.vehicles.filter((vehicle) =>
        typeof vehicle.seed_rank === "number" && vehicle.seed_rank <= seedRankLimit
      )
    : data.vehicles;

  return NextResponse.json({ vehicles });
};
