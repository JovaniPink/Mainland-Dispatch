"use client";

import "maplibre-gl/dist/maplibre-gl.css";
import { useEffect, useRef } from "react";
import type {
  FeatureCollection as GeoJsonFeatureCollection,
  LineString,
  Point,
} from "geojson";
import type { AtlasPlace, AtlasRelation } from "@/content/schema";

type MapLibreModule = typeof import("maplibre-gl");
type MapInstance = import("maplibre-gl").Map;
type GeoJsonSource = import("maplibre-gl").GeoJSONSource;
type MapStatus = "idle" | "loading" | "ready" | "failed";

type FeatureCollection = GeoJsonFeatureCollection<
  Point | LineString,
  { id: string; label: string; active?: boolean; relation?: string }
>;

function pointData(
  places: AtlasPlace[],
  activeIds: string[]
): FeatureCollection {
  return {
    type: "FeatureCollection",
    features: places.map((place) => ({
      type: "Feature",
      geometry: { type: "Point", coordinates: place.coordinates },
      properties: {
        id: place.id,
        label: place.label,
        active: activeIds.includes(place.id),
      },
    })),
  };
}

function relationData(
  places: AtlasPlace[],
  relations: AtlasRelation[]
): FeatureCollection {
  const byId = new Map(places.map((place) => [place.id, place]));

  return {
    type: "FeatureCollection",
    features: relations.flatMap((relation) => {
      const from = byId.get(relation.from);
      const to = byId.get(relation.to);
      if (!from || !to) return [];
      return [
        {
          type: "Feature" as const,
          geometry: {
            type: "LineString" as const,
            coordinates: [from.coordinates, to.coordinates],
          },
          properties: {
            id: relation.id,
            label: relation.label,
            relation: relation.label,
          },
        },
      ];
    }),
  };
}

/**
 * Click-to-load context map: no request to the third-party tile host until
 * the reader consents, mirroring MediaFacade's poster-before-iframe pattern.
 */
export function ContextMap({
  places,
  relations,
  activeIds,
  selectedId,
  status,
  onSelect,
  onReady,
  onError,
  onConsent,
}: {
  places: AtlasPlace[];
  relations: AtlasRelation[];
  activeIds: string[];
  selectedId: string | null;
  status: MapStatus;
  onSelect: (id: string) => void;
  onReady: () => void;
  onError: () => void;
  onConsent: () => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<MapInstance | null>(null);
  const moduleRef = useRef<MapLibreModule | null>(null);
  const onSelectRef = useRef(onSelect);
  const onReadyRef = useRef(onReady);
  const onErrorRef = useRef(onError);
  const activeIdsRef = useRef(activeIds);
  const readyRef = useRef(false);

  useEffect(() => {
    onSelectRef.current = onSelect;
    onReadyRef.current = onReady;
    onErrorRef.current = onError;
    activeIdsRef.current = activeIds;
  }, [activeIds, onError, onReady, onSelect]);

  // Runs only once the reader has consented (status leaves "idle"), and
  // again on a retry from "failed" — never on mount, never automatically.
  useEffect(() => {
    if (status !== "loading" || !containerRef.current) return;
    let cancelled = false;
    let timeoutId: number | undefined;

    async function initialize() {
      try {
        // Dispose a stale instance from a previous failed attempt before
        // creating a fresh one.
        mapRef.current?.remove();
        mapRef.current = null;
        readyRef.current = false;

        const maplibre = await import("maplibre-gl");
        if (cancelled || !containerRef.current) return;
        moduleRef.current = maplibre;

        const map = new maplibre.Map({
          container: containerRef.current,
          style: "https://tiles.openfreemap.org/styles/positron",
          center: [32, 33],
          zoom: 1.2,
          minZoom: 0.8,
          maxZoom: 8,
          attributionControl: { compact: true },
          dragRotate: false,
          pitchWithRotate: false,
        });
        mapRef.current = map;
        map.touchZoomRotate.disableRotation();
        map.addControl(
          new maplibre.NavigationControl({ showCompass: false }),
          "top-right"
        );

        timeoutId = window.setTimeout(() => {
          if (!readyRef.current) onErrorRef.current();
        }, 12000);

        map.on("load", () => {
          if (cancelled) return;
          readyRef.current = true;
          if (timeoutId) window.clearTimeout(timeoutId);

          map.addSource("atlas-relations", {
            type: "geojson",
            data: relationData(places, relations),
          });
          map.addLayer({
            id: "atlas-relations-line",
            type: "line",
            source: "atlas-relations",
            paint: {
              "line-color": "#486e64",
              "line-width": 1.5,
              "line-opacity": 0.55,
              "line-dasharray": [2, 2],
            },
          });

          map.addSource("atlas-places", {
            type: "geojson",
            data: pointData(places, activeIdsRef.current),
          });
          map.addLayer({
            id: "atlas-place-glow",
            type: "circle",
            source: "atlas-places",
            paint: {
              "circle-radius": ["case", ["get", "active"], 15, 10],
              "circle-color": ["case", ["get", "active"], "#bd382d", "#486e64"],
              "circle-opacity": 0.16,
            },
          });
          map.addLayer({
            id: "atlas-place-dot",
            type: "circle",
            source: "atlas-places",
            paint: {
              "circle-radius": ["case", ["get", "active"], 6.5, 4.5],
              "circle-color": ["case", ["get", "active"], "#bd382d", "#486e64"],
              "circle-stroke-color": "#f3f0e8",
              "circle-stroke-width": 1.5,
            },
          });
          map.addLayer({
            id: "atlas-place-hit",
            type: "circle",
            source: "atlas-places",
            paint: { "circle-radius": 20, "circle-opacity": 0 },
          });

          map.on("click", "atlas-place-hit", (event) => {
            const id = event.features?.[0]?.properties?.id;
            if (typeof id === "string") onSelectRef.current(id);
          });
          map.on("mouseenter", "atlas-place-hit", () => {
            map.getCanvas().style.cursor = "pointer";
          });
          map.on("mouseleave", "atlas-place-hit", () => {
            map.getCanvas().style.cursor = "";
          });

          onReadyRef.current();
        });

        map.on("error", () => {
          if (!readyRef.current) onErrorRef.current();
        });
      } catch {
        if (!cancelled) onErrorRef.current();
      }
    }

    void initialize();

    return () => {
      cancelled = true;
      if (timeoutId) window.clearTimeout(timeoutId);
    };
  }, [status, places, relations]);

  // True teardown only on unmount — a status change from "loading" to
  // "ready" must not tear down the map that effect just created.
  useEffect(() => {
    return () => {
      mapRef.current?.remove();
      mapRef.current = null;
      moduleRef.current = null;
      readyRef.current = false;
    };
  }, []);

  useEffect(() => {
    const map = mapRef.current;
    const maplibre = moduleRef.current;
    if (!map || !maplibre || !readyRef.current) return;

    const source = map.getSource("atlas-places") as GeoJsonSource | undefined;
    source?.setData(pointData(places, activeIds));

    const selected = places.find((place) => place.id === selectedId);
    if (selected) {
      map.easeTo({ center: selected.coordinates, zoom: 3.4, duration: 500 });
      return;
    }

    const activePlaces = places.filter((place) => activeIds.includes(place.id));
    if (activePlaces.length === 0) return;
    const bounds = new maplibre.LngLatBounds();
    for (const place of activePlaces) bounds.extend(place.coordinates);
    map.fitBounds(bounds, {
      padding: { top: 56, right: 56, bottom: 56, left: 56 },
      maxZoom: 3.2,
      duration: 500,
    });
  }, [activeIds, places, selectedId]);

  return (
    <div className="relative min-h-[25rem] overflow-hidden bg-night/5">
      <div
        ref={containerRef}
        className="atlas-map absolute inset-0"
        role="application"
        aria-label="Interactive context map. Use the synchronized location list for full keyboard access."
      />

      {status === "idle" && (
        <div className="absolute inset-0 grid place-items-center bg-paper-warm/95 p-8 text-center">
          <div className="flex max-w-sm flex-col items-center gap-4">
            <span className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-ink text-ink transition-colors group-hover:border-signal">
              ◎
            </span>
            <p className="font-mono text-xs uppercase tracking-widest text-ink-muted">
              Map geography is context, not evidence
            </p>
            <button
              type="button"
              onClick={onConsent}
              className="border border-ink px-4 py-2 font-mono text-xs uppercase tracking-widest hover:border-signal hover:text-signal"
            >
              Load interactive map
            </button>
            <p className="font-mono text-[0.6rem] uppercase tracking-widest text-ink-muted">
              External source — contacts OpenFreeMap on load
            </p>
          </div>
        </div>
      )}

      {status === "loading" && (
        <div className="absolute inset-0 grid place-items-center bg-paper-warm/95">
          <div className="flex flex-col items-center gap-3">
            <span className="loading-mark h-8 w-8 rounded-full border-2 border-ink/20 border-t-signal" />
            <p className="font-mono text-[0.65rem] uppercase tracking-widest text-ink-muted">
              Preparing map
            </p>
          </div>
        </div>
      )}

      {status === "failed" && (
        <div className="absolute inset-0 grid place-items-center bg-paper-warm/95 p-8 text-center">
          <div className="flex max-w-sm flex-col items-center gap-4">
            <p className="font-mono text-xs uppercase tracking-widest text-signal">
              Map unavailable
            </p>
            <p className="font-serif text-lg leading-relaxed">
              The evidence remains available in the synchronized location list
              and source ledger.
            </p>
            <button
              type="button"
              onClick={onConsent}
              className="border border-ink px-4 py-2 font-mono text-xs uppercase tracking-widest hover:border-signal hover:text-signal"
            >
              Retry
            </button>
          </div>
        </div>
      )}

      <div className="pointer-events-none absolute bottom-2 left-2 bg-paper/90 px-2 py-1 font-mono text-[0.6rem] uppercase tracking-widest text-ink-muted">
        Lines show regulatory reach or disclosed exposure—not shipments
      </div>
    </div>
  );
}
