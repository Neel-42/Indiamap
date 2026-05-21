import type { GeoFeatureProperties } from '../types';
import stateNameMap from '../data/state_name_map.json';

const map = stateNameMap as Record<string, string>;

export function resolveStateKey(props: GeoFeatureProperties): string | null {
  const candidates = [
    props.st_nm,
    props.ST_NM,
    props.NAME_1,
    props.name,
    props.state,
    props.shapeName,
  ].filter(Boolean) as string[];

  for (const raw of candidates) {
    const trimmed = raw.trim();
    if (map[trimmed]) return map[trimmed];
    const lower = trimmed.toLowerCase();
    for (const [key, value] of Object.entries(map)) {
      if (key.toLowerCase() === lower) return value;
    }
  }
  return null;
}

export function displayNameForKey(stateKey: string): string {
  for (const [name, key] of Object.entries(map)) {
    if (key === stateKey) return name;
  }
  return stateKey;
}
