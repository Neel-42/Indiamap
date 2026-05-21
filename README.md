# Colonial India: Farming & Famine Map

Interactive map of modern Indian states showing how agriculture shifted under British colonial rule—from **primarily subsistence farming** (food crops for local communities) toward **cash crop farming** (indigo, cotton, jute, opium, tea, and other exports)—with an overlay of major colonial-era famines on a timeline from **1765 to 1947**.

Live site (after GitHub Pages is enabled): **https://neel-42.github.io/Indiamap/**

## Run locally

```bash
npm install
node scripts/prepare-geo.mjs   # optional; app also loads boundaries from CDN
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Map layers

- **Farming style** — Green = subsistence-oriented; tan = mixed/transitional; amber = cash crop-oriented. Driven by estimated food-crop share and commercialization index per state and year.
- **Famines** — Red overlay when a documented famine affected that state in the selected year.

## Data note

Figures are **indicative** for education, mapped onto modern state borders—not district-level census data. See in-app Sources footer.

## Repository

https://github.com/Neel-42/Indiamap
