import { NextResponse } from "next/server";
import { readData, writeData } from "@/server/storage";

export const POST = async (request: Request) => {
  const body = (await request.json().catch(() => null)) as {
    name?: string;
    brand?: string;
  } | null;

  if (!body?.name || !body?.brand) {
    return NextResponse.json(
      { error: "Both name and brand are required." },
      { status: 400 }
    );
  }

  const data = await readData();
  const project = {
    id: crypto.randomUUID(),
    name: body.name,
    brand: body.brand,
    created_at: new Date().toISOString()
  };

  data.projects.unshift(project);
  await writeData(data);

  return NextResponse.json({ project });
};
