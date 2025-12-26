-- Motorama V3 Compendium Schema (PostgreSQL)
-- Generated: 2026-12-25

CREATE TABLE IF NOT EXISTS brands (
  brand_id UUID PRIMARY KEY,
  name TEXT UNIQUE NOT NULL,
  country_origin TEXT,
  founded_year INT,
  defunct_year INT,
  status TEXT CHECK (status IN ('active','defunct')) NOT NULL DEFAULT 'active',
  design_philosophy TEXT,
  official_site TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS terminology_terms (
  term_id UUID PRIMARY KEY,
  term TEXT NOT NULL,
  category TEXT NOT NULL,
  definition TEXT NOT NULL,
  synonyms TEXT[] DEFAULT '{}',
  notes TEXT,
  UNIQUE(term, category)
);

CREATE TABLE IF NOT EXISTS vehicles (
  vehicle_id UUID PRIMARY KEY,
  brand_id UUID NOT NULL REFERENCES brands(brand_id) ON DELETE CASCADE,
  model_name TEXT NOT NULL,
  generation_name TEXT,
  generation_code TEXT,
  year_start INT,
  year_end INT,
  segment_class_term_id UUID REFERENCES terminology_terms(term_id),
  body_style_term_id UUID REFERENCES terminology_terms(term_id),
  production_status TEXT CHECK (production_status IN ('production','concept','race','oneoff','prototype')) NOT NULL DEFAULT 'production',
  notes TEXT,
  seed_rank INT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_vehicles_brand_model ON vehicles(brand_id, model_name);
CREATE INDEX IF NOT EXISTS idx_vehicles_years ON vehicles(year_start, year_end);

CREATE TABLE IF NOT EXISTS variants (
  variant_id UUID PRIMARY KEY,
  vehicle_id UUID NOT NULL REFERENCES vehicles(vehicle_id) ON DELETE CASCADE,
  variant_name TEXT NOT NULL,
  market_region TEXT NOT NULL DEFAULT 'global',
  production_volume INT,
  homologation_class TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_variants_vehicle ON variants(vehicle_id);

CREATE TABLE IF NOT EXISTS engines (
  engine_id UUID PRIMARY KEY,
  configuration TEXT,
  displacement_l DOUBLE PRECISION,
  induction TEXT,
  fuel TEXT
);

CREATE TABLE IF NOT EXISTS batteries (
  battery_id UUID PRIMARY KEY,
  capacity_kwh DOUBLE PRECISION,
  chemistry TEXT,
  nominal_voltage_v INT,
  pack_location TEXT
);

CREATE TABLE IF NOT EXISTS edrives (
  edrive_id UUID PRIMARY KEY,
  motor_count INT,
  motor_location TEXT,
  inverter_type TEXT
);

CREATE TABLE IF NOT EXISTS powertrains (
  powertrain_id UUID PRIMARY KEY,
  variant_id UUID NOT NULL REFERENCES variants(variant_id) ON DELETE CASCADE,
  type TEXT NOT NULL,
  layout TEXT NOT NULL,
  engine_id UUID REFERENCES engines(engine_id),
  battery_id UUID REFERENCES batteries(battery_id),
  edrive_id UUID REFERENCES edrives(edrive_id),
  total_power_kw DOUBLE PRECISION,
  total_torque_nm DOUBLE PRECISION
);
CREATE INDEX IF NOT EXISTS idx_powertrains_variant ON powertrains(variant_id);

CREATE TABLE IF NOT EXISTS chassis (
  chassis_id UUID PRIMARY KEY,
  variant_id UUID NOT NULL REFERENCES variants(variant_id) ON DELETE CASCADE,
  structure TEXT,
  materials_primary TEXT,
  susp_front TEXT,
  susp_rear TEXT,
  steering TEXT,
  rear_steer BOOLEAN DEFAULT false
);

CREATE TABLE IF NOT EXISTS dimensions (
  dimensions_id UUID PRIMARY KEY,
  variant_id UUID NOT NULL REFERENCES variants(variant_id) ON DELETE CASCADE,
  wheelbase_mm INT,
  track_f_mm INT,
  track_r_mm INT,
  length_mm INT,
  width_mm INT,
  height_mm INT,
  ride_height_mm INT,
  overhang_f_mm INT,
  overhang_r_mm INT
);

CREATE TABLE IF NOT EXISTS performance (
  performance_id UUID PRIMARY KEY,
  variant_id UUID NOT NULL REFERENCES variants(variant_id) ON DELETE CASCADE,
  curb_weight_kg DOUBLE PRECISION,
  zero_to_60_s DOUBLE PRECISION,
  quarter_mile_s DOUBLE PRECISION,
  top_speed_kph DOUBLE PRECISION,
  range_km DOUBLE PRECISION
);

CREATE TABLE IF NOT EXISTS aero (
  aero_id UUID PRIMARY KEY,
  variant_id UUID NOT NULL REFERENCES variants(variant_id) ON DELETE CASCADE,
  cd DOUBLE PRECISION,
  cl_downforce DOUBLE PRECISION,
  frontal_area_m2 DOUBLE PRECISION,
  active_aero BOOLEAN,
  notes TEXT
);

CREATE TABLE IF NOT EXISTS media_assets (
  asset_id UUID PRIMARY KEY,
  entity_type TEXT NOT NULL,
  entity_id UUID NOT NULL,
  asset_type TEXT NOT NULL,
  url_or_path TEXT NOT NULL,
  caption TEXT,
  tags TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_media_assets_entity ON media_assets(entity_type, entity_id);

CREATE TABLE IF NOT EXISTS sources (
  source_id UUID PRIMARY KEY,
  type TEXT NOT NULL,
  citation TEXT NOT NULL,
  url TEXT,
  date_accessed DATE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS claims (
  claim_id UUID PRIMARY KEY,
  entity_type TEXT NOT NULL,
  entity_id UUID NOT NULL,
  field TEXT NOT NULL,
  value TEXT NOT NULL,
  source_id UUID REFERENCES sources(source_id),
  confidence DOUBLE PRECISION CHECK (confidence >= 0 AND confidence <= 1),
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_claims_entity ON claims(entity_type, entity_id);
