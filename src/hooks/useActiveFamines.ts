import { useMemo } from 'react';
import faminesData from '../data/famines.json';
import type { FamineEvent } from '../types';

const famines = faminesData as FamineEvent[];

export function useActiveFamines(year: number): FamineEvent[] {
  return useMemo(
    () => famines.filter((f) => year >= f.startYear && year <= f.endYear),
    [year]
  );
}

export function getFaminesForState(year: number, stateKey: string): FamineEvent[] {
  return famines.filter(
    (f) =>
      year >= f.startYear &&
      year <= f.endYear &&
      f.affectedStates.includes(stateKey)
  );
}

export { famines };
