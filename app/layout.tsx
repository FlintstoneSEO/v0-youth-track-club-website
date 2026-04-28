import type { Metadata, Viewport } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
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
  title: {
    default: 'Lansing Area Track Club | Youth Track & Running Club in Lansing, MI',
    template: '%s | Lansing Area Track Club'
  },
  description: 'Lansing Area Track Club helps youth athletes in Lansing, Michigan build speed, endurance, confidence, and discipline through track, running, practices, meets, and community events.',
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
  openGraph: {
    title: 'Lansing Area Track Club | Youth Track & Running Club in Lansing, MI',
    description: 'Lansing Area Track Club helps youth athletes in Lansing, Michigan build speed, endurance, confidence, and discipline through track, running, practices, meets, and community events.',
    locale: 'en_US',
    type: 'website',
    siteName: 'Lansing Area Track Club',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lansing Area Track Club',
    description: 'Youth track and running programs for kids through high school in Lansing, Michigan.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export const viewport: Viewport = {
  themeColor: '#1a1a1a',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable} bg-background`}>
      <body className="font-sans antialiased min-h-screen">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
