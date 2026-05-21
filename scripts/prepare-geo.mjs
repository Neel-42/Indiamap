import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const outDir = join(root, 'public', 'geo');
const url =
  'https://raw.githubusercontent.com/udit-001/india-maps-data/main/geojson/india.geojson';

const res = await fetch(url);
if (!res.ok) throw new Error(`Failed to download GeoJSON: ${res.status}`);
const text = await res.text();
await mkdir(outDir, { recursive: true });
await writeFile(join(outDir, 'india-states.geojson'), text);
console.log('Wrote public/geo/india-states.geojson');
