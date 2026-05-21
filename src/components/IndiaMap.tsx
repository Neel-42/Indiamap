import { useCallback, useEffect, useMemo, useState } from 'react';
import L from 'leaflet';
import { GeoJSON, MapContainer, TileLayer, useMap } from 'react-leaflet';
import type { Layer, PathOptions } from 'leaflet';
import type { Feature, FeatureCollection, GeoJsonObject } from 'geojson';
import { useFarmingAtYear } from '../hooks/useFarmingAtYear';
import { useActiveFamines } from '../hooks/useActiveFamines';
import type { FarmingAtYear, FamineSeverity, GeoFeatureProperties } from '../types';
import { FARMING_MODE_COLORS, FAMINE_COLORS, famineOpacity } from '../utils/colorScales';
import { resolveStateKey } from '../utils/stateKeys';
import { loadIndiaStatesGeoJson } from '../utils/geo';
import { getFaminesForState } from '../hooks/useActiveFamines';

interface IndiaMapProps {
  year: number;
  showFarming: boolean;
  showFamines: boolean;
  selectedStateKey: string | null;
  onSelectState: (key: string | null, farming: FarmingAtYear | null) => void;
  onHoverState: (name: string | null) => void;
}

function FitIndiaBounds({ geojson }: { geojson: FeatureCollection | null }) {
  const map = useMap();
  useEffect(() => {
    if (!geojson) return;
    const layer = L.geoJSON(geojson);
    const bounds = layer.getBounds();
    if (bounds.isValid()) map.fitBounds(bounds, { padding: [24, 24] });
  }, [geojson, map]);
  return null;
}

function maxFamineSeverity(stateKey: string, year: number): FamineSeverity | null {
  const famines = getFaminesForState(year, stateKey);
  if (famines.length === 0) return null;
  const order: FamineSeverity[] = ['moderate', 'severe', 'catastrophic'];
  let max = 0;
  for (const f of famines) {
    const idx = order.indexOf(f.severity);
    if (idx > max) max = idx;
  }
  return order[max];
}

export function IndiaMap({
  year,
  showFarming,
  showFamines,
  selectedStateKey,
  onSelectState,
  onHoverState,
}: IndiaMapProps) {
  const [geojson, setGeojson] = useState<FeatureCollection | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const farmingByState = useFarmingAtYear(year);
  const activeFamines = useActiveFamines(year);

  useEffect(() => {
    let cancelled = false;
    loadIndiaStatesGeoJson()
      .then((data) => {
        if (!cancelled) setGeojson(data);
      })
      .catch((err: Error) => {
        if (!cancelled) setLoadError(err.message);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const styleFeature = useCallback(
    (feature?: Feature): PathOptions => {
      if (!feature) return {};
      const props = (feature.properties ?? {}) as GeoFeatureProperties;
      const stateKey = resolveStateKey(props);
      const farming = stateKey ? farmingByState.get(stateKey) : undefined;

      let fill = '#c8c8c8';
      let fillOpacity = 0.55;

      if (showFarming && farming) {
        fill = FARMING_MODE_COLORS[farming.farmingMode];
        fillOpacity = 0.72;
      }

      if (showFamines && stateKey) {
        const sev = maxFamineSeverity(stateKey, year);
        if (sev) {
          fill = FAMINE_COLORS[sev];
          fillOpacity = Math.max(fillOpacity, famineOpacity(sev));
        }
      }

      const selected = stateKey === selectedStateKey;
      return {
        fillColor: fill,
        fillOpacity,
        color: selected ? '#1e3a5f' : '#4a4a4a',
        weight: selected ? 2.5 : 1,
      };
    },
    [farmingByState, showFarming, showFamines, year, selectedStateKey]
  );

  const onEachFeature = useCallback(
    (feature: Feature, layer: Layer) => {
      const props = (feature.properties ?? {}) as GeoFeatureProperties;
      const stateKey = resolveStateKey(props);
      const farming = stateKey ? farmingByState.get(stateKey) : undefined;
      const name =
        farming?.displayName ?? props.st_nm ?? props.ST_NM ?? props.NAME_1 ?? 'Unknown';

      layer.on({
        mouseover: (e) => {
          const target = e.target;
          target.setStyle({ weight: 2, color: '#1e3a5f' });
          onHoverState(name);
          const inFamine = stateKey && getFaminesForState(year, stateKey).length > 0;
          const mode = farming?.farmingMode ?? 'unknown';
          const crop = farming?.dominantCrop ?? '—';
          const food = farming?.foodCropShare ?? '—';
          target.bindTooltip(
            `<strong>${name}</strong><br/>${showFarming ? `Style: ${mode.replace('_', ' ')}<br/>Food crops: ${food}%<br/>Dominant: ${crop}` : ''}${inFamine && showFamines ? '<br/><em>Famine active</em>' : ''}`,
            { sticky: true }
          ).openTooltip();
        },
        mouseout: (e) => {
          const target = e.target;
          target.closeTooltip();
          target.setStyle(styleFeature(feature));
          onHoverState(null);
        },
        click: () => {
          if (stateKey && farming) onSelectState(stateKey, farming);
          else onSelectState(null, null);
        },
      });
    },
    [farmingByState, onHoverState, onSelectState, showFarming, showFamines, styleFeature, year]
  );

  const geoData = useMemo(() => geojson as GeoJsonObject | undefined, [geojson]);

  if (loadError) {
    return <div className="map-error">Could not load map boundaries: {loadError}</div>;
  }

  return (
    <div className="map-wrap">
      <MapContainer
        center={[22.5, 79]}
        zoom={5}
        className="map-container"
        scrollWheelZoom
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {geoData && (
          <>
            <GeoJSON
              key={`${year}-${showFarming}-${showFamines}`}
              data={geoData}
              style={styleFeature}
              onEachFeature={onEachFeature}
            />
            <FitIndiaBounds geojson={geojson} />
          </>
        )}
      </MapContainer>
      {!geojson && !loadError && <div className="map-loading">Loading map…</div>}
      {activeFamines.length > 0 && showFamines && (
        <div className="map-famine-banner">
          {activeFamines.length} major famine{activeFamines.length > 1 ? 's' : ''} active in {year}
        </div>
      )}
    </div>
  );
}
