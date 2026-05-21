import { scaleLinear } from 'd3-scale';
import type { FarmingMode, FamineSeverity } from '../types';

/** Subsistence (green-brown) → transitional (tan) → cash crop (deep amber). */
export const FARMING_MODE_COLORS: Record<FarmingMode, string> = {
  subsistence: '#4a7c59',
  transitional: '#b8956b',
  cash_crop: '#b45309',
};

export function colorForCommercialization(value: number): string {
  return scaleLinear<string>()
    .domain([15, 40, 65, 85])
    .range(['#4a7c59', '#7d9b6a', '#c4a574', '#b45309'])
    .clamp(true)(value);
}

export const FAMINE_COLORS: Record<FamineSeverity, string> = {
  moderate: '#dc2626',
  severe: '#991b1b',
  catastrophic: '#450a0a',
};

export function famineOpacity(severity: FamineSeverity): number {
  switch (severity) {
    case 'moderate':
      return 0.35;
    case 'severe':
      return 0.55;
    case 'catastrophic':
      return 0.75;
  }
}
