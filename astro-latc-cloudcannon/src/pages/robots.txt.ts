import site from "@/data/site.json";

export function GET() {
  return new Response(`User-agent: *
Allow: /

Sitemap: ${site.site_url}/sitemap.xml
`, {
    headers: { "Content-Type": "text/plain" },
  });
}
