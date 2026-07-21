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

type FeatureCollection = GeoJsonFeatureCollection<
  Point | LineString,
  { id: string; label: string; selected?: boolean; kind?: string }
>;

function pointData(
  places: AtlasPlace[],
  selectedId: string | null
): FeatureCollection {
  return {
    type: "FeatureCollection",
    features: places.map((place) => ({
      type: "Feature",
      geometry: { type: "Point", coordinates: place.coordinates },
      properties: {
        id: place.id,
        label: place.label,
        selected: place.id === selectedId,
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
            kind: relation.kind,
          },
        },
      ];
    }),
  };
}

function fitPlaces(
  map: MapInstance,
  maplibre: MapLibreModule,
  places: AtlasPlace[],
  selectedId: string | null
) {
  const selected = places.find((place) => place.id === selectedId);
  if (selected) {
    map.easeTo({ center: selected.coordinates, zoom: 3.4, duration: 400 });
    return;
  }
  if (places.length === 0) return;
  const bounds = new maplibre.LngLatBounds();
  for (const place of places) bounds.extend(place.coordinates);
  map.fitBounds(bounds, {
    padding: { top: 72, right: 72, bottom: 72, left: 72 },
    maxZoom: 3.1,
    duration: 0,
  });
}

export function ContextMap({
  places,
  relations,
  selectedId,
  status,
  onSelect,
  onReady,
  onFatal,
  onDegraded,
}: {
  places: AtlasPlace[];
  relations: AtlasRelation[];
  selectedId: string | null;
  status: "loading" | "ready" | "degraded";
  onSelect: (id: string) => void;
  onReady: () => void;
  onFatal: () => void;
  onDegraded: () => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<MapInstance | null>(null);
  const moduleRef = useRef<MapLibreModule | null>(null);
  const readyRef = useRef(false);
  const selectedIdRef = useRef(selectedId);
  const callbacksRef = useRef({ onSelect, onReady, onFatal, onDegraded });

  useEffect(() => {
    selectedIdRef.current = selectedId;
  }, [selectedId]);

  useEffect(() => {
    callbacksRef.current = { onSelect, onReady, onFatal, onDegraded };
  }, [onDegraded, onFatal, onReady, onSelect]);

  useEffect(() => {
    if (status !== "loading" || !containerRef.current) return;
    let cancelled = false;
    let timeoutId: number | undefined;
    let observer: ResizeObserver | undefined;

    async function initialize() {
      try {
        mapRef.current?.remove();
        mapRef.current = null;
        readyRef.current = false;

        const maplibre = await import("maplibre-gl");
        if (cancelled || !containerRef.current) return;
        moduleRef.current = maplibre;
        const night = document.documentElement.dataset.theme === "night";
        const map = new maplibre.Map({
          container: containerRef.current,
          style: `https://tiles.openfreemap.org/styles/${night ? "dark" : "positron"}`,
          center: [32, 33],
          zoom: 1.2,
          minZoom: 0.8,
          maxZoom: 8,
          maxBounds: [
            [-179, -75],
            [179, 75],
          ],
          renderWorldCopies: false,
          attributionControl: { compact: true },
          dragRotate: false,
          pitchWithRotate: false,
          cooperativeGestures: true,
        });
        mapRef.current = map;
        map.touchZoomRotate.disableRotation();
        map.addControl(
          new maplibre.NavigationControl({ showCompass: false }),
          "top-right"
        );

        if (typeof ResizeObserver !== "undefined") {
          observer = new ResizeObserver(() => map.resize());
          observer.observe(containerRef.current);
        }

        timeoutId = window.setTimeout(() => {
          if (!readyRef.current) callbacksRef.current.onFatal();
        }, 12000);

        map.on("load", () => {
          if (cancelled) return;
          const signal = night ? "#d4574b" : "#bd382d";
          const jade = night ? "#7fa899" : "#486e64";
          const paper = night ? "#17201d" : "#f3f0e8";
          const ink = night ? "#e9e6db" : "#191b18";

          map.addSource("atlas-relations", {
            type: "geojson",
            data: relationData(places, relations),
          });
          map.addLayer({
            id: "atlas-relations-line",
            type: "line",
            source: "atlas-relations",
            paint: {
              "line-color": [
                "match",
                ["get", "kind"],
                "regulatory-reach",
                signal,
                jade,
              ],
              "line-width": 2,
              "line-opacity": 0.8,
              "line-dasharray": [2, 2],
            },
          });
          map.addLayer({
            id: "atlas-relations-label",
            type: "symbol",
            source: "atlas-relations",
            layout: {
              "symbol-placement": "line-center",
              "text-field": ["get", "label"],
              "text-font": ["Noto Sans Regular"],
              "text-size": 11,
              "text-letter-spacing": 0.05,
            },
            paint: {
              "text-color": ink,
              "text-halo-color": paper,
              "text-halo-width": 2,
            },
          });

          map.addSource("atlas-places", {
            type: "geojson",
            data: pointData(places, selectedIdRef.current),
          });
          map.addLayer({
            id: "atlas-place-glow",
            type: "circle",
            source: "atlas-places",
            paint: {
              "circle-radius": ["case", ["get", "selected"], 16, 11],
              "circle-color": ["case", ["get", "selected"], signal, jade],
              "circle-opacity": 0.18,
            },
          });
          map.addLayer({
            id: "atlas-place-dot",
            type: "circle",
            source: "atlas-places",
            paint: {
              "circle-radius": ["case", ["get", "selected"], 7, 5],
              "circle-color": ["case", ["get", "selected"], signal, jade],
              "circle-stroke-color": paper,
              "circle-stroke-width": 2,
            },
          });
          map.addLayer({
            id: "atlas-place-label",
            type: "symbol",
            source: "atlas-places",
            layout: {
              "text-field": ["get", "label"],
              "text-font": ["Noto Sans Regular"],
              "text-size": 12,
              "text-offset": [0, 1.25],
              "text-anchor": "top",
            },
            paint: {
              "text-color": ink,
              "text-halo-color": paper,
              "text-halo-width": 2,
            },
          });
          map.addLayer({
            id: "atlas-place-hit",
            type: "circle",
            source: "atlas-places",
            paint: { "circle-radius": 22, "circle-opacity": 0 },
          });

          map.on("click", "atlas-place-hit", (event) => {
            const id = event.features?.[0]?.properties?.id;
            if (typeof id === "string") callbacksRef.current.onSelect(id);
          });
          map.on("mouseenter", "atlas-place-hit", () => {
            map.getCanvas().style.cursor = "pointer";
          });
          map.on("mouseleave", "atlas-place-hit", () => {
            map.getCanvas().style.cursor = "";
          });

          map.resize();
          fitPlaces(map, maplibre, places, selectedIdRef.current);
          map.once("idle", () => {
            if (cancelled) return;
            if (!map.areTilesLoaded()) {
              callbacksRef.current.onFatal();
              return;
            }
            readyRef.current = true;
            if (timeoutId) window.clearTimeout(timeoutId);
            callbacksRef.current.onReady();
          });
        });

        map.on("error", () => {
          if (cancelled) return;
          if (readyRef.current) callbacksRef.current.onDegraded();
          else callbacksRef.current.onFatal();
        });
      } catch {
        if (!cancelled) callbacksRef.current.onFatal();
      }
    }

    void initialize();
    return () => {
      cancelled = true;
      if (timeoutId) window.clearTimeout(timeoutId);
      observer?.disconnect();
    };
  }, [places, relations, status]);

  useEffect(() => {
    const map = mapRef.current;
    const maplibre = moduleRef.current;
    if (!map || !maplibre || !readyRef.current) return;
    const source = map.getSource("atlas-places") as GeoJsonSource | undefined;
    source?.setData(pointData(places, selectedId));
    fitPlaces(map, maplibre, places, selectedId);
  }, [places, selectedId]);

  useEffect(
    () => () => {
      mapRef.current?.remove();
      mapRef.current = null;
      moduleRef.current = null;
      readyRef.current = false;
    },
    []
  );

  return (
    <div
      ref={containerRef}
      className="atlas-map h-full min-h-[22rem] w-full"
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
      role="region"
      aria-label="Geographic context for the selected evidence step"
      data-testid="atlas-map-container"
    />
  );
}
