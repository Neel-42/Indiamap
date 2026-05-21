import { FARMING_MODE_COLORS } from '../utils/colorScales';
import { FARMING_MODE_LABELS } from '../utils/farmingMode';
import type { FarmingMode } from '../types';

interface LegendProps {
  year: number;
  showFarming: boolean;
  showFamines: boolean;
}

const modes: FarmingMode[] = ['subsistence', 'transitional', 'cash_crop'];

export function Legend({ year, showFarming, showFamines }: LegendProps) {
  return (
    <div className="legend">
      {showFarming && (
        <section className="legend__section">
          <h3 className="legend__title">Farming style (subsistence → cash crop)</h3>
          <p className="legend__subtitle">
            Color shows how far agriculture shifted from growing food for local use toward export-oriented cash crops.
          </p>
          <ul className="legend__items">
            {modes.map((mode) => (
              <li key={mode} className="legend__item">
                <span
                  className="legend__swatch"
                  style={{ background: FARMING_MODE_COLORS[mode] }}
                />
                <span>{FARMING_MODE_LABELS[mode]}</span>
              </li>
            ))}
          </ul>
          <div className="legend__gradient-bar" aria-hidden>
            <span>Subsistence</span>
            <div className="legend__gradient-track" />
            <span>Cash crop</span>
          </div>
        </section>
      )}
      {showFamines && (
        <section className="legend__section">
          <h3 className="legend__title">Active famines ({year})</h3>
          <ul className="legend__items">
            <li className="legend__item">
              <span className="legend__swatch legend__swatch--famine-moderate" />
              <span>Moderate</span>
            </li>
            <li className="legend__item">
              <span className="legend__swatch legend__swatch--famine-severe" />
              <span>Severe</span>
            </li>
            <li className="legend__item">
              <span className="legend__swatch legend__swatch--famine-catastrophic" />
              <span>Catastrophic</span>
            </li>
          </ul>
        </section>
      )}
    </div>
  );
}
