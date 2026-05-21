import type { FarmingMode } from '../types';

/** Classify farming from food-crop share and commercialization (subsistence → cash crop). */
export function deriveFarmingMode(
  foodCropShare: number,
  commercializationIndex: number
): FarmingMode {
  if (foodCropShare >= 72 && commercializationIndex < 35) return 'subsistence';
  if (foodCropShare <= 48 || commercializationIndex >= 62) return 'cash_crop';
  return 'transitional';
}

export const FARMING_MODE_LABELS: Record<FarmingMode, string> = {
  subsistence: 'Primarily subsistence',
  transitional: 'Mixed / shifting',
  cash_crop: 'Cash crop oriented',
};

export const CASH_CROPS = new Set([
  'cotton',
  'indigo',
  'jute',
  'opium',
  'tea',
  'sugarcane',
  'groundnut',
]);
