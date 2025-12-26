import ruleset from "@motorama/shared/src/validation/rulesets/motorama_validation_rules_v2.json";
import { loadRulesFromJson, runValidation } from "@motorama/shared";
import { describe, it, expect } from "vitest";

describe("validation engine", () => {
  it("flags EV-202 when cooling is undersized", () => {
    const rules = loadRulesFromJson(ruleset);
    const result = runValidation(
      { inputs: { powertrain: { type: "EV", battery: { capacity_kwh: 60, nominal_voltage_v: 400 } }, thermal: { cooling_package_size: "S", battery_loop: "shared" } }, computed: { total_power_kw: 700 } },
      rules
    );
    expect(result.errors.some(e => e.rule_id === "EV-202")).toBe(true);
  });
});
