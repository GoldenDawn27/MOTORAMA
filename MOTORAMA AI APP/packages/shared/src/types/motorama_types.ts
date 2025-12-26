/**
 * Motorama Shared Types (V1/V2/V3)
 * Generated: 2026-12-25
 */

export type UUID = string;
export type ISODateTime = string;

export type ProductionStatus = "production" | "concept" | "race" | "oneoff" | "prototype";
export type MarketRegion = "global" | "na" | "eu" | "asia" | "me" | "other";

export interface Brand {
  brand_id: UUID;
  name: string;
  country_origin?: string | null;
  founded_year?: number | null;
  defunct_year?: number | null;
  status: "active" | "defunct";
  design_philosophy?: string | null;
  official_site?: string | null;
  created_at?: ISODateTime;
  updated_at?: ISODateTime;
}

export interface TerminologyTerm {
  term_id: UUID;
  term: string;
  category: string; // e.g. "body_style" | "class" | "layout"
  definition: string;
  synonyms?: string[];
  notes?: string | null;
}

export interface Vehicle {
  vehicle_id: UUID;
  brand_id: UUID;
  model_name: string;
  generation_name?: string | null;
  generation_code?: string | null;
  year_start?: number | null;
  year_end?: number | null;
  segment_class_term_id?: UUID | null;
  body_style_term_id?: UUID | null;
  production_status: ProductionStatus;
  notes?: string | null;
  seed_rank?: number | null;
}

export interface Variant {
  variant_id: UUID;
  vehicle_id: UUID;
  variant_name: string;
  market_region: MarketRegion;
  production_volume?: number | null;
  homologation_class?: string | null;
  notes?: string | null;
}

export interface Powertrain {
  powertrain_id: UUID;
  variant_id: UUID;
  type: string;   // ICE/HEV/PHEV/EV/quad_motor/other
  layout: string; // FR/MR/RR/AWD/OTHER
  engine_id?: UUID | null;
  battery_id?: UUID | null;
  edrive_id?: UUID | null;
  total_power_kw?: number | null;
  total_torque_nm?: number | null;
}

export interface Chassis {
  chassis_id: UUID;
  variant_id: UUID;
  structure?: string | null;
  materials_primary?: string | null;
  susp_front?: string | null;
  susp_rear?: string | null;
  steering?: string | null;
  rear_steer?: boolean;
}

export interface Dimensions {
  dimensions_id: UUID;
  variant_id: UUID;
  wheelbase_mm?: number | null;
  track_f_mm?: number | null;
  track_r_mm?: number | null;
  length_mm?: number | null;
  width_mm?: number | null;
  height_mm?: number | null;
  ride_height_mm?: number | null;
  overhang_f_mm?: number | null;
  overhang_r_mm?: number | null;
}

export interface Performance {
  performance_id: UUID;
  variant_id: UUID;
  curb_weight_kg?: number | null;
  zero_to_60_s?: number | null;
  quarter_mile_s?: number | null;
  top_speed_kph?: number | null;
  range_km?: number | null;
}

export interface Aero {
  aero_id: UUID;
  variant_id: UUID;
  cd?: number | null;
  cl_downforce?: number | null;
  frontal_area_m2?: number | null;
  active_aero?: boolean | null;
  notes?: string | null;
}

export interface V3SeedDataset {
  meta: {
    dataset: string;
    generated_at: ISODateTime;
    counts: { brands: number; vehicles: number; variants: number; terminology_terms: number };
  };
  brands: Brand[];
  terminology_terms: TerminologyTerm[];
  vehicles: Vehicle[];
  variants: Variant[];
  powertrains: Powertrain[];
  chassis: Chassis[];
  dimensions: Dimensions[];
  performance: Performance[];
  aero: Aero[];
}

/** Validation */
export type ValidationSeverity = "NOTE" | "WARN" | "FAIL";

export interface FixActionPatch {
  op: "replace" | "add" | "remove";
  path: string;
  value?: any;
}

export interface FixAction {
  id: string;
  label: string;
  type: "patch" | "navigate";
  patch?: FixActionPatch[];
  navigate_to?: string;
  safe: boolean;
}

export interface ValidationRule {
  rule_id: string;
  title: string;
  severity: ValidationSeverity;
  category: string; // EV, AERO, etc.
  screen: string;   // e.g. EngineeringBay.Aero
  field_paths: string[];
  when: { all: Array<{ path: string; op: string; value: any }> };
  logic: {
    type: "threshold";
    conditions: Array<{
      if: { all: Array<{ path: string; op: string; value: any }> };
      then: { severity: ValidationSeverity; code: string };
    }>;
  };
  message: string;
  fix_actions: FixAction[];
}

export interface ValidationFinding {
  finding_id: UUID;
  rule_id: string;
  severity: ValidationSeverity;
  screen: string;
  field_path: string;
  code: string;
  message: string;
  suggested_fix_action_ids: string[];
  created_at: ISODateTime;
}

/** Engineering Snapshot */
export type LockState = "draft" | "frozen" | "locked";

export interface EngineeringSnapshot {
  snapshot_id: UUID;
  project_id: UUID;
  variant_id: UUID;
  created_at: ISODateTime;
  created_by: { actor_type: "user" | "ai"; actor_id: UUID; persona?: string };
  lock_state: LockState;

  inputs: {
    classification: {
      vehicle_class_term_id: UUID;
      body_style_term_id: UUID;
      seating: "2" | "2+2" | "5" | "7";
      intent: "road" | "track" | "mixed" | "offroad";
    };
    architecture: {
      layout: "FR" | "MR" | "RR" | "AWD" | "OTHER";
      platform: "monocoque" | "spaceframe" | "unibody" | "skateboard" | "other";
      materials_primary: "aluminum" | "steel" | "carbon" | "mixed" | "other";
    };
    dimensions: {
      wheelbase_mm: number;
      track_f_mm: number;
      track_r_mm: number;
      ride_height_mm: number;
      overhang_f_mm: number;
      overhang_r_mm: number;
      wheel_diameter_in: number;
      tire_class: "touring" | "performance" | "track" | "offroad";
    };
    powertrain: {
      type: "ICE" | "HEV" | "PHEV" | "EV" | "quad_motor" | "other";
      engine?: { configuration: string; displacement_l: number; induction: string };
      electric?: { motor_count: number; motor_location: "axle" | "in_wheel" | "mixed"; power_per_motor_kw: number };
      battery?: { capacity_kwh: number; nominal_voltage_v: number; chemistry: string; pack_zones: string[] };
      driveline?: { driven_wheels: "FWD" | "RWD" | "AWD"; transmission: string };
    };
    thermal: {
      cooling_layout: "front" | "sidepods" | "rear_assist" | "mixed";
      cooling_package_size: "S" | "M" | "L";
      active_shutters: boolean;
      battery_loop: "none" | "shared" | "dedicated";
      notes?: string;
    };
    dynamics: {
      susp_front: string;
      susp_rear: string;
      rear_steer: boolean;
      torque_vectoring: "none" | "brake_based" | "electric" | "mixed";
    };
    aero: {
      active_aero: boolean;
      cd: number;
      cl_downforce: number;
      frontal_area_m2: number;
      balance_strategy: string;
      failsafe_defined: boolean;
    };
    manufacturing: {
      volume: "low" | "medium" | "high";
      process: "handbuilt" | "mixed" | "automated";
      supplier_strategy: "inhouse" | "outsourced" | "mixed";
    };
  };

  computed: {
    total_power_kw?: number;
    total_torque_nm?: number;
    curb_weight_kg_est?: number;
    weight_distribution_target?: string;
    range_km_est?: number;
    top_speed_kph_est?: number;
  };

  validation: {
    errors: ValidationFinding[];
    warnings: ValidationFinding[];
    notes: ValidationFinding[];
    engineering_readiness_score: number;
  };
}

/** Patent Drafting */
export type PatentType = "design" | "utility";
export type PatentStatus = "draft" | "ready_for_review" | "counsel_review" | "approved_for_filing";

export interface PatentSection {
  anchor_id: string; // e.g. sec.claims
  title: string;
  content: string;
  locked_until_accept: boolean;
}

export interface PatentDraft {
  patent_draft_id: UUID;
  project_id: UUID;
  variant_id: UUID;
  snapshot_id: UUID;
  type: PatentType;
  status: PatentStatus;
  created_at: ISODateTime;
  sections: PatentSection[];
  terminology_report?: { warnings: any[]; errors: any[] };
  readiness?: { score: number; missing_items: string[] };
}

export interface CounselComment {
  comment_id: UUID;
  patent_draft_id: UUID;
  anchor_id: string;
  range: { start: number; end: number };
  severity: "info" | "warn" | "blocker";
  comment_text: string;
  created_by: { role: "counsel"; user_id: UUID };
  created_at: ISODateTime;
  status: "open" | "resolved" | "dismissed";
  creates_task: boolean;
  task?: {
    task_id: UUID;
    title: string;
    linked_screen: string;
    linked_field_paths: string[];
    acceptance_criteria: string[];
  };
}

export interface PatentChatSuggestion {
  suggestion_id: UUID;
  patent_draft_id: UUID;
  anchor_id: string;
  suggested_text: string;
  requires_user_acceptance: boolean;
  source_snapshot_id: UUID;
  created_by_persona: string;
  created_at: ISODateTime;
}
