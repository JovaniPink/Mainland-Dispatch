#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

export const DEFAULT_ORIGIN = "https://mainlanddispatch.com";

const RESTRICTED_STATUSES = new Set([401, 403, 429, 451]);
const MISSING_STATUSES = new Set([404, 410]);
const AMBIGUOUS_SOURCE_LABELS = new Set([
  "report",
  "official release",
  "executive summary",
]);
const MEDIA_PATH = /\.(?:mp3|mp4|m4a|wav|ogg|pdf)(?:$|[?#])/i;

function decodeHtml(value) {
  return value
    .replaceAll("&amp;", "&")
    .replaceAll("&quot;", '"')
    .replaceAll("&#39;", "'")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">")
    .replaceAll("\\u0026", "&")
    .replaceAll("\\u003d", "=");
}

function stripTags(value) {
  return decodeHtml(value.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ")).trim();
}

function attributes(tag) {
  const result = {};
  for (const match of tag.matchAll(
    /([:\w-]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+)))?/g
  )) {
    const [, name, doubleQuoted, singleQuoted, unquoted] = match;
    result[name.toLowerCase()] = decodeHtml(
      doubleQuoted ?? singleQuoted ?? unquoted ?? ""
    );
  }
  return result;
}

function normalizeUrl(value) {
  const url = new URL(value);
  url.hash = "";
  if (url.pathname !== "/") url.pathname = url.pathname.replace(/\/$/, "");
  return url.toString();
}

function routeForUrl(value, origin = DEFAULT_ORIGIN) {
  const url = new URL(value, origin);
  return url.pathname === "/" ? "/" : url.pathname.replace(/\/$/, "");
}

function hasTrackingParameters(value) {
  const url = new URL(value);
  return [...url.searchParams.keys()].some((key) =>
    key.toLowerCase().startsWith("utm_")
  );
}

function collectJsonLd(value, output = []) {
  if (!value || typeof value !== "object") return output;
  if (Array.isArray(value)) {
    for (const item of value) collectJsonLd(item, output);
    return output;
  }
  output.push(value);
  for (const nested of Object.values(value)) collectJsonLd(nested, output);
  return output;
}

export function extractSitemapUrls(xml) {
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) =>
    decodeHtml(match[1].trim())
  );
}

export function extractDocument(html, documentUrl) {
  const anchors = [];
  for (const match of html.matchAll(/<a\b([^>]*)>([\s\S]*?)<\/a>/gi)) {
    const attrs = attributes(match[1]);
    if (!attrs.href) continue;
    anchors.push({
      href: attrs.href,
      text: stripTags(match[2]),
      target: attrs.target ?? "",
      rel: (attrs.rel ?? "").toLowerCase().split(/\s+/).filter(Boolean),
    });
  }

  const ids = new Set();
  for (const match of html.matchAll(/\b(?:id|name)="([^"]+)"/gi)) {
    ids.add(decodeHtml(match[1]));
  }

  const canonicals = [];
  const ogUrls = [];
  let noindex = false;
  for (const match of html.matchAll(/<(?:link|meta)\b[^>]*>/gi)) {
    const attrs = attributes(match[0]);
    if (
      attrs.rel?.toLowerCase().split(/\s+/).includes("canonical") &&
      attrs.href
    ) {
      canonicals.push(attrs.href);
    }
    if (attrs.property?.toLowerCase() === "og:url" && attrs.content) {
      ogUrls.push(attrs.content);
    }
    if (
      attrs.name?.toLowerCase() === "robots" &&
      /(?:^|,)\s*noindex\b/i.test(attrs.content ?? "")
    ) {
      noindex = true;
    }
  }

  const jsonLd = [];
  for (const match of html.matchAll(
    /<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi
  )) {
    try {
      jsonLd.push(JSON.parse(decodeHtml(match[1])));
    } catch (error) {
      jsonLd.push({
        __parseError: error instanceof Error ? error.message : String(error),
      });
    }
  }

  const serializedUrls = new Set();
  for (const match of decodeHtml(html).matchAll(/https?:\/\/[^\s"'<>\\]+/g)) {
    const candidate = match[0].replace(/[),.;]+$/, "");
    try {
      serializedUrls.add(new URL(candidate).toString());
    } catch {
      // Ignore truncated strings that are not URLs.
    }
  }

  const mediaUrls = [...serializedUrls].filter((url) => MEDIA_PATH.test(url));
  const resolvedAnchors = anchors.map((anchor) => {
    try {
      return { ...anchor, url: new URL(anchor.href, documentUrl).toString() };
    } catch {
      return { ...anchor, url: undefined };
    }
  });

  return {
    url: documentUrl,
    anchors: resolvedAnchors,
    ids,
    canonicals,
    ogUrls,
    noindex,
    jsonLd,
    mediaUrls,
  };
}

function walkFiles(directory) {
  const files = [];
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const candidate = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...walkFiles(candidate));
    else files.push(candidate);
  }
  return files;
}

function routeForHtmlFile(file, buildDir) {
  const relative = path.relative(buildDir, file).replaceAll(path.sep, "/");
  if (relative === "index.html") return "/";
  return `/${relative.replace(/\.html$/, "")}`;
}

function addError(errors, code, url, detail) {
  errors.push({ code, url, detail });
}

function articleNodes(document) {
  return document.jsonLd
    .flatMap((value) => collectJsonLd(value, []))
    .filter((value) =>
      ["Article", "NewsArticle", "CollectionPage"].includes(value["@type"])
    );
}

export function auditStaticBuild({
  buildDir = path.join(process.cwd(), ".next/server/app"),
  origin = DEFAULT_ORIGIN,
} = {}) {
  const errors = [];
  const sitemapPath = path.join(buildDir, "sitemap.xml.body");
  if (!fs.existsSync(sitemapPath)) {
    return {
      mode: "static",
      errors: [{ code: "missing-sitemap", url: origin, detail: sitemapPath }],
      counts: {},
    };
  }

  const sitemapUrls = extractSitemapUrls(fs.readFileSync(sitemapPath, "utf8"));
  const sitemapSet = new Set(sitemapUrls.map(normalizeUrl));
  const documents = new Map();
  for (const file of walkFiles(buildDir).filter((candidate) =>
    candidate.endsWith(".html")
  )) {
    const route = routeForHtmlFile(file, buildDir);
    if (route.startsWith("/_") || route === "/404" || route === "/500")
      continue;
    const url = new URL(route, origin).toString();
    documents.set(route, extractDocument(fs.readFileSync(file, "utf8"), url));
  }

  const indexableUrls = new Set();
  for (const document of documents.values()) {
    if (document.noindex || document.canonicals.length !== 1) continue;
    try {
      const canonical = normalizeUrl(document.canonicals[0]);
      if (
        new URL(canonical).origin === new URL(origin).origin &&
        routeForUrl(canonical, origin) === routeForUrl(document.url, origin)
      ) {
        indexableUrls.add(canonical);
      }
    } catch {
      // Invalid canonicals are reported on the public document pass below.
    }
  }

  for (const url of sitemapSet) {
    const route = routeForUrl(url, origin);
    if (!documents.has(route))
      addError(errors, "missing-public-route", url, route);
    if (!indexableUrls.has(url)) {
      addError(errors, "sitemap-route-not-indexable", url, route);
    }
  }
  for (const url of indexableUrls) {
    if (!sitemapSet.has(url))
      addError(errors, "indexable-route-not-sitemapped", url, routeForUrl(url));
  }

  let externalLinks = 0;
  let internalLinks = 0;
  let mediaLinks = 0;
  for (const sitemapUrl of sitemapUrls) {
    const normalizedSitemapUrl = normalizeUrl(sitemapUrl);
    const route = routeForUrl(sitemapUrl, origin);
    const document = documents.get(route);
    if (!document) continue;

    if (document.canonicals.length !== 1) {
      addError(
        errors,
        "canonical-count",
        sitemapUrl,
        String(document.canonicals.length)
      );
    } else if (normalizeUrl(document.canonicals[0]) !== normalizedSitemapUrl) {
      addError(
        errors,
        "canonical-mismatch",
        sitemapUrl,
        document.canonicals[0]
      );
    }
    if (
      document.ogUrls.length !== 1 ||
      normalizeUrl(document.ogUrls[0]) !== normalizedSitemapUrl
    ) {
      addError(
        errors,
        "open-graph-url-mismatch",
        sitemapUrl,
        document.ogUrls.join(", ")
      );
    }
    if (document.noindex)
      addError(errors, "public-route-noindex", sitemapUrl, "robots noindex");

    for (const value of document.jsonLd) {
      if (value.__parseError)
        addError(errors, "json-ld-invalid", sitemapUrl, value.__parseError);
    }
    for (const node of articleNodes(document)) {
      if (node.url && normalizeUrl(String(node.url)) !== normalizedSitemapUrl) {
        addError(errors, "json-ld-url-mismatch", sitemapUrl, String(node.url));
      }
      if (["Article", "NewsArticle"].includes(node["@type"])) {
        if (!node.datePublished || !node.dateModified || !node.image) {
          addError(
            errors,
            "json-ld-article-incomplete",
            sitemapUrl,
            String(node["@type"])
          );
        }
      }
    }

    for (const anchor of document.anchors) {
      if (!anchor.url) {
        addError(errors, "invalid-anchor-url", sitemapUrl, anchor.href);
        continue;
      }
      const target = new URL(anchor.url);
      if (!["http:", "https:"].includes(target.protocol)) continue;
      if (target.origin === new URL(origin).origin) {
        internalLinks += 1;
        const targetRoute = routeForUrl(target.toString(), origin);
        const targetDocument = documents.get(targetRoute);
        if (!targetDocument) {
          addError(errors, "broken-internal-route", sitemapUrl, anchor.href);
        } else if (
          target.hash &&
          !targetDocument.ids.has(decodeURIComponent(target.hash.slice(1)))
        ) {
          addError(errors, "broken-internal-fragment", sitemapUrl, anchor.href);
        }
        continue;
      }

      externalLinks += 1;
      if (target.protocol !== "https:")
        addError(errors, "insecure-external-url", sitemapUrl, anchor.href);
      if (hasTrackingParameters(target.toString()))
        addError(errors, "tracked-editorial-url", sitemapUrl, anchor.href);
      if (!anchor.text)
        addError(errors, "empty-external-label", sitemapUrl, anchor.href);
      if (AMBIGUOUS_SOURCE_LABELS.has(anchor.text.toLowerCase())) {
        addError(errors, "ambiguous-source-label", sitemapUrl, anchor.text);
      }
      if (anchor.target !== "_blank" || !anchor.rel.includes("noreferrer")) {
        addError(errors, "unsafe-external-anchor", sitemapUrl, anchor.href);
      }
    }

    for (const mediaUrl of document.mediaUrls) {
      mediaLinks += 1;
      const target = new URL(mediaUrl);
      if (target.protocol !== "https:")
        addError(errors, "insecure-media-url", sitemapUrl, mediaUrl);
      if (hasTrackingParameters(mediaUrl))
        addError(errors, "tracked-media-url", sitemapUrl, mediaUrl);
    }
  }

  return {
    mode: "static",
    errors,
    counts: {
      sitemapRoutes: sitemapUrls.length,
      renderedRoutes: documents.size,
      internalLinks,
      externalLinks,
      mediaLinks,
    },
  };
}

function statusKind(status) {
  if (status >= 200 && status < 300) return "reachable";
  if (RESTRICTED_STATUSES.has(status)) return "restricted";
  if (MISSING_STATUSES.has(status)) return "missing";
  return "inconclusive";
}

async function fetchWithTimeout(fetchImpl, url, options, timeoutMs) {
  const controller = new AbortController();
  let timeoutId;
  const timeout = new Promise((_, reject) => {
    timeoutId = setTimeout(() => {
      controller.abort();
      const error = new Error(`Timed out after ${timeoutMs}ms`);
      error.name = "TimeoutError";
      reject(error);
    }, timeoutMs);
  });
  try {
    return await Promise.race([
      fetchImpl(url, { ...options, signal: controller.signal }),
      timeout,
    ]);
  } finally {
    clearTimeout(timeoutId);
  }
}

async function probeUrl(
  url,
  { fetchImpl, timeoutMs, method = "GET", ranged = false }
) {
  let current = url;
  const redirects = [];
  for (let hop = 0; hop < 6; hop += 1) {
    try {
      const response = await fetchWithTimeout(
        fetchImpl,
        current,
        {
          method,
          redirect: "manual",
          headers: {
            "user-agent": "MainlandDispatchLinkAudit/1.0",
            accept:
              method === "HEAD"
                ? "*/*"
                : "text/html,application/xhtml+xml,application/pdf,*/*;q=0.5",
            ...(ranged ? { range: "bytes=0-0" } : {}),
          },
        },
        timeoutMs
      );
      if (response.status >= 300 && response.status < 400) {
        const location = response.headers.get("location");
        if (!location)
          return {
            status: response.status,
            finalUrl: current,
            redirects,
            error: "redirect without location",
          };
        const next = new URL(location, current).toString();
        redirects.push(next);
        if (
          new URL(current).protocol === "https:" &&
          new URL(next).protocol === "http:"
        ) {
          return {
            status: response.status,
            finalUrl: next,
            redirects,
            downgrade: true,
          };
        }
        current = next;
        continue;
      }
      return { status: response.status, finalUrl: current, redirects };
    } catch (error) {
      return {
        finalUrl: current,
        redirects,
        error:
          error instanceof Error
            ? `${error.name}: ${error.message}`
            : String(error),
      };
    }
  }
  return { finalUrl: current, redirects, error: "too many redirects" };
}

export async function checkThirdPartyUrl(
  url,
  { fetchImpl = fetch, timeoutMs = 12_000, media = MEDIA_PATH.test(url) } = {}
) {
  if (media) {
    const head = await probeUrl(url, { fetchImpl, timeoutMs, method: "HEAD" });
    if (head.downgrade)
      return {
        url,
        classification: "dead",
        reason: "https-downgrade",
        ...head,
      };
    if (head.status && statusKind(head.status) === "reachable") {
      return {
        url,
        classification: head.redirects.length ? "redirected" : "reachable",
        reason: `HTTP ${head.status}`,
        ...head,
      };
    }
    if (head.status && statusKind(head.status) === "restricted") {
      return {
        url,
        classification: "restricted",
        reason: `HTTP ${head.status}`,
        ...head,
      };
    }
  }

  const first = await probeUrl(url, {
    fetchImpl,
    timeoutMs,
    method: "GET",
    ranged: media,
  });
  if (first.downgrade)
    return { url, classification: "dead", reason: "https-downgrade", ...first };
  if (!first.status)
    return {
      url,
      classification: "inconclusive",
      reason: first.error,
      ...first,
    };

  const firstKind = statusKind(first.status);
  if (firstKind === "reachable") {
    return {
      url,
      classification: first.redirects.length ? "redirected" : "reachable",
      reason: `HTTP ${first.status}`,
      ...first,
    };
  }
  if (firstKind === "restricted") {
    return {
      url,
      classification: "restricted",
      reason: `HTTP ${first.status}`,
      ...first,
    };
  }
  if (firstKind !== "missing") {
    return {
      url,
      classification: "inconclusive",
      reason: `HTTP ${first.status}`,
      ...first,
    };
  }

  const second = await probeUrl(url, {
    fetchImpl,
    timeoutMs,
    method: "GET",
    ranged: media,
  });
  if (second.downgrade)
    return {
      url,
      classification: "dead",
      reason: "https-downgrade",
      ...second,
    };
  if (second.status && MISSING_STATUSES.has(second.status)) {
    return {
      url,
      classification: "dead",
      reason: `confirmed HTTP ${first.status}/${second.status}`,
      ...second,
    };
  }
  return {
    url,
    classification: "inconclusive",
    reason: second.status
      ? `HTTP ${first.status}/${second.status}`
      : second.error,
    ...second,
  };
}

export async function mapConcurrent(values, limit, callback) {
  const results = new Array(values.length);
  let cursor = 0;
  async function worker() {
    while (cursor < values.length) {
      const index = cursor;
      cursor += 1;
      results[index] = await callback(values[index], index);
    }
  }
  await Promise.all(
    Array.from({ length: Math.min(limit, values.length) }, worker)
  );
  return results;
}

async function fetchFirstPartyDocument(url, { fetchImpl, timeoutMs }) {
  let response;
  try {
    response = await fetchWithTimeout(
      fetchImpl,
      url,
      {
        method: "GET",
        redirect: "manual",
        headers: { "user-agent": "MainlandDispatchLinkAudit/1.0" },
      },
      timeoutMs
    );
  } catch (error) {
    return {
      url,
      ok: false,
      detail:
        error instanceof Error
          ? `${error.name}: ${error.message}`
          : String(error),
    };
  }
  if (response.status < 200 || response.status >= 300) {
    return { url, ok: false, detail: `HTTP ${response.status}` };
  }
  const html = await response.text();
  const document = extractDocument(html, url);
  const expected = normalizeUrl(url);
  if (document.noindex) return { url, ok: false, detail: "robots noindex" };
  if (
    document.canonicals.length !== 1 ||
    normalizeUrl(document.canonicals[0]) !== expected
  ) {
    return {
      url,
      ok: false,
      detail: `canonical ${document.canonicals.join(", ")}`,
    };
  }
  return { url, ok: true, document };
}

export async function auditLiveSite({
  origin = DEFAULT_ORIGIN,
  fetchImpl = fetch,
  concurrency = 8,
  timeoutMs = 12_000,
} = {}) {
  const sitemapUrl = new URL("/sitemap.xml", origin).toString();
  let sitemapResponse;
  try {
    sitemapResponse = await fetchWithTimeout(
      fetchImpl,
      sitemapUrl,
      {
        method: "GET",
        redirect: "manual",
        headers: { "user-agent": "MainlandDispatchLinkAudit/1.0" },
      },
      timeoutMs
    );
  } catch (error) {
    return {
      mode: "live",
      firstParty: [{ url: sitemapUrl, ok: false, detail: String(error) }],
      thirdParty: [],
      errors: [
        {
          code: "live-sitemap-unavailable",
          url: sitemapUrl,
          detail: String(error),
        },
      ],
      counts: {},
    };
  }
  if (sitemapResponse.status < 200 || sitemapResponse.status >= 300) {
    return {
      mode: "live",
      firstParty: [
        {
          url: sitemapUrl,
          ok: false,
          detail: `HTTP ${sitemapResponse.status}`,
        },
      ],
      thirdParty: [],
      errors: [
        {
          code: "live-sitemap-unavailable",
          url: sitemapUrl,
          detail: `HTTP ${sitemapResponse.status}`,
        },
      ],
      counts: {},
    };
  }

  const sitemapUrls = extractSitemapUrls(await sitemapResponse.text());
  const firstParty = await mapConcurrent(sitemapUrls, concurrency, (url) =>
    fetchFirstPartyDocument(url, { fetchImpl, timeoutMs })
  );
  const targets = new Map();
  for (const item of firstParty) {
    if (!item.ok) continue;
    for (const anchor of item.document.anchors) {
      if (!anchor.url) continue;
      const target = new URL(anchor.url);
      if (
        target.origin !== new URL(origin).origin &&
        ["http:", "https:"].includes(target.protocol)
      ) {
        targets.set(target.toString(), {
          url: target.toString(),
          media: MEDIA_PATH.test(target.toString()),
        });
      }
    }
    for (const mediaUrl of item.document.mediaUrls) {
      const target = new URL(mediaUrl);
      if (target.origin !== new URL(origin).origin)
        targets.set(target.toString(), { url: target.toString(), media: true });
    }
  }

  const thirdParty = await mapConcurrent(
    [...targets.values()],
    concurrency,
    (target) =>
      checkThirdPartyUrl(target.url, {
        fetchImpl,
        timeoutMs,
        media: target.media,
      })
  );
  const errors = [
    ...firstParty
      .filter((item) => !item.ok)
      .map((item) => ({
        code: "first-party-route-failed",
        url: item.url,
        detail: item.detail,
      })),
    ...thirdParty
      .filter((item) => item.classification === "dead")
      .map((item) => ({
        code: "confirmed-dead-external",
        url: item.url,
        detail: item.reason,
      })),
  ];
  const classifications = {};
  for (const item of thirdParty) {
    classifications[item.classification] =
      (classifications[item.classification] ?? 0) + 1;
  }
  return {
    mode: "live",
    firstParty,
    thirdParty,
    errors,
    counts: {
      sitemapRoutes: sitemapUrls.length,
      thirdPartyUrls: thirdParty.length,
      ...classifications,
    },
  };
}

export function renderReport(report) {
  const lines = [
    `## ${report.mode === "static" ? "Static evidence-link audit" : "Live evidence-link audit"}`,
    "",
    ...Object.entries(report.counts ?? {}).map(
      ([key, value]) => `- ${key}: ${value}`
    ),
    `- failures: ${report.errors.length}`,
  ];
  if (report.errors.length) {
    lines.push("", "### Failures", "");
    for (const error of report.errors)
      lines.push(`- ${error.code}: ${error.url} (${error.detail})`);
  }
  if (report.mode === "live" && report.thirdParty.length) {
    lines.push("", "### Classified third-party destinations", "");
    for (const item of report.thirdParty) {
      lines.push(`- ${item.classification}: ${item.url} (${item.reason})`);
    }
  }
  return `${lines.join("\n")}\n`;
}

function optionValue(args, name, fallback) {
  const index = args.indexOf(name);
  return index === -1 ? fallback : args[index + 1];
}

async function main() {
  const [, , mode = "static", ...args] = process.argv;
  const origin = optionValue(args, "--origin", DEFAULT_ORIGIN);
  const report =
    mode === "static"
      ? auditStaticBuild({
          origin,
          buildDir: optionValue(
            args,
            "--build-dir",
            path.join(process.cwd(), ".next/server/app")
          ),
        })
      : mode === "live"
        ? await auditLiveSite({
            origin,
            concurrency: Number(optionValue(args, "--concurrency", "8")),
            timeoutMs: Number(optionValue(args, "--timeout-ms", "12000")),
          })
        : (() => {
            throw new Error(`Unknown mode: ${mode}`);
          })();
  const output = args.includes("--json")
    ? `${JSON.stringify(report, null, 2)}\n`
    : renderReport(report);
  process.stdout.write(output);
  const summaryPath = optionValue(args, "--summary", undefined);
  if (summaryPath) fs.appendFileSync(summaryPath, output);
  if (report.errors.length) process.exitCode = 1;
}

if (
  process.argv[1] &&
  import.meta.url === pathToFileURL(process.argv[1]).href
) {
  await main();
}
