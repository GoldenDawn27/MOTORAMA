import { NextResponse } from "next/server";
import { readData } from "@/server/storage";

export const GET = async () => {
  const data = await readData();
  return NextResponse.json({ projects: data.projects });
};
