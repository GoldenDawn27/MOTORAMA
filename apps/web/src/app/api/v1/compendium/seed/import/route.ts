import { NextResponse } from "next/server";
import { readData, writeData } from "@/server/storage";

export const POST = async (request: Request) => {
  const body = (await request.json().catch(() => null)) as {
    vehicles?: Array<{
      id?: string;
      brand_id?: string;
      model_name?: string;
      year_start?: number;
      year_end?: number | null;
      seed_rank?: number;
    }>;
  } | null;

  if (!body?.vehicles || body.vehicles.length === 0) {
    return NextResponse.json(
      { error: "Provide a vehicles array to import." },
      { status: 400 }
    );
  }

  const normalized = body.vehicles.map((vehicle) => ({
    id: vehicle.id ?? crypto.randomUUID(),
    brand_id: vehicle.brand_id ?? "",
    model_name: vehicle.model_name ?? "",
    year_start: vehicle.year_start ?? 0,
    year_end: vehicle.year_end ?? null,
    seed_rank: vehicle.seed_rank
  }));

  const data = await readData();
  data.vehicles = normalized;
  await writeData(data);

  return NextResponse.json({ vehicles: data.vehicles });
};
