import { useMemo } from 'react';
import { STATE_FARMING } from '../data/regionalAnchors';
import type { FarmingAnchor, FarmingAtYear, StateFarmingRecord } from '../types';
import { CASH_CROPS, deriveFarmingMode } from '../utils/farmingMode';

const recordsByKey = new Map<string, StateFarmingRecord>(
  STATE_FARMING.map((r) => [r.stateKey, r])
);

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

function interpolateAnchors(
  before: FarmingAnchor,
  after: FarmingAnchor,
  year: number
): Omit<FarmingAtYear, 'stateKey' | 'displayName' | 'year'> {
  const span = after.year - before.year;
  const t = span === 0 ? 0 : (year - before.year) / span;

  const foodCropShare = Math.round(lerp(before.foodCropShare, after.foodCropShare, t));
  const commercializationIndex = Math.round(
    lerp(before.commercializationIndex, after.commercializationIndex, t)
  );

  const useAfter = t >= 0.5;
  const dominantCrop = useAfter ? after.dominantCrop : before.dominantCrop;
  const landRevenueSystem = useAfter ? after.landRevenueSystem : before.landRevenueSystem;
  const irrigationIntensity = useAfter ? after.irrigationIntensity : before.irrigationIntensity;
  const cashCrop = useAfter ? after.cashCrop ?? after.dominantCrop : before.cashCrop ?? before.dominantCrop;
  const colonialNote = useAfter ? after.colonialNote : before.colonialNote;

  const farmingMode = deriveFarmingMode(foodCropShare, commercializationIndex);
  const resolvedCash =
    CASH_CROPS.has(cashCrop) || CASH_CROPS.has(dominantCrop)
      ? CASH_CROPS.has(cashCrop)
        ? cashCrop
        : dominantCrop
      : null;

  return {
    dominantCrop,
    landRevenueSystem,
    commercializationIndex,
    foodCropShare,
    irrigationIntensity,
    farmingMode,
    cashCrop: resolvedCash,
    colonialNote,
  };
}

function farmingForStateAtYear(record: StateFarmingRecord, year: number): FarmingAtYear {
  const { anchors, stateKey, displayName } = record;
  const sorted = [...anchors].sort((a, b) => a.year - b.year);

  if (year <= sorted[0].year) {
    const a = sorted[0];
    const mode = deriveFarmingMode(a.foodCropShare, a.commercializationIndex);
    return {
      stateKey,
      displayName,
      year,
      dominantCrop: a.dominantCrop,
      landRevenueSystem: a.landRevenueSystem,
      commercializationIndex: a.commercializationIndex,
      foodCropShare: a.foodCropShare,
      irrigationIntensity: a.irrigationIntensity,
      farmingMode: mode,
      cashCrop: a.cashCrop && CASH_CROPS.has(a.cashCrop) ? a.cashCrop : null,
      colonialNote: a.colonialNote,
    };
  }

  const last = sorted[sorted.length - 1];
  if (year >= last.year) {
    const mode = deriveFarmingMode(last.foodCropShare, last.commercializationIndex);
    return {
      stateKey,
      displayName,
      year,
      dominantCrop: last.dominantCrop,
      landRevenueSystem: last.landRevenueSystem,
      commercializationIndex: last.commercializationIndex,
      foodCropShare: last.foodCropShare,
      irrigationIntensity: last.irrigationIntensity,
      farmingMode: mode,
      cashCrop: last.cashCrop && CASH_CROPS.has(last.cashCrop) ? last.cashCrop : null,
      colonialNote: last.colonialNote,
    };
  }

  for (let i = 0; i < sorted.length - 1; i++) {
    const before = sorted[i];
    const after = sorted[i + 1];
    if (year >= before.year && year <= after.year) {
      const mid = interpolateAnchors(before, after, year);
      return { stateKey, displayName, year, ...mid };
    }
  }

  const a = sorted[0];
  const mode = deriveFarmingMode(a.foodCropShare, a.commercializationIndex);
  return {
    stateKey,
    displayName,
    year,
    dominantCrop: a.dominantCrop,
    landRevenueSystem: a.landRevenueSystem,
    commercializationIndex: a.commercializationIndex,
    foodCropShare: a.foodCropShare,
    irrigationIntensity: a.irrigationIntensity,
    farmingMode: mode,
    cashCrop: null,
    colonialNote: a.colonialNote,
  };
}

export function useFarmingAtYear(year: number): Map<string, FarmingAtYear> {
  return useMemo(() => {
    const map = new Map<string, FarmingAtYear>();
    for (const record of STATE_FARMING) {
      map.set(record.stateKey, farmingForStateAtYear(record, year));
    }
    return map;
  }, [year]);
}

export function getFarmingRecord(stateKey: string): StateFarmingRecord | undefined {
  return recordsByKey.get(stateKey);
}
