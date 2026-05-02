import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, Calendar, MapPin, Users, Heart, Trophy } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Lansing Juneteenth 5K Run/Walk/Roll | Lansing Area Track Club",
  description: "Join Lansing Area Track Club and Run Tha City 517 for the Lansing Juneteenth 5K Run/Walk/Roll, a community race at Benjamin Davis Park supporting youth track and year-round training.",
  keywords: [
    "Lansing Juneteenth 5K",
    "Juneteenth 5K Lansing MI",
    "Lansing Juneteenth Run Walk Roll",
    "Benjamin Davis Park 5K Lansing",
    "Lansing community race",
    "Juneteenth celebration Lansing"
  ],
}

const highlights = [
  {
    icon: Users,
    title: "Everyone Welcome",
    description: "Runners, walkers, families, teams, strollers, and wheelchair participants are all welcome to join.",
  },
  {
    icon: MapPin,
    title: "Benjamin Davis Park",
    description: "The race starts and finishes at Benjamin Davis Park in Lansing, Michigan.",
  },
  {
    icon: Heart,
    title: "Support Youth Athletics",
    description: "Proceeds and donations support Lansing Area Track Club's planned indoor practice facility.",
  },
  {
    icon: Trophy,
    title: "Community Celebration",
    description: "More than a race—a celebration of community, history, and coming together through movement.",
  },
]

export default function JuneteenthPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-success py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center rounded-full border border-success-foreground/20 bg-success-foreground/10 px-4 py-1.5">
              <span className="text-sm font-medium text-success-foreground">
                Annual Community Event
              </span>
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-success-foreground sm:text-5xl text-balance">
              Lansing Juneteenth 5K
            </h1>
            <p className="mt-2 text-2xl font-medium text-success-foreground/90">
              Run/Walk/Roll
            </p>
            <p className="mt-6 text-lg leading-relaxed text-success-foreground/80 text-pretty">
              Join the community for a meaningful 3.1-mile event celebrating freedom, 
              community, and movement at Benjamin Davis Park in Lansing, Michigan.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 w-full sm:w-auto">
                <Link href="/contact">
                  Register Interest
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-success-foreground/30 bg-success-foreground text-success hover:bg-success-foreground/90 hover:text-success w-full sm:w-auto">
                <Link href="/contact">Volunteer</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* About the Event */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-center text-balance">
              About the Lansing Juneteenth 5K
            </h2>
            <div className="mt-8 space-y-6 text-lg text-muted-foreground leading-relaxed">
              <p className="text-pretty">
                The Lansing Juneteenth 5K Run/Walk/Roll brings the community together for a meaningful 
                3.1-mile event at Benjamin Davis Park. Hosted in partnership with Lansing Area Track 
                Club and Run Tha City 517, this event celebrates freedom, fitness, and community unity.
              </p>
              <p className="text-pretty">
                This isn&apos;t just a race—it&apos;s a community celebration. Whether you&apos;re a 
                competitive runner, a casual walker, pushing a stroller, or rolling in a wheelchair, 
                you&apos;re welcome here. Families, teams, and individuals of all ages and abilities 
                come together to move, celebrate, and support a great cause.
              </p>
              <p className="text-pretty">
                Proceeds and donations from the Juneteenth 5K support Lansing Area Track Club&apos;s 
                vision for a year-round indoor practice facility—a place where youth athletes can 
                train safely regardless of Michigan weather.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Event Highlights */}
      <section className="bg-muted py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Event Highlights
            </h2>
            <p className="mt-4 text-lg text-muted-foreground text-pretty">
              What makes the Lansing Juneteenth 5K special.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {highlights.map((highlight) => (
              <Card key={highlight.title} className="text-center border-0 shadow-lg">
                <CardHeader>
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-success/10">
                    <highlight.icon className="h-7 w-7 text-success" />
                  </div>
                  <CardTitle className="text-lg">{highlight.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm leading-relaxed">
                    {highlight.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Event Details */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Event Details
              </h2>
              <div className="mt-8 space-y-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-success/10">
                    <MapPin className="h-5 w-5 text-success" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Location</h3>
                    <p className="text-muted-foreground">Benjamin Davis Park, Lansing, Michigan</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-success/10">
                    <Calendar className="h-5 w-5 text-success" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">When</h3>
                    <p className="text-muted-foreground">Annually in June (Juneteenth celebration)</p>
                    <p className="text-sm text-muted-foreground mt-1">Check announcements for this year&apos;s date</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-success/10">
                    <Users className="h-5 w-5 text-success" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Who Can Participate</h3>
                    <p className="text-muted-foreground">
                      Runners, walkers, families, teams, strollers, wheelchair participants—everyone welcome!
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <Card className="border-0 shadow-lg bg-success/5">
                <CardHeader>
                  <CardTitle className="text-xl">Supporting Youth Athletics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground leading-relaxed">
                    Your participation directly supports Lansing Area Track Club&apos;s mission. 
                    Race proceeds and donations contribute to:
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-muted-foreground">
                      <div className="h-1.5 w-1.5 rounded-full bg-success" />
                      Planned indoor practice facility
                    </li>
                    <li className="flex items-center gap-2 text-muted-foreground">
                      <div className="h-1.5 w-1.5 rounded-full bg-success" />
                      Year-round training opportunities
                    </li>
                    <li className="flex items-center gap-2 text-muted-foreground">
                      <div className="h-1.5 w-1.5 rounded-full bg-success" />
                      Safe, structured environment for athletes
                    </li>
                    <li className="flex items-center gap-2 text-muted-foreground">
                      <div className="h-1.5 w-1.5 rounded-full bg-success" />
                      Youth development programs
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="bg-primary py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl">
              Hosted In Partnership
            </h2>
            <p className="mt-4 text-lg text-primary-foreground/80 text-pretty">
              The Lansing Juneteenth 5K is brought to you by two organizations committed 
              to building community through running.
            </p>
            <div className="mt-12 grid gap-8 sm:grid-cols-2">
              <Card className="bg-primary-foreground/10 border-primary-foreground/20">
                <CardHeader className="text-center">
                  <CardTitle className="text-xl text-primary-foreground">Lansing Area Track Club</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-primary-foreground/70 text-sm">
                    Youth track and field program serving Lansing and Mid-Michigan since 2015.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-primary-foreground/10 border-primary-foreground/20">
                <CardHeader className="text-center">
                  <CardTitle className="text-xl text-primary-foreground">Run Tha City 517</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-primary-foreground/70 text-sm">
                    Lansing community running group bringing people together through movement and representation.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
              Join Us at the Finish Line
            </h2>
            <p className="mt-4 text-lg text-muted-foreground text-pretty">
              Whether you run, walk, or roll—you&apos;re part of the community. Register your interest, 
              sign up to volunteer, or become a sponsor.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button asChild size="lg" className="bg-success text-success-foreground hover:bg-success/90 w-full sm:w-auto">
                <Link href="/contact">
                  Get Involved
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
                <Link href="/announcements">Check Announcements</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
