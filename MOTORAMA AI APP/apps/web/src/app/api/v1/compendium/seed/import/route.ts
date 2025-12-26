import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/server/prisma";
import { requireAuth } from "@/server/auth";

export async function POST(req: NextRequest) {
  requireAuth(req);
  const body = await req.json();
  const { dataset_name, dry_run, payload } = body ?? {};
  if (!dataset_name || typeof dry_run !== "boolean" || !payload) {
    return NextResponse.json({ error: "bad_request", message: "dataset_name, dry_run, payload required" }, { status: 400 });
  }

  const inserted = { brands: 0, vehicles: 0, variants: 0, terminology_terms: 0 };
  const errors: any[] = [];

  try {
    if (dry_run) {
      inserted.brands = payload.brands?.length ?? 0;
      inserted.vehicles = payload.vehicles?.length ?? 0;
      inserted.variants = payload.variants?.length ?? 0;
      inserted.terminology_terms = payload.terminology_terms?.length ?? 0;
      return NextResponse.json({ dataset_name, dry_run, inserted, errors });
    }

    await prisma.$transaction(async (tx) => {
      for (const b of payload.brands ?? []) {
        await tx.brand.upsert({
          where: { brand_id: b.brand_id },
          update: { name: b.name, country_origin: b.country_origin, status: b.status ?? "active" },
          create: { brand_id: b.brand_id, name: b.name, country_origin: b.country_origin, status: b.status ?? "active" }
        });
        inserted.brands++;
      }

      for (const t of payload.terminology_terms ?? []) {
        await tx.terminologyTerm.upsert({
          where: { term_id: t.term_id },
          update: { term: t.term, category: t.category, definition: t.definition, synonyms: t.synonyms ?? [], notes: t.notes },
          create: { term_id: t.term_id, term: t.term, category: t.category, definition: t.definition, synonyms: t.synonyms ?? [], notes: t.notes }
        });
        inserted.terminology_terms++;
      }

      for (const v of payload.vehicles ?? []) {
        await tx.vehicle.upsert({
          where: { vehicle_id: v.vehicle_id },
          update: { brand_id: v.brand_id, model_name: v.model_name, generation_name: v.generation_name, year_start: v.year_start, year_end: v.year_end, segment_class_term_id: v.segment_class_term_id, body_style_term_id: v.body_style_term_id, production_status: v.production_status, notes: v.notes, seed_rank: v.seed_rank },
          create: { vehicle_id: v.vehicle_id, brand_id: v.brand_id, model_name: v.model_name, generation_name: v.generation_name, year_start: v.year_start, year_end: v.year_end, segment_class_term_id: v.segment_class_term_id, body_style_term_id: v.body_style_term_id, production_status: v.production_status, notes: v.notes, seed_rank: v.seed_rank }
        });
        inserted.vehicles++;
      }

      for (const cv of payload.variants ?? []) {
        await tx.compendiumVariant.upsert({
          where: { variant_id: cv.variant_id },
          update: { vehicle_id: cv.vehicle_id, variant_name: cv.variant_name, market_region: cv.market_region ?? "global", production_volume: cv.production_volume, notes: cv.notes },
          create: { variant_id: cv.variant_id, vehicle_id: cv.vehicle_id, variant_name: cv.variant_name, market_region: cv.market_region ?? "global", production_volume: cv.production_volume, notes: cv.notes }
        });
        inserted.variants++;
      }
    });
  } catch (e: any) {
    errors.push({ error: "import_failed", message: String(e?.message ?? e) });
  }

  return NextResponse.json({ dataset_name, dry_run, inserted, errors });
}
