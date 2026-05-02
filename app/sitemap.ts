import type { MetadataRoute } from 'next'
import { siteConfig, siteUrl } from '@/lib/site'

const routePriority: Record<string, number> = {
  '/': 1,
  '/contact': 0.95,
  '/practices': 0.9,
  '/events': 0.9,
  '/about': 0.85,
  '/run-tha-city-517': 0.8,
  '/juneteenth-5k': 0.8,
  '/announcements': 0.75,
  '/faq': 0.7,
}

export default function sitemap(): MetadataRoute.Sitemap {
  return siteConfig.publicRoutes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '/' ? 'weekly' : 'monthly',
    priority: routePriority[route] || 0.6,
  }))
}
