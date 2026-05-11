'use client'

import { useMemo, useState } from 'react'
import { Calendar, ExternalLink, Trophy, MapPin, Search } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface MeetPreviewItem {
  name: string
  date: string
  location: string
  level: 'Local' | 'Regional' | 'State'
}

interface TrackMeetsSectionProps {
  athleticNetUrl?: string
}

const previewMeets: MeetPreviewItem[] = [
  { name: 'MSU Spartan Invitational', date: 'April 11, 2026', location: 'East Lansing, MI', level: 'Regional' },
  { name: 'Lansing Youth Open #1', date: 'April 25, 2026', location: 'Lansing, MI', level: 'Local' },
  { name: 'Capital City Track Challenge', date: 'May 2, 2026', location: 'Lansing, MI', level: 'Regional' },
  { name: 'Mid-Michigan Development Meet', date: 'May 16, 2026', location: 'Okemos, MI', level: 'Local' },
  { name: 'MITCA Youth Championships', date: 'June 6, 2026', location: 'Grand Rapids, MI', level: 'State' },
]

export function TrackMeetsSection({
  athleticNetUrl = 'https://www.athletic.net/team/91933/track-and-field-outdoor/2026',
}: TrackMeetsSectionProps) {
  const [search, setSearch] = useState('')
  const [level, setLevel] = useState<'All' | MeetPreviewItem['level']>('All')

  const filteredMeets = useMemo(() => {
    return previewMeets.filter((meet) => {
      const matchesSearch =
        meet.name.toLowerCase().includes(search.toLowerCase()) ||
        meet.location.toLowerCase().includes(search.toLowerCase()) ||
        meet.date.toLowerCase().includes(search.toLowerCase())
      const matchesLevel = level === 'All' || meet.level === level
      return matchesSearch && matchesLevel
    })
  }, [search, level])

  const teamId = athleticNetUrl.match(/team\/(\d+)/)?.[1] || '91933'

  return (
    <section className="py-16 lg:py-24 bg-muted">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-medium text-sm mb-6">
            <Trophy className="w-4 h-4" />
            Official Meet Schedule
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">2026 Track Meet Schedule</h2>
          <p className="mt-4 text-lg text-muted-foreground text-pretty">
            Meet information is powered by Athletic.net. Use the quick search below to preview likely events,
            then open the official schedule for the latest entries, times, and results.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3 max-w-5xl mx-auto mb-8">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-lg">Quick Meet Finder</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-3 mb-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by meet, city, or date..." className="pl-9" />
                </div>
                <div className="flex gap-2">
                  {(['All', 'Local', 'Regional', 'State'] as const).map((option) => (
                    <Button key={option} variant={level === option ? 'default' : 'outline'} size="sm" onClick={() => setLevel(option)}>
                      {option}
                    </Button>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                {filteredMeets.map((meet) => (
                  <div key={`${meet.name}-${meet.date}`} className="rounded-lg border border-border p-3 bg-background">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                      <p className="font-medium text-foreground">{meet.name}</p>
                      <span className="text-xs rounded-full bg-primary/10 text-primary px-2 py-1 w-fit">{meet.level}</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{meet.date}</p>
                    <p className="text-sm text-muted-foreground">{meet.location}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Official Source</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                For final meet entries, start lists, updates, and result timing, use our official Athletic.net team page.
              </p>
              <Button asChild className="w-full motion-button">
                <a href={athleticNetUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-4 h-4 mr-2" /> Open Official Schedule
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>

        <Card className="max-w-5xl mx-auto overflow-hidden">
          <CardContent className="p-0">
            <div className="relative w-full" style={{ minHeight: '640px' }}>
              <iframe
                src={`https://www.athletic.net/team/${teamId}/track-and-field-outdoor/2026`}
                width="100%"
                height="640"
                style={{ border: 0 }}
                title="LATC Track Meet Schedule"
                loading="lazy"
                className="w-full"
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
