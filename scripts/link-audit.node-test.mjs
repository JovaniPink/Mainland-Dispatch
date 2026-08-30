import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import {
  auditStaticBuild,
  auditLiveSite,
  checkThirdPartyUrl,
  extractDocument,
  extractSitemapUrls,
  mapConcurrent,
} from "./link-audit.mjs";

function response(status, headers = {}, body = "") {
  return new Response(body, { status, headers });
}

function sequenceFetch(responses, calls = []) {
  return async (url, options = {}) => {
    calls.push({ url, options });
    const next = responses.shift();
    if (next instanceof Error) throw next;
    if (!next) throw new Error("unexpected fetch");
    return next;
  };
}

test("extracts sitemap URLs and rendered metadata, anchors, fragments, and media", () => {
  assert.deepEqual(
    extractSitemapUrls(
      "<urlset><url><loc>https://example.com/a</loc></url></urlset>"
    ),
    ["https://example.com/a"]
  );
  const document = extractDocument(
    '<link rel="canonical" href="https://example.com/a"><meta property="og:url" content="https://example.com/a"><a id="source" href="https://publisher.test/report" target="_blank" rel="noreferrer">Specific report</a><script type="application/ld+json">{"@type":"Article","url":"https://example.com/a"}</script><script>"https://cdn.test/file.mp3"</script>',
    "https://example.com/a"
  );
  assert.equal(document.canonicals[0], "https://example.com/a");
  assert.equal(document.ogUrls[0], "https://example.com/a");
  assert.equal(document.anchors[0].text, "Specific report");
  assert.ok(document.ids.has("source"));
  assert.deepEqual(document.mediaUrls, ["https://cdn.test/file.mp3"]);
});

test("static mode reports route, fragment, URL, anchor, and metadata failures", () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "mainland-link-audit-"));
  try {
    fs.writeFileSync(
      path.join(root, "sitemap.xml.body"),
      "<urlset><url><loc>https://example.com/</loc></url></urlset>"
    );
    fs.writeFileSync(
      path.join(root, "index.html"),
      '<link rel="canonical" href="https://example.com/wrong"><meta property="og:url" content="https://example.com/wrong"><a href="/missing#absent">Broken</a><a href="http://publisher.test/report?utm_source=test">Report</a><script type="application/ld+json">{"@type":"Article","url":"https://example.com/wrong"}</script>'
    );

    const report = auditStaticBuild({
      buildDir: root,
      origin: "https://example.com",
    });
    const codes = new Set(report.errors.map((error) => error.code));
    assert.ok(codes.has("sitemap-route-not-indexable"));
    assert.ok(codes.has("canonical-mismatch"));
    assert.ok(codes.has("open-graph-url-mismatch"));
    assert.ok(codes.has("broken-internal-route"));
    assert.ok(codes.has("insecure-external-url"));
    assert.ok(codes.has("tracked-editorial-url"));
    assert.ok(codes.has("ambiguous-source-label"));
    assert.ok(codes.has("unsafe-external-anchor"));
    assert.ok(codes.has("json-ld-url-mismatch"));
    assert.ok(codes.has("json-ld-article-incomplete"));
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
});

test("classifies reachable, restricted, redirected, confirmed missing, and transient responses", async () => {
  const reachable = await checkThirdPartyUrl("https://source.test/a", {
    fetchImpl: sequenceFetch([response(200)]),
    media: false,
  });
  assert.equal(reachable.classification, "reachable");

  const restricted = await checkThirdPartyUrl("https://source.test/b", {
    fetchImpl: sequenceFetch([response(403)]),
    media: false,
  });
  assert.equal(restricted.classification, "restricted");

  const redirected = await checkThirdPartyUrl("https://source.test/c", {
    fetchImpl: sequenceFetch([
      response(302, { location: "https://source.test/final" }),
      response(200),
    ]),
    media: false,
  });
  assert.equal(redirected.classification, "redirected");
  assert.equal(redirected.finalUrl, "https://source.test/final");

  const missing = await checkThirdPartyUrl("https://source.test/missing", {
    fetchImpl: sequenceFetch([response(404), response(410)]),
    media: false,
  });
  assert.equal(missing.classification, "dead");
  assert.match(missing.reason, /confirmed HTTP 404\/410/);

  const transient = await checkThirdPartyUrl("https://source.test/transient", {
    fetchImpl: sequenceFetch([response(404), response(500)]),
    media: false,
  });
  assert.equal(transient.classification, "inconclusive");
});

test("fails an HTTPS downgrade and treats resets and timeouts as inconclusive", async () => {
  const downgraded = await checkThirdPartyUrl("https://source.test/a", {
    fetchImpl: sequenceFetch([
      response(302, { location: "http://source.test/a" }),
    ]),
    media: false,
  });
  assert.equal(downgraded.classification, "dead");
  assert.equal(downgraded.reason, "https-downgrade");

  const reset = await checkThirdPartyUrl("https://source.test/reset", {
    fetchImpl: sequenceFetch([new TypeError("socket reset")]),
    media: false,
  });
  assert.equal(reset.classification, "inconclusive");

  const timeout = await checkThirdPartyUrl("https://source.test/timeout", {
    fetchImpl: () => new Promise(() => {}),
    timeoutMs: 5,
    media: false,
  });
  assert.equal(timeout.classification, "inconclusive");
  assert.match(timeout.reason, /TimeoutError/);
});

test("uses HEAD for reachable media and a ranged GET fallback", async () => {
  const headCalls = [];
  const head = await checkThirdPartyUrl("https://cdn.test/audio.mp3", {
    fetchImpl: sequenceFetch([response(200)], headCalls),
    media: true,
  });
  assert.equal(head.classification, "reachable");
  assert.equal(headCalls[0].options.method, "HEAD");

  const fallbackCalls = [];
  const fallback = await checkThirdPartyUrl("https://cdn.test/report.pdf", {
    fetchImpl: sequenceFetch([response(405), response(206)], fallbackCalls),
    media: true,
  });
  assert.equal(fallback.classification, "reachable");
  assert.equal(fallbackCalls[1].options.method, "GET");
  assert.equal(fallbackCalls[1].options.headers.range, "bytes=0-0");
});

test("live mode reads response bodies and validates first- and third-party routes", async () => {
  const origin = "https://example.com";
  const sitemap = "<urlset><url><loc>https://example.com/</loc></url></urlset>";
  const html =
    '<link rel="canonical" href="https://example.com/"><meta property="og:url" content="https://example.com/"><a href="https://publisher.test/evidence" target="_blank" rel="noreferrer">Evidence record</a>';
  const fetchImpl = async (url) => {
    if (url === `${origin}/sitemap.xml`) return response(200, {}, sitemap);
    if (url === `${origin}/`) return response(200, {}, html);
    if (url === "https://publisher.test/evidence") return response(200);
    throw new Error(`unexpected URL ${url}`);
  };

  const report = await auditLiveSite({ origin, fetchImpl, concurrency: 2 });

  assert.equal(report.errors.length, 0);
  assert.equal(report.firstParty[0].ok, true);
  assert.equal(report.thirdParty[0].classification, "reachable");
});

test("bounded concurrency preserves input order", async () => {
  let active = 0;
  let peak = 0;
  const values = await mapConcurrent([1, 2, 3, 4], 2, async (value) => {
    active += 1;
    peak = Math.max(peak, active);
    await new Promise((resolve) => setTimeout(resolve, 2));
    active -= 1;
    return value * 2;
  });
  assert.deepEqual(values, [2, 4, 6, 8]);
  assert.equal(peak, 2);
});
