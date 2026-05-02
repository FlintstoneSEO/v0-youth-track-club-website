import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact & Sign Up | Lansing Youth Track Registration',
  description:
    'Register your athlete for Lansing Area Track Club or contact the club about youth track, practices, meets, and running programs in Lansing, Michigan.',
  keywords: [
    'Lansing youth track registration',
    'sign up for track Lansing MI',
    'Lansing Area Track Club contact',
    'youth running club signup Lansing',
    'kids track and field Lansing Michigan',
  ],
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
