import Link from "next/link"
import { ArrowRight, Calendar, MapPin, Trophy, Users, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { createClient } from "@/lib/supabase/server"

const features = [
  {
    icon: Users,
    title: "All Ages Welcome",
    description: "Programs for youth through high school athletes of all skill levels.",
  },
  {
    icon: Trophy,
    title: "Competitive Excellence",
    description: "Prepare for local meets, regional competitions, and beyond.",
  },
  {
    icon: Zap,
    title: "Expert Coaching",
    description: "Learn from experienced coaches dedicated to your development.",
  },
]

async function getUpcomingEvents() {
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

async function getLatestAnnouncement() {
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
      <section className="relative overflow-hidden bg-primary py-20 lg:py-32">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        <div className="container relative mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center rounded-full border border-primary-foreground/20 bg-primary-foreground/10 px-4 py-1.5">
              <span className="text-sm font-medium text-primary-foreground">
                Now accepting registrations for Spring 2026
              </span>
            </div>
            <h1 className="text-balance text-4xl font-bold tracking-tight text-primary-foreground sm:text-5xl lg:text-6xl">
              Build Speed. Build Strength.{" "}
              <span className="text-accent">Build Character.</span>
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-primary-foreground/80 text-pretty">
              Lansing Area Track Club is the premier youth track and field program in 
              Mid-Michigan. We develop young athletes from beginner to competitive level 
              in a supportive, community-focused environment.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 w-full sm:w-auto">
                <Link href="/contact">
                  Register Your Athlete
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10 w-full sm:w-auto">
                <Link href="/about">Learn More</Link>
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

      {/* Features Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
              Why Choose Lansing Area Track Club?
            </h2>
            <p className="mt-4 text-lg text-muted-foreground text-pretty">
              We&apos;re more than just a track club. We&apos;re a community dedicated to 
              developing young athletes on and off the track.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {features.map((feature) => (
              <Card key={feature.title} className="border-0 shadow-lg">
                <CardHeader>
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <feature.icon className="h-6 w-6 text-primary" />
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
      <section className="bg-muted py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-12">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Upcoming Events
              </h2>
              <p className="mt-2 text-muted-foreground">
                Stay updated with our latest practices and competitions.
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
            <div className="text-center py-12">
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

      {/* Run Tha City 517 Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-primary to-primary/80">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <div className="grid gap-8 lg:grid-cols-2 items-center">
              <div>
                <div className="mb-4 inline-flex items-center rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5">
                  <span className="text-sm font-medium text-accent">Community Running</span>
                </div>
                <h2 className="text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl text-balance">
                  Run Tha City 517
                </h2>
                <p className="mt-4 text-lg leading-relaxed text-primary-foreground/80 text-pretty">
                  Join our community running group and explore Lansing one mile at a time. 
                  Open to all ages and skill levels. Whether you&apos;re training for your 
                  first 5K or just want to stay active, you&apos;re welcome here.
                </p>
                <div className="mt-8">
                  <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
                    <Link href="/run-tha-city-517">
                      Join the Movement
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
              <div className="relative">
                <div className="aspect-square rounded-2xl bg-primary-foreground/10 flex items-center justify-center">
                  <div className="text-center p-8">
                    <div className="text-6xl font-bold text-accent mb-2">517</div>
                    <div className="text-xl font-semibold text-primary-foreground">Run Tha City</div>
                    <div className="text-primary-foreground/60 mt-2">Lansing, MI</div>
                  </div>
                </div>
              </div>
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
              Join hundreds of young athletes who have discovered their passion for 
              track and field at Lansing Area Track Club.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 w-full sm:w-auto">
                <Link href="/contact">
                  Register Today
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
