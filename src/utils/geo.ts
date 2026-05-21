const GEO_CDN =
  'https://raw.githubusercontent.com/udit-001/india-maps-data/main/geojson/india.geojson';

import type { FeatureCollection } from 'geojson';

export async function loadIndiaStatesGeoJson(): Promise<FeatureCollection> {
  const localUrl = `${import.meta.env.BASE_URL}geo/india-states.geojson`;
  try {
    const local = await fetch(localUrl);
    if (local.ok) return (await local.json()) as FeatureCollection;
  } catch {
    /* try CDN */
  }
  const remote = await fetch(GEO_CDN);
  if (!remote.ok) throw new Error('Could not load India state boundaries.');
  return (await remote.json()) as FeatureCollection;
}
