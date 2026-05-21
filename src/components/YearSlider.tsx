import milestonesData from '../data/milestones.json';
import type { Milestone } from '../types';

const milestones = milestonesData as Milestone[];
const MIN_YEAR = 1765;
const MAX_YEAR = 1947;

interface YearSliderProps {
  year: number;
  onChange: (year: number) => void;
}

export function YearSlider({ year, onChange }: YearSliderProps) {
  return (
    <div className="year-slider">
      <div className="year-slider__header">
        <span className="year-slider__label">Year</span>
        <span className="year-slider__value">{year}</span>
      </div>
      <input
        type="range"
        min={MIN_YEAR}
        max={MAX_YEAR}
        step={1}
        value={year}
        onChange={(e) => onChange(Number(e.target.value))}
        aria-label="Select year"
        className="year-slider__input"
      />
      <div className="year-slider__range-labels">
        <span>{MIN_YEAR}</span>
        <span>{MAX_YEAR}</span>
      </div>
      <div className="year-slider__milestones">
        {milestones.map((m) => {
          const pct = ((m.year - MIN_YEAR) / (MAX_YEAR - MIN_YEAR)) * 100;
          return (
            <button
              key={m.year}
              type="button"
              className="year-slider__milestone"
              style={{ left: `${pct}%` }}
              title={`${m.year}: ${m.label}`}
              onClick={() => onChange(m.year)}
            >
              <span className="year-slider__tick" />
              <span className="year-slider__milestone-label">{m.year}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
