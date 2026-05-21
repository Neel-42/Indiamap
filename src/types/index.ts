export type FarmingMode = 'subsistence' | 'transitional' | 'cash_crop';

export type DominantCrop =
  | 'rice'
  | 'wheat'
  | 'millets'
  | 'cotton'
  | 'indigo'
  | 'jute'
  | 'opium'
  | 'tea'
  | 'sugarcane'
  | 'groundnut';

export type LandRevenueSystem =
  | 'permanent_settlement'
  | 'ryotwari'
  | 'mahalwari'
  | 'tribal'
  | 'princely';

export type IrrigationIntensity = 'low' | 'medium' | 'high';

export type FamineSeverity = 'moderate' | 'severe' | 'catastrophic';

export interface FarmingAnchor {
  year: number;
  dominantCrop: DominantCrop;
  landRevenueSystem: LandRevenueSystem;
  commercializationIndex: number;
  foodCropShare: number;
  irrigationIntensity: IrrigationIntensity;
  cashCrop?: DominantCrop;
  colonialNote?: string;
}

export interface StateFarmingRecord {
  stateKey: string;
  displayName: string;
  anchors: FarmingAnchor[];
}

export interface FarmingAtYear {
  stateKey: string;
  displayName: string;
  year: number;
  dominantCrop: DominantCrop;
  landRevenueSystem: LandRevenueSystem;
  commercializationIndex: number;
  foodCropShare: number;
  irrigationIntensity: IrrigationIntensity;
  farmingMode: FarmingMode;
  cashCrop: DominantCrop | null;
  colonialNote?: string;
}

export interface FamineEvent {
  id: string;
  name: string;
  startYear: number;
  endYear: number;
  affectedStates: string[];
  severity: FamineSeverity;
  mortalityBand: string;
  summary: string;
}

export interface Milestone {
  year: number;
  label: string;
}

export interface GeoFeatureProperties {
  NAME_1?: string;
  ST_NM?: string;
  st_nm?: string;
  name?: string;
  state?: string;
  district?: string;
  [key: string]: string | undefined;
}
