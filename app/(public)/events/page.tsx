import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, Calendar, Clock, ExternalLink, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { createClient } from "@/lib/supabase/server"
import type { SupabaseRow } from "@/lib/supabase/rows"

export const metadata: Metadata = {
  title: "Meets, Events & Local Races | Lansing Area Track Club",
  description: "Find upcoming youth track meets, Lansing running events, local races, and community race opportunities connected to Lansing Area Track Club.",
  keywords: [
    "youth track meets Lansing MI",
    "Lansing track events",
    "local races Lansing Michigan",
    "Lansing Juneteenth 5K",
    "youth running events Mid-Michigan"
  ],
}

async function getEvents(): Promise<SupabaseRow[]> {
  const supabase = await createClient()
  const { data } = await supabase
    .from('events')
    .select('*')
    .eq('is_published', true)
    .gte('event_date', new Date().toISOString().split('T')[0])
    .order('event_date', { ascending: true })
  
  return data || []
}

const eventTypeColors: Record<string, { bg: string; text: string; border: string }> = {
  meet: { bg: "bg-accent/10", text: "text-accent", border: "bg-accent" },
  practice: { bg: "bg-primary/10", text: "text-primary", border: "bg-primary" },
  community: { bg: "bg-success/10", text: "text-success", border: "bg-success" },
  fundraiser: { bg: "bg-chart-4/10", text: "text-chart-4", border: "bg-chart-4" },
  other: { bg: "bg-muted", text: "text-muted-foreground", border: "bg-muted-foreground" },
}

export default async function EventsPage() {
  const events = await getEvents()

  return (
    <>
      {/* Hero Section */}
      <section className="bg-primary py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-primary-foreground sm:text-5xl text-balance">
              Meets & Events
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-primary-foreground/80 text-pretty">
              Stay up to date with track meets, competitions, and community events 
              from Lansing Area Track Club.
            </p>
          </div>
        </div>
      </section>

      {/* Event Type Legend */}
      <section className="border-b border-border py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-center gap-6">
            <span className="text-sm font-medium text-muted-foreground">Event Types:</span>
            {Object.entries(eventTypeColors).map(([type, colors]) => (
              <div key={type} className="flex items-center gap-2">
                <div className={`h-3 w-3 rounded-full ${colors.border}`} />
                <span className="text-sm text-muted-foreground capitalize">{type}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Events List */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl space-y-6">
            {events.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-lg text-muted-foreground">No upcoming events at this time.</p>
                <p className="text-sm text-muted-foreground mt-2">Check back soon for new events!</p>
              </div>
            ) : (
              events.map((event) => {
                const colors = eventTypeColors[event.event_type] || eventTypeColors.other
                return (
                  <Card key={event.id} className="overflow-hidden">
                    <div className={`h-1.5 ${colors.border}`} />
                    <div className="p-6">
                      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${colors.bg} ${colors.text}`}>
                              {event.event_type}
                            </span>
                            {event.is_featured && (
                              <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-accent/10 text-accent">
                                Featured
                              </span>
                            )}
                          </div>
                          <h3 className="text-xl font-semibold text-foreground">{event.title}</h3>
                          {event.description && (
                            <p className="mt-2 text-muted-foreground leading-relaxed">{event.description}</p>
                          )}
                          <div className="mt-4 flex flex-wrap gap-4">
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Calendar className="h-4 w-4 text-primary" />
                              <span>
                                {new Date(event.event_date).toLocaleDateString('en-US', {
                                  weekday: 'long',
                                  month: 'long',
                                  day: 'numeric',
                                  year: 'numeric'
                                })}
                              </span>
                            </div>
                            {event.start_time && (
                              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Clock className="h-4 w-4 text-primary" />
                                <span>{event.start_time}</span>
                              </div>
                            )}
                            {event.location && (
                              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <MapPin className="h-4 w-4 text-primary" />
                                <span>{event.location}</span>
                              </div>
                            )}
                          </div>
                        </div>
                        {event.registration_url && (
                          <div className="shrink-0">
                            <Button asChild className="bg-accent text-accent-foreground hover:bg-accent/90">
                              <a href={event.registration_url} target="_blank" rel="noopener noreferrer">
                                Register
                                <ExternalLink className="ml-2 h-4 w-4" />
                              </a>
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </Card>
                )
              })
            )}
          </div>
        </div>
      </section>

      {/* Past Events Notice */}
      <section className="bg-muted py-12">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-bold text-foreground">Looking for Past Results?</h2>
            <p className="mt-3 text-muted-foreground text-pretty">
              Check our announcements page for meet results and athlete highlights from 
              previous competitions.
            </p>
            <Button asChild variant="outline" className="mt-6">
              <Link href="/announcements">
                View Announcements
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
              Want to Compete with LATC?
            </h2>
            <p className="mt-4 text-lg text-muted-foreground text-pretty">
              Register your athlete today to participate in our meets and events.
            </p>
            <div className="mt-10">
              <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                <Link href="/contact">
                  Join the Team
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
