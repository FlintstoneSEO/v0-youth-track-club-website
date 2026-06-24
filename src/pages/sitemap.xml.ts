import site from "@/data/site.json";

const routes = [
  "/",
  "/about/",
  "/practices/",
  "/events/",
  "/announcements/",
  "/faq/",
  "/run-tha-city-517/",
  "/juneteenth-5k/",
  "/contact/",
];

export function GET() {
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map((route) => `  <url><loc>${site.site_url}${route}</loc><changefreq>${route === "/" ? "weekly" : "monthly"}</changefreq></url>`)
  .join("\n")}
</urlset>`;

  return new Response(body, {
    headers: { "Content-Type": "application/xml" },
  });
}
