const sitemapUrl = process.argv[2] || "https://experienceecuador.com/sitemap.xml";
const concurrency = Math.max(1, Number(process.argv[3] || 12));

const decode = (value = "") => value
  .replace(/&amp;/g, "&")
  .replace(/&quot;/g, '"')
  .replace(/&#39;|&apos;/g, "'")
  .replace(/&lt;/g, "<")
  .replace(/&gt;/g, ">");

const strip = (value = "") => decode(value.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim());
const first = (html, pattern) => strip(html.match(pattern)?.[1] || "");
const attr = (tag, name) => decode(tag.match(new RegExp(`${name}=["']([^"']*)["']`, "i"))?.[1] || "");
const csv = (value) => `"${String(value ?? "").replace(/"/g, '""')}"`;

const sitemapResponse = await fetch(sitemapUrl, { redirect: "follow" });
if (!sitemapResponse.ok) throw new Error(`Sitemap returned HTTP ${sitemapResponse.status}`);
const sitemap = await sitemapResponse.text();
const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => decode(match[1].trim()));
if (!urls.length) throw new Error("No sitemap URLs found");

const rows = new Array(urls.length);
let cursor = 0;

async function worker() {
  while (cursor < urls.length) {
    const index = cursor++;
    const url = urls[index];
    try {
      const response = await fetch(url, { redirect: "follow", headers: { "user-agent": "ExperienceEcuadorReleaseAudit/1.0" } });
      const html = await response.text();
      const canonicalTag = html.match(/<link\b[^>]*rel=["'][^"']*canonical[^"']*["'][^>]*>/i)?.[0] || "";
      const robotsTag = html.match(/<meta\b[^>]*name=["']robots["'][^>]*>/i)?.[0] || "";
      const descriptionTag = html.match(/<meta\b[^>]*name=["']description["'][^>]*>/i)?.[0] || "";
      const htmlTag = html.match(/<html\b[^>]*>/i)?.[0] || "";
      const hreflangs = [...html.matchAll(/<link\b[^>]*hreflang=["']([^"']+)["'][^>]*>/gi)].map((match) => match[1]).sort();
      const schemaCount = [...html.matchAll(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>/gi)].length;
      rows[index] = {
        url,
        status: response.status,
        finalUrl: response.url,
        title: first(html, /<title[^>]*>([\s\S]*?)<\/title>/i),
        description: attr(descriptionTag, "content"),
        h1: first(html, /<h1[^>]*>([\s\S]*?)<\/h1>/i),
        canonical: attr(canonicalTag, "href"),
        lang: attr(htmlTag, "lang"),
        hreflangs: [...new Set(hreflangs)].join(";"),
        robots: attr(robotsTag, "content"),
        xRobots: response.headers.get("x-robots-tag") || "",
        schemaCount,
        siteJs: /\/assets\/js\/site\.js(?:\?|["'])/i.test(html),
        clusterCss: first(html, /<link\b[^>]*href=["']([^"']*cluster-[^"']+\.css[^"']*)["'][^>]*>/i),
        error: ""
      };
    } catch (error) {
      rows[index] = { url, status: 0, finalUrl: "", title: "", description: "", h1: "", canonical: "", lang: "", hreflangs: "", robots: "", xRobots: "", schemaCount: 0, siteJs: false, clusterCss: "", error: error.message };
    }
  }
}

await Promise.all(Array.from({ length: Math.min(concurrency, urls.length) }, worker));

const headers = ["URL", "HTTP", "Final URL", "Title", "Meta description", "H1", "Canonical", "Lang", "Hreflang", "Meta robots", "X-Robots-Tag", "Schema blocks", "Site JS", "Cluster CSS", "Error"];
console.log(headers.map(csv).join(","));
for (const row of rows) {
  console.log([
    row.url, row.status, row.finalUrl, row.title, row.description, row.h1, row.canonical,
    row.lang, row.hreflangs, row.robots, row.xRobots, row.schemaCount,
    row.siteJs, row.clusterCss, row.error
  ].map(csv).join(","));
}

const failures = rows.filter((row) =>
  row.status !== 200 ||
  row.finalUrl !== row.url ||
  !row.title || !row.description || !row.h1 ||
  row.canonical !== row.url ||
  !row.lang || !row.hreflangs.includes("x-default") ||
  /noindex/i.test(`${row.robots} ${row.xRobots}`) ||
  row.schemaCount < 1 || !row.siteJs || !row.clusterCss || row.error
);
console.error(JSON.stringify({ sitemapUrl, crawled: rows.length, failures: failures.length }, null, 2));
if (failures.length) process.exitCode = 1;
