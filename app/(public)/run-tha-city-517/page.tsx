import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Calendar, Clock, MapPin, Users, Heart, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { createClient } from "@/lib/supabase/server"
import type { SupabaseRow } from "@/lib/supabase/rows"

export const metadata: Metadata = {
  title: "Run Tha City 517 | Lansing Community Running Group",
  description: "Run Tha City 517 is a Lansing running group rooted in community, representation, fitness, and welcoming runners of all levels to get active together.",
  keywords: [
    "Run Tha City 517",
    "Lansing running group",
    "Black running group Lansing",
    "community running group Lansing MI",
    "Lansing run club",
    "group runs Lansing Michigan"
  ],
}

async function getUpcomingRuns(): Promise<SupabaseRow[]> {
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
    title: "Representation Matters",
    description: "Started from a conversation about Black runners in Lansing, we believe representation and visibility inspire participation.",
  },
  {
    icon: Heart,
    title: "Community First",
    description: "More than running—we're building connections, accountability, and a supportive community that gets people active together.",
  },
  {
    icon: Sparkles,
    title: "All Levels Welcome",
    description: "Whether you're training for your first 5K or you're a seasoned runner, you belong here. We meet you where you are.",
  },
]

const difficultyColors: Record<string, string> = {
  all_levels: "bg-neutral-900/10 text-neutral-900",
  beginner: "bg-green-600/10 text-green-700",
  intermediate: "bg-amber-500/10 text-amber-700",
  advanced: "bg-red-600/10 text-red-700",
}

export default async function RunThaCityPage() {
  const upcomingRuns = await getUpcomingRuns()

  return (
    <>
      {/* Hero Section - RTC Red/Black/White theme */}
      <section className="relative overflow-hidden bg-neutral-900 py-20 lg:py-32">
        {/* Track lane lines decoration */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-[10%] w-px h-full bg-white" />
          <div className="absolute top-0 left-[30%] w-px h-full bg-white" />
          <div className="absolute top-0 left-[50%] w-px h-full bg-white" />
          <div className="absolute top-0 left-[70%] w-px h-full bg-white" />
          <div className="absolute top-0 left-[90%] w-px h-full bg-white" />
        </div>
        <div className="container relative mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            {/* RTC Logo */}
            <div className="mb-8 flex justify-center">
              <Image
                src="/images/run-tha-city-517-logo.png"
                alt="Run Tha City 517"
                width={400}
                height={200}
                className="h-auto w-full max-w-sm"
                priority
              />
            </div>
            <p className="text-lg leading-relaxed text-white/80 text-pretty">
              A Lansing running group created to bring people together through movement, 
              representation, and community. Rooted in the goal of helping more people get active, 
              we welcome runners of all levels.
            </p>
            <p className="mt-4 text-sm text-white/60">
              Founded June 2022 by Ramon Brunson
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button asChild size="lg" className="bg-red-600 text-white hover:bg-red-700 w-full sm:w-auto">
                <Link href="/contact">
                  Join the Movement
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Origin Story */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl text-balance">
              Our Story
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-neutral-600 text-pretty">
              Run Tha City 517 started in June 2022 and grew from a local conversation about 
              Black runners in Lansing into a regular running community. What began as a simple 
              idea—get people running together—has become a movement that connects Lansing residents 
              through group runs, local races, and shared accountability.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-neutral-600 text-pretty">
              We believe running is for everyone. We believe representation matters. And we believe 
              that when people come together to move, good things happen for the whole community.
            </p>
          </div>
        </div>
      </section>

      {/* Features Section - RTC theme */}
      <section className="bg-neutral-100 py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
              What We&apos;re About
            </h2>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {features.map((feature) => (
              <Card key={feature.title} className="text-center border-0 shadow-lg bg-white">
                <CardHeader>
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-600/10">
                    <feature.icon className="h-7 w-7 text-red-600" />
                  </div>
                  <CardTitle className="text-xl text-neutral-900">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed text-neutral-600">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Runs Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
              Upcoming Group Runs
            </h2>
            <p className="mt-4 text-lg text-neutral-600 text-pretty">
              Join us for community runs. No membership required—just show up and run!
            </p>
          </div>
          {upcomingRuns.length === 0 ? (
            <div className="text-center py-12 bg-neutral-100 rounded-xl">
              <p className="text-neutral-600">No upcoming runs scheduled at this time.</p>
              <p className="text-sm text-neutral-500 mt-2">Check back soon or follow us for announcements!</p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {upcomingRuns.map((run) => (
                <Card key={run.id} className="overflow-hidden border-0 shadow-lg bg-white">
                  <div className="h-2 bg-red-600" />
                  <CardHeader>
                    <div className="flex items-center gap-2 mb-2">
                      {run.distance && (
                        <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-red-600/10 text-red-600">
                          {run.distance}
                        </span>
                      )}
                      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${
                        difficultyColors[run.difficulty] || difficultyColors.all_levels
                      }`}>
                        {run.difficulty?.replace('_', ' ') || 'All Levels'}
                      </span>
                    </div>
                    <CardTitle className="text-xl text-neutral-900">{run.title}</CardTitle>
                    {run.description && (
                      <CardDescription className="text-neutral-600">{run.description}</CardDescription>
                    )}
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-neutral-600">
                      <Calendar className="h-4 w-4 text-red-600" />
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
                      <div className="flex items-center gap-2 text-sm text-neutral-600">
                        <Clock className="h-4 w-4 text-red-600" />
                        <span>{run.start_time}</span>
                      </div>
                    )}
                    {(run.location || run.meeting_point) && (
                      <div className="flex items-center gap-2 text-sm text-neutral-600">
                        <MapPin className="h-4 w-4 text-red-600" />
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

      {/* How It Works - RTC theme */}
      <section className="bg-neutral-100 py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
                How to Join a Run
              </h2>
              <p className="mt-4 text-lg text-neutral-600 text-pretty">
                No membership, no fees, no barriers—just show up and run with us.
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-3">
              {[
                { step: "1", title: "Check the Schedule", description: "View upcoming runs above or follow us on social media for the latest." },
                { step: "2", title: "Show Up", description: "Arrive at the meeting point 10-15 minutes before start time. Look for the group!" },
                { step: "3", title: "Run Together", description: "Enjoy the run at your own pace, meet new people, and explore Lansing." },
              ].map((item) => (
                <div key={item.step} className="text-center">
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-600 text-white text-xl font-bold">
                    {item.step}
                  </div>
                  <h3 className="font-semibold text-neutral-900 mb-2">{item.title}</h3>
                  <p className="text-sm text-neutral-600">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Connection to LATC & Juneteenth */}
      <section className="bg-neutral-900 py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <div className="grid gap-8 lg:grid-cols-2">
              <Card className="bg-white/10 border-white/20">
                <CardHeader>
                  <CardTitle className="text-xl text-white">Connected to LATC</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-white/70 leading-relaxed">
                    Run Tha City 517 is connected to Lansing Area Track Club, both founded by 
                    Ramon Brunson with a shared mission: building a stronger, healthier Lansing 
                    community through running and athletics.
                  </p>
                  <Button asChild variant="link" className="px-0 mt-4 text-red-400 hover:text-red-300">
                    <Link href="/about">
                      Learn about LATC
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
              <Card className="bg-green-600/20 border-green-500/30">
                <CardHeader>
                  <CardTitle className="text-xl text-white">Lansing Juneteenth 5K</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-white/70 leading-relaxed">
                    Run Tha City 517 helps host the annual Lansing Juneteenth 5K Run/Walk/Roll at 
                    Benjamin Davis Park—a community celebration supporting youth athletics.
                  </p>
                  <Button asChild variant="link" className="px-0 mt-4 text-green-400 hover:text-green-300">
                    <Link href="/juneteenth-5k">
                      Learn about the 5K
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Social CTA */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl text-balance">
              Stay Connected
            </h2>
            <p className="mt-4 text-lg text-neutral-600 text-pretty">
              Follow us on social media for run announcements, route updates, 
              and community highlights. Tag us and use #RunThaCity517 to share your runs!
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button asChild size="lg" className="bg-red-600 text-white hover:bg-red-700 w-full sm:w-auto">
                <Link href="/contact">
                  Get Connected
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="w-full sm:w-auto border-neutral-300 text-neutral-900 hover:bg-neutral-100">
                <Link href="/announcements">View Announcements</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
