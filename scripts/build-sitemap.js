/**
 * Build a sitemap.xml from the static route list.
 */

import { writeFileSync } from "fs"
import { resolve } from "path"

const BASE_URL = "https://citywalkrealestatellc.com"

const ROUTES = [
  { path: "/",            priority: 1.0, changefreq: "daily" },
  { path: "/properties",  priority: 0.9, changefreq: "daily" },
  { path: "/properties/rent", priority: 0.8, changefreq: "weekly" },
  { path: "/sell",        priority: 0.8, changefreq: "weekly" },
  { path: "/off-plan",    priority: 0.8, changefreq: "weekly" },
  { path: "/commercial",  priority: 0.8, changefreq: "weekly" },
  { path: "/about",       priority: 0.7, changefreq: "monthly" },
  { path: "/meet-the-team", priority: 0.6, changefreq: "monthly" },
  { path: "/our-team",    priority: 0.2, changefreq: "monthly" },
  { path: "/careers",     priority: 0.6, changefreq: "monthly" },
  { path: "/blog",        priority: 0.7, changefreq: "daily" },
  { path: "/contact",     priority: 0.8, changefreq: "monthly" },
  { path: "/terms",       priority: 0.4, changefreq: "yearly" },
  { path: "/accessibility", priority: 0.3, changefreq: "yearly" },
]

const urls = ROUTES.map(({ path: rPath, priority, changefreq }) =>
  `  <url>
    <loc>${BASE_URL}${rPath}</loc>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority.toFixed(1)}</priority>
  </url>`
).join("\n")

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`

const DIST_DIR = resolve(process.cwd(), "dist")
writeFileSync(resolve(DIST_DIR, "sitemap.xml"), sitemap, "utf8")
console.log(`✓ sitemap.xml → dist/sitemap.xml (${ROUTES.length} routes)`)
