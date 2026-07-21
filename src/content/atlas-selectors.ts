import type { AtlasRelease, SignalChain, SignalStep } from "./schema";

function unique(values: string[]) {
  return [...new Set(values)];
}

export function getChainScope(chain: SignalChain) {
  return {
    sourceIds: unique(chain.steps.flatMap((step) => step.sourceIds)),
    placeIds: unique(chain.steps.flatMap((step) => step.placeIds)),
    eventIds: unique(chain.steps.flatMap((step) => step.eventIds)),
    relationIds: unique(chain.steps.flatMap((step) => step.relationIds)),
    seriesIds: unique(chain.steps.flatMap((step) => step.seriesIds)),
  };
}

export function getStepScope(release: AtlasRelease, step: SignalStep) {
  const places = release.places.filter((item) =>
    step.placeIds.includes(item.id)
  );
  const events = release.events.filter((item) =>
    step.eventIds.includes(item.id)
  );
  const relations = release.relations.filter((item) =>
    step.relationIds.includes(item.id)
  );
  const series = release.series.filter((item) =>
    step.seriesIds.includes(item.id)
  );
  const sourceIds = unique([
    ...step.sourceIds,
    ...events.flatMap((item) => item.sourceIds),
    ...relations.flatMap((item) => item.sourceIds),
  ]);

  return {
    places,
    events,
    relations,
    series,
    sourceIds,
    mapEligible: places.length >= 2 && relations.length > 0,
  };
}
