import type { Metadata, Viewport } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { siteConfig, siteUrl } from '@/lib/site'
import './globals.css'

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter'
})

const spaceGrotesk = Space_Grotesk({ 
  subsets: ["latin"],
  variable: '--font-space-grotesk'
})

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Lansing Area Track Club | Youth Track & Running Club in Lansing, MI',
    template: '%s | Lansing Area Track Club'
  },
  description: siteConfig.description,
  keywords: [
    'Lansing Area Track Club',
    'Lansing youth track club',
    'youth track club Lansing MI',
    'youth running club Lansing Michigan',
    'kids track club Lansing',
    'track and field club Lansing MI',
    'youth sports Lansing MI',
    'Lansing running club',
    'Run Tha City 517',
    'Lansing community running group',
    'Lansing Juneteenth 5K',
    'youth track training Lansing',
    'Mid-Michigan youth track'
  ],
  authors: [{ name: 'Ramon Brunson' }],
  creator: 'Lansing Area Track Club',
  publisher: 'Lansing Area Track Club',
  category: 'Youth Sports',
  openGraph: {
    title: 'Lansing Area Track Club | Youth Track & Running Club in Lansing, MI',
    description: siteConfig.description,
    url: siteUrl,
    locale: 'en_US',
    type: 'website',
    siteName: 'Lansing Area Track Club',
    images: [
      {
        url: '/images/latc-logo.jpg',
        width: 1200,
        height: 1200,
        alt: 'Lansing Area Track Club logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lansing Area Track Club',
    description: 'Youth track and running programs for kids through high school in Lansing, Michigan.',
    images: ['/images/latc-logo.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },
}

export const viewport: Viewport = {
  themeColor: '#2e54a0',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const organizationJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SportsOrganization',
    '@id': `${siteUrl}/#organization`,
    name: siteConfig.name,
    alternateName: siteConfig.shortName,
    url: siteUrl,
    logo: `${siteUrl}/images/latc-logo.jpg`,
    image: `${siteUrl}/images/latc-logo.jpg`,
    email: siteConfig.email,
    founder: {
      '@type': 'Person',
      name: siteConfig.founder,
    },
    foundingDate: '2015',
    sport: ['Track and field', 'Running'],
    description: siteConfig.description,
    address: {
      '@type': 'PostalAddress',
      addressLocality: siteConfig.city,
      addressRegion: siteConfig.region,
      addressCountry: siteConfig.country,
    },
    areaServed: siteConfig.areaServed.map((name) => ({
      '@type': 'AdministrativeArea',
      name,
    })),
  }

  const websiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${siteUrl}/#website`,
    url: siteUrl,
    name: siteConfig.name,
    description: siteConfig.description,
    publisher: {
      '@id': `${siteUrl}/#organization`,
    },
    inLanguage: 'en-US',
  }

  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable} bg-background`} suppressHydrationWarning>
      <body className="font-sans antialiased min-h-screen" suppressHydrationWarning>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([organizationJsonLd, websiteJsonLd]),
          }}
        />
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
