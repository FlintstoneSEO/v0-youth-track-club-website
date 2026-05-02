export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.lansingatc.com'

export const siteConfig = {
  name: 'Lansing Area Track Club',
  shortName: 'LATC',
  founder: 'Ramon Brunson',
  email: 'info@lansingatc.com',
  city: 'Lansing',
  region: 'MI',
  country: 'US',
  areaServed: [
    'Lansing',
    'East Lansing',
    'Okemos',
    'Holt',
    'Waverly',
    'Delta Township',
    'Haslett',
    'Mid-Michigan',
  ],
  description:
    'Lansing Area Track Club helps youth athletes in Lansing, Michigan build speed, endurance, confidence, and discipline through track, running, practices, meets, and community events.',
  publicRoutes: [
    '/',
    '/about',
    '/practices',
    '/events',
    '/announcements',
    '/faq',
    '/run-tha-city-517',
    '/juneteenth-5k',
    '/contact',
  ],
}
