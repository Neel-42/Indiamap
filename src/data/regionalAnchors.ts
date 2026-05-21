import type { FarmingAnchor, StateFarmingRecord } from '../types';

/** Subsistence-heavy baseline (~1765): high foodCropShare, low commercialization. */
const subsistence1765 = (
  crop: FarmingAnchor['dominantCrop'],
  note: string
): FarmingAnchor => ({
  year: 1765,
  dominantCrop: crop,
  landRevenueSystem: 'ryotwari',
  commercializationIndex: 15,
  foodCropShare: 85,
  irrigationIntensity: 'low',
  colonialNote: note,
});

function eastBengal(displayName: string, key: string): StateFarmingRecord {
  return {
    stateKey: key,
    displayName,
    anchors: [
      subsistence1765('rice', 'Village rice and millet subsistence; little export agriculture.'),
      {
        year: 1793,
        dominantCrop: 'rice',
        landRevenueSystem: 'permanent_settlement',
        commercializationIndex: 28,
        foodCropShare: 78,
        irrigationIntensity: 'low',
        cashCrop: 'indigo',
        colonialNote: 'Permanent Settlement pushes revenue; indigo contracts spread in Bengal.',
      },
      {
        year: 1830,
        dominantCrop: 'indigo',
        landRevenueSystem: 'permanent_settlement',
        commercializationIndex: 48,
        foodCropShare: 58,
        irrigationIntensity: 'low',
        cashCrop: 'indigo',
        colonialNote: 'Indigo boom displaces food plots; peasants pressed into cash cropping.',
      },
      {
        year: 1880,
        dominantCrop: 'jute',
        landRevenueSystem: 'permanent_settlement',
        commercializationIndex: 62,
        foodCropShare: 45,
        irrigationIntensity: 'medium',
        cashCrop: 'jute',
        colonialNote: 'Jute for global markets replaces indigo; food share keeps falling.',
      },
      {
        year: 1925,
        dominantCrop: 'jute',
        landRevenueSystem: 'permanent_settlement',
        commercializationIndex: 72,
        foodCropShare: 38,
        irrigationIntensity: 'medium',
        cashCrop: 'jute',
        colonialNote: 'Highly commercialized delta; rice still grown but land skews to export fibre.',
      },
      {
        year: 1947,
        dominantCrop: 'jute',
        landRevenueSystem: 'permanent_settlement',
        commercializationIndex: 75,
        foodCropShare: 35,
        irrigationIntensity: 'medium',
        cashCrop: 'jute',
        colonialNote: 'Cash crop economy with chronic food vulnerability.',
      },
    ],
  };
}

function westCotton(displayName: string, key: string): StateFarmingRecord {
  return {
    stateKey: key,
    displayName,
    anchors: [
      subsistence1765('millets', 'Dryland millets and pulses for local consumption.'),
      {
        year: 1810,
        dominantCrop: 'cotton',
        landRevenueSystem: 'ryotwari',
        commercializationIndex: 32,
        foodCropShare: 68,
        irrigationIntensity: 'low',
        cashCrop: 'cotton',
        colonialNote: 'American war demand pulls western India into cotton exports.',
      },
      {
        year: 1860,
        dominantCrop: 'cotton',
        landRevenueSystem: 'ryotwari',
        commercializationIndex: 55,
        foodCropShare: 52,
        irrigationIntensity: 'low',
        cashCrop: 'cotton',
        colonialNote: 'Ryotwari settlements and cotton commercialization expand on Deccan soils.',
      },
      {
        year: 1890,
        dominantCrop: 'cotton',
        landRevenueSystem: 'ryotwari',
        commercializationIndex: 68,
        foodCropShare: 42,
        irrigationIntensity: 'medium',
        cashCrop: 'cotton',
        colonialNote: 'Cash cropping dominant; grain deficits worsen in drought years.',
      },
      {
        year: 1947,
        dominantCrop: 'cotton',
        landRevenueSystem: 'ryotwari',
        commercializationIndex: 78,
        foodCropShare: 36,
        irrigationIntensity: 'medium',
        cashCrop: 'cotton',
        colonialNote: 'Export-oriented cotton belt; mixed subsistence only on marginal land.',
      },
    ],
  };
}

function southMadras(displayName: string, key: string, baseCrop: FarmingAnchor['dominantCrop'] = 'millets'): StateFarmingRecord {
  return {
    stateKey: key,
    displayName,
    anchors: [
      subsistence1765(baseCrop, 'Rain-fed millets and rice largely for local subsistence.'),
      {
        year: 1820,
        dominantCrop: baseCrop,
        landRevenueSystem: 'ryotwari',
        commercializationIndex: 25,
        foodCropShare: 75,
        irrigationIntensity: 'low',
        colonialNote: 'Madras Presidency revenue demand; limited export crops on dry lands.',
      },
      {
        year: 1865,
        dominantCrop: 'cotton',
        landRevenueSystem: 'ryotwari',
        commercializationIndex: 45,
        foodCropShare: 58,
        irrigationIntensity: 'low',
        cashCrop: 'cotton',
        colonialNote: 'American Civil War cotton boom reaches southern plateau districts.',
      },
      {
        year: 1900,
        dominantCrop: 'groundnut',
        landRevenueSystem: 'ryotwari',
        commercializationIndex: 58,
        foodCropShare: 48,
        irrigationIntensity: 'medium',
        cashCrop: 'groundnut',
        colonialNote: 'Groundnut and cotton oilseeds for export; food plots shrink.',
      },
      {
        year: 1947,
        dominantCrop: 'groundnut',
        landRevenueSystem: 'ryotwari',
        commercializationIndex: 70,
        foodCropShare: 40,
        irrigationIntensity: 'medium',
        cashCrop: 'groundnut',
        colonialNote: 'Transitional to cash crop belt; subsistence confined to hill and tribal tracts.',
      },
    ],
  };
}

function northCanal(displayName: string, key: string): StateFarmingRecord {
  return {
    stateKey: key,
    displayName,
    anchors: [
      subsistence1765('wheat', 'Wheat and millets primarily for local consumption.'),
      {
        year: 1830,
        dominantCrop: 'wheat',
        landRevenueSystem: 'mahalwari',
        commercializationIndex: 22,
        foodCropShare: 80,
        irrigationIntensity: 'low',
        colonialNote: 'Mahalwari and village grain reserves still structure farming.',
      },
      {
        year: 1885,
        dominantCrop: 'wheat',
        landRevenueSystem: 'mahalwari',
        commercializationIndex: 40,
        foodCropShare: 62,
        irrigationIntensity: 'high',
        colonialNote: 'Canal colonies (esp. Punjab) tie wheat to market towns and rail.',
      },
      {
        year: 1920,
        dominantCrop: 'wheat',
        landRevenueSystem: 'mahalwari',
        commercializationIndex: 55,
        foodCropShare: 52,
        irrigationIntensity: 'high',
        cashCrop: 'wheat',
        colonialNote: 'Commercial wheat for all-India trade; subsistence share declining.',
      },
      {
        year: 1947,
        dominantCrop: 'wheat',
        landRevenueSystem: 'mahalwari',
        commercializationIndex: 62,
        foodCropShare: 48,
        irrigationIntensity: 'high',
        cashCrop: 'wheat',
        colonialNote: 'Irrigated commercial grain; still more food-oriented than eastern fibre belts.',
      },
    ],
  };
}

function northeastHills(displayName: string, key: string): StateFarmingRecord {
  return {
    stateKey: key,
    displayName,
    anchors: [
      subsistence1765('rice', 'Shifting cultivation and rice for local use; minimal colonial markets.'),
      {
        year: 1900,
        dominantCrop: 'rice',
        landRevenueSystem: 'tribal',
        commercializationIndex: 18,
        foodCropShare: 82,
        irrigationIntensity: 'low',
        colonialNote: 'Tea and plantation enclaves nearby; most hill farming stays subsistence.',
      },
      {
        year: 1947,
        dominantCrop: 'rice',
        landRevenueSystem: 'tribal',
        commercializationIndex: 25,
        foodCropShare: 78,
        irrigationIntensity: 'low',
        colonialNote: 'Largely subsistence; limited cash crop penetration.',
      },
    ],
  };
}

function princelyArid(displayName: string, key: string): StateFarmingRecord {
  return {
    stateKey: key,
    displayName,
    anchors: [
      subsistence1765('millets', 'Pastoral and millet subsistence across arid tracts.'),
      {
        year: 1870,
        dominantCrop: 'millets',
        landRevenueSystem: 'princely',
        commercializationIndex: 30,
        foodCropShare: 70,
        irrigationIntensity: 'low',
        colonialNote: 'Princely states; opium and cotton on irrigated pockets only.',
      },
      {
        year: 1925,
        dominantCrop: 'cotton',
        landRevenueSystem: 'princely',
        commercializationIndex: 48,
        foodCropShare: 55,
        irrigationIntensity: 'medium',
        cashCrop: 'cotton',
        colonialNote: 'Irrigation projects expand cotton; nomadic subsistence persists in west.',
      },
      {
        year: 1947,
        dominantCrop: 'cotton',
        landRevenueSystem: 'princely',
        commercializationIndex: 52,
        foodCropShare: 50,
        irrigationIntensity: 'medium',
        cashCrop: 'cotton',
        colonialNote: 'Mixed subsistence and commercial cotton depending on rainfall.',
      },
    ],
  };
}

function opiumBelt(displayName: string, key: string): StateFarmingRecord {
  const base = westCotton(displayName, key);
  base.anchors.splice(2, 0, {
    year: 1840,
    dominantCrop: 'opium',
    landRevenueSystem: 'ryotwari',
    commercializationIndex: 60,
    foodCropShare: 45,
    irrigationIntensity: 'low',
    cashCrop: 'opium',
    colonialNote: 'Opium monopoly pushes peasants from food grains into state-backed cash crop.',
  });
  return base;
}

export const STATE_FARMING: StateFarmingRecord[] = [
  eastBengal('West Bengal', 'IN-WB'),
  eastBengal('Bihar', 'IN-BR'),
  eastBengal('Odisha', 'IN-OR'),
  { ...eastBengal('Jharkhand', 'IN-JH'), anchors: eastBengal('Jharkhand', 'IN-JH').anchors.map((a) =>
    a.year === 1765 ? { ...a, dominantCrop: 'millets' as const, colonialNote: 'Forest millets and rice subsistence.' } : a
  ) },
  westCotton('Gujarat', 'IN-GJ'),
  westCotton('Maharashtra', 'IN-MH'),
  southMadras('Tamil Nadu', 'IN-TN', 'rice'),
  southMadras('Andhra Pradesh', 'IN-AP'),
  southMadras('Telangana', 'IN-TG'),
  southMadras('Karnataka', 'IN-KA'),
  { ...southMadras('Kerala', 'IN-KL', 'rice'), anchors: [
    subsistence1765('rice', 'Rice and coconut largely for local consumption.'),
    { year: 1880, dominantCrop: 'tea', landRevenueSystem: 'ryotwari', commercializationIndex: 50, foodCropShare: 50, irrigationIntensity: 'medium', cashCrop: 'tea', colonialNote: 'Plantation tea for export on colonial estates.' },
    { year: 1947, dominantCrop: 'tea', landRevenueSystem: 'ryotwari', commercializationIndex: 65, foodCropShare: 42, irrigationIntensity: 'medium', cashCrop: 'tea', colonialNote: 'Plantation cash crops alongside shrinking subsistence rice.' },
  ]},
  northCanal('Punjab', 'IN-PB'),
  northCanal('Haryana', 'IN-HR'),
  northCanal('Uttar Pradesh', 'IN-UP'),
  princelyArid('Rajasthan', 'IN-RJ'),
  opiumBelt('Madhya Pradesh', 'IN-MP'),
  { ...westCotton('Chhattisgarh', 'IN-CT'), anchors: westCotton('Chhattisgarh', 'IN-CT').anchors.map((a) =>
    a.year === 1765 ? { ...a, dominantCrop: 'rice' as const } : a
  ) },
  northeastHills('Assam', 'IN-AS'),
  northeastHills('Arunachal Pradesh', 'IN-AR'),
  northeastHills('Manipur', 'IN-MN'),
  northeastHills('Meghalaya', 'IN-ML'),
  northeastHills('Mizoram', 'IN-MZ'),
  northeastHills('Nagaland', 'IN-NL'),
  northeastHills('Tripura', 'IN-TR'),
  northeastHills('Sikkim', 'IN-SK'),
  northeastHills('Himachal Pradesh', 'IN-HP'),
  northeastHills('Uttarakhand', 'IN-UT'),
  princelyArid('Jammu and Kashmir', 'IN-JK'),
  princelyArid('Ladakh', 'IN-LA'),
  { stateKey: 'IN-DL', displayName: 'Delhi', anchors: northCanal('Delhi', 'IN-DL').anchors },
  { stateKey: 'IN-CH', displayName: 'Chandigarh', anchors: northCanal('Punjab', 'IN-PB').anchors },
  { stateKey: 'IN-GA', displayName: 'Goa', anchors: [
    subsistence1765('rice', 'Rice subsistence in coastal villages.'),
    { year: 1900, dominantCrop: 'sugarcane', landRevenueSystem: 'ryotwari', commercializationIndex: 45, foodCropShare: 55, irrigationIntensity: 'medium', cashCrop: 'sugarcane', colonialNote: 'Portuguese and British plantation sugar for export.' },
    { year: 1947, dominantCrop: 'sugarcane', landRevenueSystem: 'ryotwari', commercializationIndex: 58, foodCropShare: 46, irrigationIntensity: 'medium', cashCrop: 'sugarcane', colonialNote: 'Cash crop plantation economy on coast.' },
  ]},
  { stateKey: 'IN-PY', displayName: 'Puducherry', anchors: southMadras('Puducherry', 'IN-PY', 'rice').anchors },
  { stateKey: 'IN-AN', displayName: 'Andaman and Nicobar', anchors: [
    subsistence1765('rice', 'Colonial penal settlement; limited agriculture.'),
    { year: 1947, dominantCrop: 'rice', landRevenueSystem: 'ryotwari', commercializationIndex: 20, foodCropShare: 75, irrigationIntensity: 'low', colonialNote: 'Minimal commercial farming.' },
  ]},
  { stateKey: 'IN-LD', displayName: 'Lakshadweep', anchors: [
    subsistence1765('rice', 'Coconut and fish economy; subsistence horticulture.'),
    { year: 1947, dominantCrop: 'rice', landRevenueSystem: 'ryotwari', commercializationIndex: 15, foodCropShare: 80, irrigationIntensity: 'low', colonialNote: 'Remains subsistence-oriented.' },
  ]},
];
