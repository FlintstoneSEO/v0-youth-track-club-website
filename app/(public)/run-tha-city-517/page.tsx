import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, Calendar, Clock, MapPin, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { createClient } from "@/lib/supabase/server"

export const metadata: Metadata = {
  title: "Run Tha City 517",
  description: "Join Run Tha City 517, Lansing's community running group. Open to all ages and skill levels.",
}

async function getUpcomingRuns() {
  const supabase = await createClient()
  const { data } = await supabase
    .from('run_tha_city_events')
    .select('*')
    .eq('is_published', true)
    .gte('event_date', new Date().toISOString().split('T')[0])
    .order('event_date', { ascending: true })
    .limit(6)
  
  return data || []
}

const features = [
  {
    icon: Users,
    title: "All Are Welcome",
    description: "Whether you're training for a marathon or taking your first steps as a runner, you belong here.",
  },
  {
    icon: MapPin,
    title: "Explore Lansing",
    description: "Discover new routes and hidden gems throughout the city while staying active.",
  },
  {
    icon: Calendar,
    title: "Regular Meetups",
    description: "Weekly group runs with varying distances and locations to keep things interesting.",
  },
]

const difficultyColors: Record<string, string> = {
  all_levels: "bg-primary/10 text-primary",
  beginner: "bg-green-100 text-green-700",
  intermediate: "bg-amber-100 text-amber-700",
  advanced: "bg-red-100 text-red-700",
}

export default async function RunThaCityPage() {
  const upcomingRuns = await getUpcomingRuns()

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary to-primary/80 py-20 lg:py-32">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        <div className="container relative mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5">
              <span className="text-sm font-medium text-accent">Community Running Group</span>
            </div>
            <h1 className="text-5xl font-bold tracking-tight text-primary-foreground sm:text-6xl lg:text-7xl">
              Run Tha City{" "}
              <span className="text-accent">517</span>
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-primary-foreground/80 text-pretty">
              A community running movement bringing Lansing together, one mile at a time. 
              Founded by Ramon Brunson, Run Tha City 517 welcomes runners of all ages 
              and abilities to explore our city while staying active.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 w-full sm:w-auto">
                <Link href="/contact">
                  Join the Movement
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-3">
            {features.map((feature) => (
              <Card key={feature.title} className="text-center border-0 shadow-lg">
                <CardHeader>
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-accent/10">
                    <feature.icon className="h-7 w-7 text-accent" />
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

      {/* Upcoming Runs Section */}
      <section className="bg-muted py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Upcoming Group Runs
            </h2>
            <p className="mt-4 text-lg text-muted-foreground text-pretty">
              Join us for our community runs. No registration required - just show up!
            </p>
          </div>
          {upcomingRuns.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No upcoming runs scheduled at this time. Check back soon!</p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {upcomingRuns.map((run) => (
                <Card key={run.id} className="overflow-hidden">
                  <div className="h-2 bg-accent" />
                  <CardHeader>
                    <div className="flex items-center gap-2 mb-2">
                      {run.distance && (
                        <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-accent/10 text-accent">
                          {run.distance}
                        </span>
                      )}
                      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${
                        difficultyColors[run.difficulty] || difficultyColors.all_levels
                      }`}>
                        {run.difficulty?.replace('_', ' ') || 'All Levels'}
                      </span>
                    </div>
                    <CardTitle className="text-xl">{run.title}</CardTitle>
                    {run.description && (
                      <CardDescription>{run.description}</CardDescription>
                    )}
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4 text-accent" />
                      <span>
                        {new Date(run.event_date).toLocaleDateString('en-US', {
                          weekday: 'short',
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </span>
                    </div>
                    {run.start_time && (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4 text-accent" />
                        <span>{run.start_time}</span>
                      </div>
                    )}
                    {(run.location || run.meeting_point) && (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4 text-accent" />
                        <span>{run.meeting_point || run.location}</span>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                How It Works
              </h2>
              <p className="mt-4 text-lg text-muted-foreground text-pretty">
                Joining Run Tha City 517 is easy - no membership required!
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-3">
              {[
                { step: "1", title: "Check the Schedule", description: "View our upcoming runs above or follow us on social media for updates." },
                { step: "2", title: "Show Up", description: "Arrive at the meeting point 10-15 minutes before start time." },
                { step: "3", title: "Run Together", description: "Enjoy the run, meet new people, and explore Lansing!" },
              ].map((item) => (
                <div key={item.step} className="text-center">
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-accent text-accent-foreground text-xl font-bold">
                    {item.step}
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Connection to LATC */}
      <section className="bg-primary py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl text-balance">
              Part of the LATC Family
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-primary-foreground/80 text-pretty">
              Run Tha City 517 is proudly connected to Lansing Area Track Club. 
              Both programs were founded by Ramon Brunson with a shared mission: 
              building a stronger, healthier Lansing community through running.
            </p>
            <div className="mt-10">
              <Button asChild size="lg" variant="outline" className="border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10">
                <Link href="/about">
                  Learn About LATC
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Social CTA */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
              Stay Connected
            </h2>
            <p className="mt-4 text-lg text-muted-foreground text-pretty">
              Follow us on social media for run announcements, route updates, 
              and community highlights. Use the hashtag #RunThaCity517 to share 
              your runs!
            </p>
            <div className="mt-10">
              <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
                <Link href="/contact">
                  Get Updates
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
