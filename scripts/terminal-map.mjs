/**
 * Text preview of farming style by state for a given year.
 * Usage: node scripts/terminal-map.mjs [year]
 */
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const year = Number(process.argv[2] ?? 1857);
const root = join(dirname(fileURLToPath(import.meta.url)), '..');

// Minimal inline data for terminal preview (mirrors regionalAnchors.ts)
const modes = { subsistence: 'SUBS', transitional: 'MIX ', cash_crop: 'CASH' };

function deriveMode(food, comm) {
  if (food >= 72 && comm < 35) return 'subsistence';
  if (food <= 48 || comm >= 62) return 'cash_crop';
  return 'transitional';
}

const samples = [
  { name: 'West Bengal', y1765: [85, 15], y1857: [52, 55], y1943: [35, 75] },
  { name: 'Maharashtra', y1765: [85, 15], y1857: [55, 52], y1943: [36, 78] },
  { name: 'Punjab', y1765: [85, 15], y1857: [68, 28], y1943: [48, 62] },
  { name: 'Tamil Nadu', y1765: [85, 15], y1857: [60, 42], y1943: [40, 70] },
  { name: 'Assam', y1765: [85, 15], y1857: [80, 18], y1943: [78, 25] },
];

function atYear(row, y) {
  if (y <= 1765) return row.y1765;
  if (y <= 1857) return row.y1857;
  return row.y1943;
}

console.log('');
console.log(`  Colonial India — Farming style @ ${year}`);
console.log('  (subsistence → cash crop under British rule)');
console.log('');
console.log('  State            Style   Food%  Comm%');
console.log('  ─────────────────────────────────────');

for (const s of samples) {
  const [food, comm] = atYear(s, year);
  const mode = modes[deriveMode(food, comm)];
  console.log(
    `  ${s.name.padEnd(16)} ${mode}   ${String(food).padStart(3)}%   ${String(comm).padStart(3)}%`
  );
}

console.log('');
console.log('  SUBS = primarily subsistence | MIX = transitional | CASH = cash crop');
console.log('');
console.log('  Full map: npm run dev  →  http://localhost:5173/Indiamap/');
console.log('  (or preview: http://127.0.0.1:4173/Indiamap/)');
console.log('');
