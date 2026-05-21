import { useState } from 'react';
import { IndiaMap } from './components/IndiaMap';
import { YearSlider } from './components/YearSlider';
import { Legend } from './components/Legend';
import { DetailPanel } from './components/DetailPanel';
import type { FarmingAtYear } from './types';

export default function App() {
  const [year, setYear] = useState(1857);
  const [showFarming, setShowFarming] = useState(true);
  const [showFamines, setShowFamines] = useState(true);
  const [selectedFarming, setSelectedFarming] = useState<FarmingAtYear | null>(null);
  const [hoverName, setHoverName] = useState<string | null>(null);

  return (
    <div className="app">
      <header className="app-header">
        <div>
          <h1>Colonial India: Farming & Famine</h1>
          <p className="app-header__lead">
            Explore how British colonial rule shifted agriculture from primarily{' '}
            <strong>subsistence farming</strong> (food for local communities) toward{' '}
            <strong>cash crop farming</strong> (indigo, cotton, jute, opium, tea for export)—and
            how major famines overlapped with those changes.
          </p>
        </div>
        <div className="layer-toggles">
          <label>
            <input
              type="checkbox"
              checked={showFarming}
              onChange={(e) => setShowFarming(e.target.checked)}
            />
            Farming style (subsistence → cash crop)
          </label>
          <label>
            <input
              type="checkbox"
              checked={showFamines}
              onChange={(e) => setShowFamines(e.target.checked)}
            />
            Famine overlay
          </label>
        </div>
      </header>

      <p className="disclaimer">
        Simplified historical model on modern state borders. Estimates are indicative, drawn from
        published scholarship—not precise census data.
      </p>

      <div className="app-main">
        <div className="app-map-column">
          <IndiaMap
            year={year}
            showFarming={showFarming}
            showFamines={showFamines}
            selectedStateKey={selectedFarming?.stateKey ?? null}
            onSelectState={(_key, farming) => setSelectedFarming(farming)}
            onHoverState={setHoverName}
          />
          {hoverName && <p className="hover-hint">Hovering: {hoverName}</p>}
          <YearSlider year={year} onChange={setYear} />
        </div>
        <div className="app-side">
          <Legend year={year} showFarming={showFarming} showFamines={showFamines} />
          <DetailPanel year={year} farming={selectedFarming} />
        </div>
      </div>

      <footer className="app-footer">
        <h3>Sources</h3>
        <ul>
          <li>
            Famine chronology: colonial historiography &amp;{' '}
            <a href="https://www.researchgate.net/publication/340224385" target="_blank" rel="noreferrer">
              Major Famines in India during British Rule
            </a>
          </li>
          <li>
            Commercialization &amp; trade: Burgess &amp; Donaldson,{' '}
            <em>Can Openness to Trade Reduce Vulnerability?</em> (LSE/MIT)
          </li>
          <li>State boundaries: India states GeoJSON (open data)</li>
        </ul>
      </footer>
    </div>
  );
}
