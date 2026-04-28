import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, Calendar, Clock, ExternalLink, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Meets & Events",
  description: "View upcoming track meets, competitions, and community events hosted by Lansing Area Track Club.",
}

// These will be fetched from Supabase when connected
const upcomingEvents = [
  {
    id: "1",
    title: "Spring Track Season Kickoff",
    date: "March 15, 2026",
    time: "9:00 AM",
    location: "Lansing Track Complex",
    type: "Practice",
    description: "The official start of our spring track season! All registered athletes should attend for team introductions and the first practice.",
    registration_required: false,
  },
  {
    id: "2",
    title: "Mid-Michigan Youth Track Meet",
    date: "April 5, 2026",
    time: "8:00 AM",
    location: "East Lansing High School",
    type: "Competition",
    description: "Our first competition of the season. Open to all LATC athletes. Events include sprints, distance, relays, and field events.",
    registration_required: true,
    registration_link: "#",
  },
  {
    id: "3",
    title: "Run Tha City 517 - Downtown Loop",
    date: "April 12, 2026",
    time: "9:00 AM",
    location: "Downtown Lansing (Capitol Building)",
    type: "Community",
    description: "Join us for a community run through downtown Lansing! 3-mile route suitable for all fitness levels. Kids welcome with parent supervision.",
    registration_required: false,
  },
  {
    id: "4",
    title: "USATF Region 5 Junior Olympics Qualifier",
    date: "May 10, 2026",
    time: "7:30 AM",
    location: "Jenison High School, Jenison MI",
    type: "Competition",
    description: "Regional qualifier for the USATF Junior Olympics. Athletes must be registered USATF members to compete.",
    registration_required: true,
    registration_link: "#",
  },
  {
    id: "5",
    title: "LATC End of Season Celebration",
    date: "June 20, 2026",
    time: "6:00 PM",
    location: "Lansing Community Center",
    type: "Social",
    description: "Celebrate the end of a great season! Awards ceremony, food, and fun for the whole family.",
    registration_required: false,
  },
]

const eventTypeColors: Record<string, { bg: string; text: string; border: string }> = {
  Practice: { bg: "bg-primary/10", text: "text-primary", border: "bg-primary" },
  Competition: { bg: "bg-accent/10", text: "text-accent", border: "bg-accent" },
  Community: { bg: "bg-success/10", text: "text-success", border: "bg-success" },
  Social: { bg: "bg-chart-4/10", text: "text-chart-4", border: "bg-chart-4" },
}

export default function EventsPage() {
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
                <span className="text-sm text-muted-foreground">{type}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Events List */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl space-y-6">
            {upcomingEvents.map((event) => {
              const colors = eventTypeColors[event.type] || eventTypeColors.Practice
              return (
                <Card key={event.id} className="overflow-hidden">
                  <div className={`h-1.5 ${colors.border}`} />
                  <div className="p-6">
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${colors.bg} ${colors.text}`}>
                            {event.type}
                          </span>
                          {event.registration_required && (
                            <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-destructive/10 text-destructive">
                              Registration Required
                            </span>
                          )}
                        </div>
                        <h3 className="text-xl font-semibold text-foreground">{event.title}</h3>
                        <p className="mt-2 text-muted-foreground leading-relaxed">{event.description}</p>
                        <div className="mt-4 flex flex-wrap gap-4">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Calendar className="h-4 w-4 text-primary" />
                            <span>{event.date}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Clock className="h-4 w-4 text-primary" />
                            <span>{event.time}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <MapPin className="h-4 w-4 text-primary" />
                            <span>{event.location}</span>
                          </div>
                        </div>
                      </div>
                      {event.registration_required && event.registration_link && (
                        <div className="shrink-0">
                          <Button asChild className="bg-accent text-accent-foreground hover:bg-accent/90">
                            <a href={event.registration_link} target="_blank" rel="noopener noreferrer">
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
            })}
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
