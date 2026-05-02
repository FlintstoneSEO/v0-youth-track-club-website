import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Calendar, MapPin, Users, Heart, Target } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { createClient } from "@/lib/supabase/server"
import type { SupabaseRow } from "@/lib/supabase/rows"
import { siteConfig } from "@/lib/site"

const features = [
  {
    icon: Users,
    title: "Youth Through High School",
    description: "Programs for athletes from elementary age through high school, including off-season speed and endurance training.",
  },
  {
    icon: Target,
    title: "Proper Technique",
    description: "Learn correct running form, track events, discipline, and athlete development from experienced coaches.",
  },
  {
    icon: Heart,
    title: "Community Centered",
    description: "More than a track club—we build confidence, character, and lasting connections in the Lansing community.",
  },
]

async function getUpcomingEvents(): Promise<SupabaseRow[]> {
  const supabase = await createClient()
  const { data } = await supabase
    .from('events')
    .select('*')
    .eq('is_published', true)
    .gte('event_date', new Date().toISOString().split('T')[0])
    .order('event_date', { ascending: true })
    .limit(3)
  
  return data || []
}

async function getLatestAnnouncement(): Promise<SupabaseRow | null> {
  const supabase = await createClient()
  const { data } = await supabase
    .from('announcements')
    .select('*')
    .eq('is_published', true)
    .eq('priority', 'urgent')
    .order('published_at', { ascending: false })
    .limit(1)
    .single()
  
  return data
}

export default async function HomePage() {
  const [upcomingEvents, latestAnnouncement] = await Promise.all([
    getUpcomingEvents(),
    getLatestAnnouncement(),
  ])

  return (
    <>
      {/* Urgent Announcement Banner */}
      {latestAnnouncement && (
        <div className="bg-accent text-accent-foreground py-3 px-4">
          <div className="container mx-auto flex items-center justify-center gap-2 text-center">
            <span className="font-medium">{latestAnnouncement.title}</span>
            <Link href="/announcements" className="underline underline-offset-2 hover:no-underline">
              Learn more
            </Link>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-neutral-950 py-20 lg:py-32">
        <Image
          src="/images/latc-track-hero.png"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
          priority
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-neutral-950/70" />
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-950/30 via-neutral-950/35 to-neutral-950/80" />
        <div className="container relative mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            {/* LATC Logo */}
            <div className="mb-6 flex justify-center">
              <Image
                src="/images/latc-logo.jpg"
                alt="Lansing Area Track Club - Two runners in lime green and royal blue"
                width={180}
                height={180}
                className="h-auto w-40 sm:w-44 lg:w-48 rounded-xl bg-white p-2 shadow-lg"
                priority
              />
            </div>
            <div className="mb-4 inline-flex items-center rounded-full border border-primary-foreground/20 bg-primary-foreground/10 px-4 py-1.5">
              <span className="text-sm font-medium text-primary-foreground">
                Serving Lansing &amp; Mid-Michigan Since 2015
              </span>
            </div>
            <h1 className="text-balance text-4xl font-bold tracking-tight text-primary-foreground sm:text-5xl lg:text-6xl">
              Lansing Area Track Club
            </h1>
            <p className="mt-4 text-xl font-medium text-accent">
              Youth Track &amp; Running in Lansing, Michigan
            </p>
            <p className="mt-6 text-lg leading-relaxed text-primary-foreground/80 text-pretty">
              Helping young athletes grow on and off the track. Led by Coach Ramon Brunson, 
              we provide a positive environment where kids can build speed, endurance, confidence, 
              discipline, and a love for running.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 w-full sm:w-auto">
                <Link href="/contact">
                  Join the Track Club
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-primary-foreground/20 bg-primary-foreground text-primary hover:bg-primary-foreground/90 hover:text-primary w-full sm:w-auto">
                <Link href="/practices">View Practices &amp; Meets</Link>
              </Button>
            </div>
          </div>
        </div>
        {/* Decorative bottom wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
            <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" className="fill-background"/>
          </svg>
        </div>
      </section>

      {/* About Preview */}
      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-lg leading-relaxed text-muted-foreground text-pretty">
              Founded from a simple idea of getting kids together to train, Lansing Area Track Club 
              has grown into a community-centered youth track program serving families across Lansing 
              and Mid-Michigan. What started with a small group of children has become a place where 
              young athletes learn proper technique, build character, and discover what they are 
              capable of through hard work and consistency.
            </p>
            <Button asChild variant="link" className="mt-4">
              <Link href="/about">
                Learn more about our story
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 lg:py-24 bg-muted">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
              Why Lansing Area Track Club?
            </h2>
            <p className="mt-4 text-lg text-muted-foreground text-pretty">
              We&apos;re more than just a track club. We&apos;re a community dedicated to 
              developing young athletes in Lansing, Michigan and the surrounding Mid-Michigan area.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {features.map((feature) => (
              <Card key={feature.title} className="border-0 shadow-lg bg-card">
                <CardHeader>
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10">
                    <feature.icon className="h-6 w-6 text-accent" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Events Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-12">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Upcoming Events
              </h2>
              <p className="mt-2 text-muted-foreground">
                Stay updated with our latest practices, meets, and community events.
              </p>
            </div>
            <Button asChild variant="outline">
              <Link href="/events">
                View All Events
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          {upcomingEvents.length === 0 ? (
            <div className="text-center py-12 bg-muted rounded-xl">
              <p className="text-muted-foreground">No upcoming events at this time. Check back soon!</p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {upcomingEvents.map((event) => (
                <Card key={event.id} className="overflow-hidden">
                  <div className={`h-2 ${
                    event.event_type === "practice" 
                      ? "bg-primary" 
                      : event.event_type === "meet" 
                      ? "bg-accent" 
                      : "bg-success"
                  }`} />
                  <CardHeader>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${
                        event.event_type === "practice" 
                          ? "bg-primary/10 text-primary" 
                          : event.event_type === "meet" 
                          ? "bg-accent/10 text-accent" 
                          : "bg-success/10 text-success"
                      }`}>
                        {event.event_type}
                      </span>
                    </div>
                    <CardTitle className="text-lg">{event.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>
                        {new Date(event.event_date).toLocaleDateString('en-US', {
                          weekday: 'short',
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </span>
                    </div>
                    {event.location && (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        <span>{event.location}</span>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Run Tha City 517 Section - Red/Black/White theme */}
      <section className="py-16 lg:py-24 bg-neutral-900">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <div className="grid gap-8 lg:grid-cols-2 items-center">
              <div>
                <div className="mb-4 inline-flex items-center rounded-full border border-red-500/30 bg-red-600/10 px-4 py-1.5">
                  <span className="text-sm font-medium text-red-400">Community Running Group</span>
                </div>
                <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl text-balance">
                  Run Tha City 517
                </h2>
                <p className="mt-4 text-lg leading-relaxed text-white/80 text-pretty">
                  A Lansing running group created to bring people together through movement, 
                  representation, and community. Rooted in the goal of helping more people get active, 
                  Run Tha City 517 welcomes runners of all levels and helps connect Lansing residents 
                  through group runs, local races, and shared accountability.
                </p>
                <p className="mt-4 text-sm text-white/60">
                  Started in June 2022, growing from a local conversation about Black runners in Lansing.
                </p>
                <div className="mt-8">
                  <Button asChild size="lg" className="bg-red-600 text-white hover:bg-red-700">
                    <Link href="/run-tha-city-517">
                      Join the Movement
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
              <div className="relative flex items-center justify-center">
                <Image
                  src="/images/run-tha-city-517-logo.png"
                  alt="Run Tha City 517 - Lansing community running group"
                  width={400}
                  height={250}
                  className="w-full max-w-sm h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Juneteenth 5K Section */}
      <section className="py-16 lg:py-24 bg-success/10">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-4 inline-flex items-center rounded-full bg-success/20 px-4 py-1.5">
              <span className="text-sm font-medium text-success">Community Race</span>
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
              Lansing Juneteenth 5K Run/Walk/Roll
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground text-pretty max-w-2xl mx-auto">
              Join the community for a meaningful 3.1-mile event at Benjamin Davis Park. 
              Hosted in partnership with Lansing Area Track Club and Run Tha City 517, the event 
              welcomes runners, walkers, families, teams, strollers, and wheelchair participants.
            </p>
            <p className="mt-4 text-sm text-muted-foreground">
              Proceeds and donations support our vision for a year-round indoor practice facility for youth athletes.
            </p>
            <div className="mt-8">
              <Button asChild size="lg" className="bg-success text-success-foreground hover:bg-success/90">
                <Link href="/juneteenth-5k">
                  Learn More About the 5K
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Service Area Section */}
      <section className="py-16 lg:py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-4 inline-flex items-center rounded-full bg-primary/10 px-4 py-1.5">
              <MapPin className="mr-2 h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">Lansing Youth Track Club</span>
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
              Serving Families Across Lansing and Mid-Michigan
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground text-pretty">
              Lansing Area Track Club welcomes youth athletes from Lansing, East Lansing, Okemos,
              Holt, Waverly, Delta Township, Haslett, and nearby Mid-Michigan communities.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-2">
              {siteConfig.areaServed.map((area) => (
                <span
                  key={area}
                  className="rounded-full border border-border bg-card px-3 py-1 text-sm font-medium text-foreground"
                >
                  {area}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
              Ready to Start Your Track Journey?
            </h2>
            <p className="mt-4 text-lg text-muted-foreground text-pretty">
              Join the growing community of young athletes discovering their passion for 
              track and field at Lansing Area Track Club.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 w-full sm:w-auto">
                <Link href="/contact">
                  Register Your Athlete
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
                <Link href="/faq">Have Questions?</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
