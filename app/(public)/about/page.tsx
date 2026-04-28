import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, Award, Heart, Target, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about Lansing Area Track Club, our mission, programs, and the community we serve in Mid-Michigan.",
}

const values = [
  {
    icon: Heart,
    title: "Community First",
    description: "We believe in building a supportive community where every athlete feels welcome and valued.",
  },
  {
    icon: Target,
    title: "Excellence in Training",
    description: "Our programs are designed to help athletes reach their full potential through structured, progressive training.",
  },
  {
    icon: Users,
    title: "Inclusive Environment",
    description: "Athletes of all skill levels and backgrounds are welcome. We meet you where you are.",
  },
  {
    icon: Award,
    title: "Character Development",
    description: "We develop more than athletic ability. We build discipline, teamwork, and leadership.",
  },
]

const programs = [
  {
    title: "Youth Track (Ages 6-12)",
    description: "Introduction to track and field fundamentals in a fun, engaging environment. Focus on motor skill development, basic running technique, and teamwork.",
    events: ["Sprints", "Distance", "Relays", "Long Jump", "Throwing Basics"],
  },
  {
    title: "Middle School (Ages 12-14)",
    description: "Progressive training that builds on fundamentals while introducing competitive elements. Athletes begin specializing in events that match their abilities.",
    events: ["All Running Events", "Field Events", "Cross Country Prep", "Strength Training Intro"],
  },
  {
    title: "High School Prep (Ages 14-18)",
    description: "Advanced training for competitive athletes looking to excel at the high school level and beyond. Focus on event specialization and peak performance.",
    events: ["Event Specialization", "Advanced Technique", "Strength & Conditioning", "Competition Strategy"],
  },
]

export default function AboutPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-primary py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-primary-foreground sm:text-5xl text-balance">
              About Lansing Area Track Club
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-primary-foreground/80 text-pretty">
              Founded by Ramon Brunson, Lansing Area Track Club is dedicated to developing 
              young athletes in the Lansing, Michigan community through the sport of track and field.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
                Our Mission
              </h2>
              <p className="mt-4 text-lg text-muted-foreground leading-relaxed text-pretty">
                Lansing Area Track Club exists to provide quality track and field instruction 
                to youth athletes in Mid-Michigan. We believe that every child deserves the 
                opportunity to discover their athletic potential in a positive, supportive environment.
              </p>
              <p className="mt-4 text-lg text-muted-foreground leading-relaxed text-pretty">
                Our programs are designed to develop not just faster runners and stronger athletes, 
                but confident young people who understand the value of hard work, dedication, and teamwork.
              </p>
              <div className="mt-8">
                <Button asChild className="bg-accent text-accent-foreground hover:bg-accent/90">
                  <Link href="/contact">
                    Join Our Club
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl bg-muted flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="text-5xl font-bold text-primary mb-2">LATC</div>
                  <div className="text-lg text-muted-foreground">Building Champions Since Day One</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-muted py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Our Values
            </h2>
            <p className="mt-4 text-lg text-muted-foreground text-pretty">
              These core values guide everything we do at Lansing Area Track Club.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value) => (
              <Card key={value.title} className="text-center">
                <CardHeader>
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                    <value.icon className="h-7 w-7 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm leading-relaxed">
                    {value.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section id="programs" className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Our Programs
            </h2>
            <p className="mt-4 text-lg text-muted-foreground text-pretty">
              Age-appropriate programs designed to meet athletes where they are.
            </p>
          </div>
          <div className="grid gap-8 lg:grid-cols-3">
            {programs.map((program) => (
              <Card key={program.title} className="flex flex-col">
                <CardHeader>
                  <CardTitle className="text-xl">{program.title}</CardTitle>
                  <CardDescription className="text-base leading-relaxed">
                    {program.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-foreground">Events & Focus Areas:</p>
                    <ul className="space-y-1">
                      {program.events.map((event) => (
                        <li key={event} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <div className="h-1.5 w-1.5 rounded-full bg-accent" />
                          {event}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="bg-primary py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl">
              Meet Our Founder
            </h2>
            <div className="mt-8">
              <div className="mx-auto h-24 w-24 rounded-full bg-accent flex items-center justify-center mb-6">
                <span className="text-3xl font-bold text-accent-foreground">RB</span>
              </div>
              <h3 className="text-2xl font-semibold text-primary-foreground">Ramon Brunson</h3>
              <p className="mt-4 text-lg leading-relaxed text-primary-foreground/80 text-pretty">
                Ramon Brunson founded Lansing Area Track Club with a vision of bringing 
                quality track and field programming to the youth of Lansing. His passion 
                for athletics and commitment to the community has helped hundreds of young 
                athletes discover their love for the sport.
              </p>
              <p className="mt-4 text-lg leading-relaxed text-primary-foreground/80 text-pretty">
                In addition to LATC, Ramon also created Run Tha City 517, a community running 
                group that brings runners of all ages together to explore Lansing while staying active.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Sponsors Section */}
      <section id="sponsors" className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Our Sponsors
            </h2>
            <p className="mt-4 text-lg text-muted-foreground text-pretty">
              We&apos;re grateful for the support of local businesses and organizations 
              that help make our programs possible.
            </p>
          </div>
          <div className="mx-auto max-w-3xl">
            <Card className="text-center py-12">
              <CardContent>
                <p className="text-muted-foreground">
                  Sponsor information coming soon. Interested in supporting youth athletics in Lansing?
                </p>
                <Button asChild className="mt-6" variant="outline">
                  <Link href="/contact">Become a Sponsor</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </>
  )
}
