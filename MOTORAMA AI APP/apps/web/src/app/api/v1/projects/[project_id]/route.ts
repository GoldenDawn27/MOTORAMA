import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/server/prisma";
import { requireAuth } from "@/server/auth";

export async function GET(req: NextRequest, { params }: { params: { project_id: string } }) {
  requireAuth(req);
  const project = await prisma.project.findUnique({ where: { project_id: params.project_id } });
  if (!project) return NextResponse.json({ error: "not_found", message: "Project not found" }, { status: 404 });
  return NextResponse.json({
    project_id: project.project_id,
    name: project.name,
    brand: project.brand,
    created_at: project.created_at.toISOString(),
    updated_at: project.updated_at.toISOString()
  });
}
