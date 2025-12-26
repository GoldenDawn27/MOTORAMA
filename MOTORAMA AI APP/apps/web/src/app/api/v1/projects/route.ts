import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/server/prisma";
import { requireAuth } from "@/server/auth";

export async function POST(req: NextRequest) {
  requireAuth(req);
  const body = await req.json();
  const { name, brand, variant_name } = body ?? {};
  if (!name || !brand || !variant_name) {
    return NextResponse.json({ error: "bad_request", message: "name, brand, variant_name required" }, { status: 400 });
  }
  const project = await prisma.project.create({
    data: { name, brand, variants: { create: { variant_name } } }
  });
  return NextResponse.json({
    project_id: project.project_id,
    name: project.name,
    brand: project.brand,
    created_at: project.created_at.toISOString(),
    updated_at: project.updated_at.toISOString()
  }, { status: 201 });
}
