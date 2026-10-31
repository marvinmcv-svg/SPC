import { describe, expect, it } from "vitest";
import { dewPointC, fieldJointVolume, litresFor, scaledCureHours, spreadingRate, vocSavings } from "@/lib/calc";

describe("litresFor", () => {
  it("1 m² at 1000 µm of 100% solids is 1 L", () => {
    expect(litresFor(1, 1000).theoretical).toBeCloseTo(1);
  });
  it("applies volume solids and loss", () => {
    const r = litresFor(10, 500, 50, 20);
    expect(r.theoretical).toBeCloseTo(10);
    expect(r.withLoss).toBeCloseTo(12);
  });
});

describe("fieldJointVolume", () => {
  it("computes area and kits for a 24-inch line", () => {
    const r = fieldJointVolume({ odMm: 609.6, joints: 100, cutbackMm: 150, overlapMm: 50, dftUm: 1016, lossPct: 0, kitLitres: 4 });
    // π × 0.6096 m × 0.4 m ≈ 0.766 m² per joint
    expect(r.areaPerJointM2).toBeCloseTo(0.766, 2);
    expect(r.theoreticalLitres).toBeCloseTo(77.8, 0);
    expect(r.kits).toBe(20);
  });
});

describe("site-condition helpers", () => {
  it("dew point at 20 °C / 50% RH ≈ 9.3 °C", () => {
    expect(dewPointC(20, 50)).toBeCloseTo(9.3, 0);
  });
  it("cure time doubles per 10 °C drop", () => {
    expect(scaledCureHours(8, 25, 15)).toBeCloseTo(16);
  });
  it("spreading rate at 500 µm is 2 m²/L", () => {
    expect(spreadingRate(500)).toBeCloseTo(2);
  });
});

describe("vocSavings", () => {
  it("SPC uses less material and avoids VOC", () => {
    const r = vocSavings({ areaM2: 100, dftUm: 500, altSolidsPct: 50, altVocGPerL: 400, lossPct: 0 });
    expect(r.spcLitres).toBeCloseTo(50);
    expect(r.altLitres).toBeCloseTo(100);
    expect(r.vocKgAvoided).toBeCloseTo(40);
    expect(r.co2eKgAvoided).toBeGreaterThan(r.vocKgAvoided);
  });
});
