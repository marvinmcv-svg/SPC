/**
 * Pure calculation functions behind the field tools. Kept free of UI so they
 * can be unit-tested and reused by the AI assistant.
 */

const MM_PER_IN = 25.4;
export const UM_PER_MIL = 25.4;

export interface FieldJointInput {
  /** Pipe outside diameter in mm */
  odMm: number;
  joints: number;
  /** Bare cutback on EACH side of the weld, mm */
  cutbackMm: number;
  /** Overlap onto the mill coating on EACH side, mm */
  overlapMm: number;
  /** Specified dry film thickness, µm */
  dftUm: number;
  /** Application loss/waste, percent (e.g. 15) */
  lossPct: number;
  /** Volume solids, percent. 100 for SPC products. */
  solidsPct?: number;
  /** Litres per kit (from the PDS / price list) */
  kitLitres: number;
}

export interface VolumeResult {
  areaPerJointM2: number;
  totalAreaM2: number;
  theoreticalLitres: number;
  litresWithLoss: number;
  kits: number;
}

export function inchesToMm(inches: number) {
  return inches * MM_PER_IN;
}

/** Litres of coating for an area at a given DFT, solids and loss. */
export function litresFor(areaM2: number, dftUm: number, solidsPct = 100, lossPct = 0) {
  const theoretical = (areaM2 * dftUm) / 1000 / (solidsPct / 100);
  return { theoretical, withLoss: theoretical * (1 + lossPct / 100) };
}

export function fieldJointVolume(i: FieldJointInput): VolumeResult {
  const coatedWidthM = (2 * (i.cutbackMm + i.overlapMm)) / 1000;
  const areaPerJointM2 = Math.PI * (i.odMm / 1000) * coatedWidthM;
  const totalAreaM2 = areaPerJointM2 * i.joints;
  const { theoretical, withLoss } = litresFor(totalAreaM2, i.dftUm, i.solidsPct ?? 100, i.lossPct);
  return {
    areaPerJointM2,
    totalAreaM2,
    theoreticalLitres: theoretical,
    litresWithLoss: withLoss,
    kits: i.kitLitres > 0 ? Math.ceil(withLoss / i.kitLitres) : 0,
  };
}

/** Theoretical spreading rate (m²/L) at a given DFT and volume solids. */
export function spreadingRate(dftUm: number, solidsPct = 100) {
  return (10 * solidsPct) / dftUm;
}

/** Dew point (°C) using the Magnus approximation. */
export function dewPointC(airTempC: number, rhPct: number) {
  const a = 17.62;
  const b = 243.12;
  const gamma = Math.log(rhPct / 100) + (a * airTempC) / (b + airTempC);
  return (b * gamma) / (a - gamma);
}

/**
 * Rule-of-thumb cure scaling: reaction rate roughly doubles per +10 °C.
 * Use the PDS cure time at its reference temperature as the input.
 */
export function scaledCureHours(refHours: number, refTempC: number, steelTempC: number) {
  return refHours * Math.pow(2, (refTempC - steelTempC) / 10);
}

export interface VocInput {
  areaM2: number;
  dftUm: number;
  /** Volume solids of the solvent-borne alternative, % */
  altSolidsPct: number;
  /** VOC content of the solvent-borne alternative, g/L */
  altVocGPerL: number;
  lossPct: number;
}

/**
 * Approximate CO₂ from VOC oxidation: assumes ~85% carbon by mass in typical
 * coating solvents, × 44/12 for CO₂ ≈ 3.1 kg CO₂ per kg VOC.
 */
export const CO2_PER_KG_VOC = 0.85 * (44 / 12);

export function vocSavings(i: VocInput) {
  const spc = litresFor(i.areaM2, i.dftUm, 100, i.lossPct).withLoss;
  const alt = litresFor(i.areaM2, i.dftUm, i.altSolidsPct, i.lossPct).withLoss;
  const vocKg = (alt * i.altVocGPerL) / 1000;
  return {
    spcLitres: spc,
    altLitres: alt,
    solventLitresAvoided: alt - spc,
    vocKgAvoided: vocKg,
    co2eKgAvoided: vocKg * CO2_PER_KG_VOC,
  };
}

export function fmt(n: number, digits = 1) {
  if (!Number.isFinite(n)) return "—";
  return n.toLocaleString("en-US", { maximumFractionDigits: digits, minimumFractionDigits: 0 });
}
