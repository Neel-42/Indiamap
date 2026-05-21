import { getFaminesForState } from '../hooks/useActiveFamines';
import type { FarmingAtYear } from '../types';
import { FARMING_MODE_LABELS } from '../utils/farmingMode';

interface DetailPanelProps {
  year: number;
  farming: FarmingAtYear | null;
}

function formatRevenue(system: string): string {
  return system.replace(/_/g, ' ');
}

export function DetailPanel({ year, farming }: DetailPanelProps) {
  if (!farming) {
    return (
      <aside className="detail-panel">
        <p className="detail-panel__empty">Click a state to see how farming and famines changed there.</p>
      </aside>
    );
  }

  const famines = getFaminesForState(year, farming.stateKey);
  const shiftLabel =
    farming.farmingMode === 'subsistence'
      ? 'Still oriented toward subsistence food crops.'
      : farming.farmingMode === 'cash_crop'
        ? 'Shifted toward cash crop production for export and revenue.'
        : 'In transition from subsistence toward commercial cash cropping.';

  return (
    <aside className="detail-panel">
      <h2 className="detail-panel__title">{farming.displayName}</h2>
      <p className="detail-panel__year">{year}</p>

      <section className="detail-panel__block">
        <h3>Farming style</h3>
        <p className="detail-panel__mode">{FARMING_MODE_LABELS[farming.farmingMode]}</p>
        <p className="detail-panel__note">{shiftLabel}</p>
        <dl className="detail-panel__stats">
          <div>
            <dt>Food crops (est.)</dt>
            <dd>{farming.foodCropShare}% of cultivated area</dd>
          </div>
          <div>
            <dt>Commercialization</dt>
            <dd>{farming.commercializationIndex} / 100</dd>
          </div>
          <div>
            <dt>Staple / dominant crop</dt>
            <dd>{farming.dominantCrop}</dd>
          </div>
          {farming.cashCrop && farming.cashCrop !== farming.dominantCrop && (
            <div>
              <dt>Major cash crop</dt>
              <dd>{farming.cashCrop}</dd>
            </div>
          )}
          {farming.cashCrop && (
            <div>
              <dt>Export pressure</dt>
              <dd>
                {farming.cashCrop} grown for colonial markets; food share fell as revenue demands rose.
              </dd>
            </div>
          )}
          <div>
            <dt>Land revenue system</dt>
            <dd>{formatRevenue(farming.landRevenueSystem)}</dd>
          </div>
          <div>
            <dt>Irrigation</dt>
            <dd>{farming.irrigationIntensity}</dd>
          </div>
        </dl>
        {farming.colonialNote && (
          <p className="detail-panel__colonial">{farming.colonialNote}</p>
        )}
      </section>

      <section className="detail-panel__block">
        <h3>Famines this year</h3>
        {famines.length === 0 ? (
          <p className="detail-panel__muted">No major famine recorded here in {year}.</p>
        ) : (
          <ul className="detail-panel__famines">
            {famines.map((f) => (
              <li key={f.id}>
                <strong>{f.name}</strong>
                <span className={`detail-panel__severity detail-panel__severity--${f.severity}`}>
                  {f.severity}
                </span>
                <p>{f.mortalityBand}</p>
                <p className="detail-panel__muted">{f.summary}</p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </aside>
  );
}
