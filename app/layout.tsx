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
    default: 'Lansing Area Track Club | Youth Track & Field in Lansing, Michigan',
    template: '%s | Lansing Area Track Club'
  },
  description: 'Lansing Area Track Club offers youth track and field programs for kids through high school in Lansing, Michigan. Join our community of young athletes and discover the joy of running.',
  keywords: ['track and field', 'youth sports', 'Lansing', 'Michigan', 'running', 'track club', 'athletics', 'kids sports'],
  authors: [{ name: 'Ramon Brunson' }],
  openGraph: {
    title: 'Lansing Area Track Club',
    description: 'Youth track and field programs for kids through high school in Lansing, Michigan.',
    locale: 'en_US',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export const viewport: Viewport = {
  themeColor: '#1e3a5f',
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
