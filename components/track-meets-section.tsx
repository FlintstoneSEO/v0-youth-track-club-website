import { Calendar, ExternalLink, Trophy, MapPin, Clock } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

interface TrackMeetsSectionProps {
  athleticNetUrl?: string
}

export function TrackMeetsSection({ 
  athleticNetUrl = 'https://www.athletic.net/team/91933/track-and-field-outdoor/2026' 
}: TrackMeetsSectionProps) {
  // Extract team ID from URL for embed
  const teamId = athleticNetUrl.match(/team\/(\d+)/)?.[1] || '91933'
  
  return (
    <section className="py-16 lg:py-24 bg-muted">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-medium text-sm mb-6">
            <Trophy className="w-4 h-4" />
            Official Meet Schedule
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            2026 Track Meet Schedule
          </h2>
          <p className="mt-4 text-lg text-muted-foreground text-pretty">
            View our complete track meet schedule for the 2026 season. Results, 
            entry lists, and meet details are all available through Athletic.net.
          </p>
        </div>

        {/* Athletic.net Embed Card */}
        <Card className="max-w-5xl mx-auto overflow-hidden">
          <CardHeader className="bg-primary/5 border-b border-border">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <CardTitle className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <span className="text-lg">Lansing Area Track Club</span>
                  <p className="text-sm font-normal text-muted-foreground">
                    2026 Outdoor Track & Field
                  </p>
                </div>
              </CardTitle>
              <Button asChild className="motion-button">
                <a 
                  href={athleticNetUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  View on Athletic.net
                </a>
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            {/* Athletic.net iframe embed */}
            <div className="relative w-full" style={{ minHeight: '600px' }}>
              <iframe
                src={`https://www.athletic.net/team/${teamId}/track-and-field-outdoor/2026/schedule`}
                width="100%"
                height="600"
                style={{ border: 0 }}
                title="LATC Track Meet Schedule"
                loading="lazy"
                className="w-full"
              />
            </div>
          </CardContent>
        </Card>

        {/* Quick Info Cards */}
        <div className="grid gap-6 md:grid-cols-3 max-w-4xl mx-auto mt-12">
          <Card className="text-center motion-card">
            <CardContent className="pt-6">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Season Schedule</h3>
              <p className="text-sm text-muted-foreground">
                View all upcoming meets with dates, times, and registration deadlines
              </p>
            </CardContent>
          </Card>
          <Card className="text-center motion-card">
            <CardContent className="pt-6">
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mx-auto mb-4">
                <Trophy className="w-6 h-6 text-accent" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Live Results</h3>
              <p className="text-sm text-muted-foreground">
                Track athlete performances and results in real-time during meets
              </p>
            </CardContent>
          </Card>
          <Card className="text-center motion-card">
            <CardContent className="pt-6">
              <div className="w-12 h-12 rounded-xl bg-success/10 flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-6 h-6 text-success" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Meet Locations</h3>
              <p className="text-sm text-muted-foreground">
                Find directions and venue information for each competition
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Note about Athletic.net */}
        <div className="max-w-2xl mx-auto mt-12 text-center">
          <p className="text-sm text-muted-foreground">
            Schedule data is provided by{' '}
            <a 
              href="https://www.athletic.net" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              Athletic.net
            </a>
            . For the most up-to-date information, registration details, and 
            live results, please visit the official schedule page.
          </p>
        </div>
      </div>
    </section>
  )
}
