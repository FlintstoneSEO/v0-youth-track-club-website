import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, Award, Heart, Target, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "About Lansing Area Track Club | Youth Track Coaching in Lansing, MI",
  description: "Learn about Lansing Area Track Club, founded by Coach Ramon Brunson to help youth athletes in Lansing develop through running, track training, discipline, and community support.",
  keywords: [
    "Ramon Brunson track coach Lansing",
    "Lansing Area Track Club founder",
    "youth running coach Lansing MI",
    "youth track coaching Mid-Michigan"
  ],
}

const values = [
  {
    icon: Heart,
    title: "Community First",
    description: "We believe in building a supportive community where every athlete feels welcome and valued.",
  },
  {
    icon: Target,
    title: "Proper Technique",
    description: "Our programs focus on correct running form, track events, and progressive athlete development.",
  },
  {
    icon: Users,
    title: "Inclusive Environment",
    description: "Athletes of all skill levels and backgrounds are welcome. We meet you where you are.",
  },
  {
    icon: Award,
    title: "Character Development",
    description: "We develop more than athletic ability. We build discipline, confidence, and leadership.",
  },
]

const programs = [
  {
    title: "Youth Track (Elementary)",
    description: "Introduction to track and field fundamentals in a fun, engaging environment. Focus on motor skill development, basic running technique, and teamwork.",
    events: ["Sprints", "Distance Running", "Relays", "Long Jump", "Movement Basics"],
  },
  {
    title: "Middle School Athletes",
    description: "Progressive training that builds on fundamentals while introducing competitive elements. Athletes begin exploring events that match their abilities and interests.",
    events: ["All Running Events", "Field Events", "Cross Country Prep", "Strength Training Intro"],
  },
  {
    title: "High School Athletes",
    description: "Advanced training for athletes looking for off-season speed, endurance, and conditioning support. Focus on event specialization and competitive development.",
    events: ["Speed Training", "Endurance Building", "Event Specialization", "Strength & Conditioning"],
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
              A Lansing-area youth track club created by Ramon Brunson, serving young athletes 
              and their families across Lansing and Mid-Michigan since 2015.
            </p>
          </div>
        </div>
      </section>

      {/* Origin Story Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
                Our Story
              </h2>
              <p className="mt-4 text-lg text-muted-foreground leading-relaxed text-pretty">
                The club began organically in 2015 when Ramon, his wife, and friends started 
                training their children. The original group included Ramon&apos;s four children 
                and five children of friends—a small gathering that sparked something bigger.
              </p>
              <p className="mt-4 text-lg text-muted-foreground leading-relaxed text-pretty">
                What started with a simple idea of getting kids together to train has grown into 
                a community-centered youth track program serving families across Lansing and 
                Mid-Michigan. Today, young athletes learn proper technique, build character, 
                and discover what they are capable of through hard work and consistency.
              </p>
              <p className="mt-4 text-lg text-muted-foreground leading-relaxed text-pretty">
                As WKAR previously reported, Lansing Area Track Club relied on Facebook and email 
                to share information. This website serves as the club&apos;s new central online home—
                making it easier for families to find information, register athletes, and stay connected.
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
              <div className="aspect-[4/3] rounded-2xl bg-muted flex items-center justify-center border border-border">
                <div className="text-center p-8">
                  <div className="text-6xl font-bold text-primary mb-2">2015</div>
                  <div className="text-lg text-muted-foreground">Serving Lansing Youth Since</div>
                  <div className="mt-4 text-sm text-muted-foreground">
                    Started with 9 kids, grown to serve the community
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="bg-muted py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Our Mission
            </h2>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed text-pretty">
              Lansing Area Track Club helps teach track, running, proper technique, discipline, 
              confidence, and athlete development to youth in the Lansing, Michigan area. We believe 
              every child deserves the opportunity to discover their athletic potential in a positive, 
              supportive environment.
            </p>
            <p className="mt-4 text-lg text-muted-foreground leading-relaxed text-pretty">
              From practices and meets to community races and local events, our goal is to give 
              Lansing-area athletes a place to train, compete, and belong.
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 lg:py-24">
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
              <Card key={value.title} className="text-center border-0 shadow-lg">
                <CardHeader>
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-accent/10">
                    <value.icon className="h-7 w-7 text-accent" />
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
      <section id="programs" className="bg-muted py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Our Programs
            </h2>
            <p className="mt-4 text-lg text-muted-foreground text-pretty">
              Age-appropriate programs designed to meet athletes where they are—from elementary 
              through high school.
            </p>
          </div>
          <div className="grid gap-8 lg:grid-cols-3">
            {programs.map((program) => (
              <Card key={program.title} className="flex flex-col border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl">{program.title}</CardTitle>
                  <CardDescription className="text-base leading-relaxed">
                    {program.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-foreground">Training Focus:</p>
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
              Meet Coach Ramon Brunson
            </h2>
            <div className="mt-8">
              <div className="mx-auto h-24 w-24 rounded-full bg-accent flex items-center justify-center mb-6">
                <span className="text-3xl font-bold text-accent-foreground">RB</span>
              </div>
              <h3 className="text-2xl font-semibold text-primary-foreground">Founder &amp; Head Coach</h3>
              <p className="mt-4 text-lg leading-relaxed text-primary-foreground/80 text-pretty">
                Ramon Brunson founded Lansing Area Track Club in 2015 with a simple vision: 
                get kids active and help them grow through track and running. What started 
                as training sessions with his own children and the kids of friends has grown 
                into a respected youth athletics program serving the Lansing community.
              </p>
              <p className="mt-4 text-lg leading-relaxed text-primary-foreground/80 text-pretty">
                Ramon is also the creator of Run Tha City 517, a Lansing community running group 
                that started in June 2022. Both organizations share a commitment to getting people 
                active, building community, and representing Lansing&apos;s running culture.
              </p>
              <p className="mt-4 text-lg leading-relaxed text-primary-foreground/80 text-pretty">
                Through LATC and Run Tha City 517, Ramon continues to champion youth development, 
                community fitness, and the goal of creating a year-round indoor practice facility 
                for Lansing&apos;s young athletes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Indoor Facility Vision */}
      <section className="py-16 lg:py-24 bg-gold/10">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
              Our Vision: Year-Round Training
            </h2>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed text-pretty">
              Lansing Area Track Club is working toward a planned indoor practice facility that would 
              help provide year-round training and a safe, structured environment for athletes—
              regardless of Michigan weather.
            </p>
            <p className="mt-4 text-lg text-muted-foreground leading-relaxed text-pretty">
              Proceeds and donations from events like the Lansing Juneteenth 5K Run/Walk/Roll 
              support this vision for the future of youth athletics in Lansing.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button asChild className="bg-accent text-accent-foreground hover:bg-accent/90">
                <Link href="/juneteenth-5k">
                  Support the 5K
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Sponsors Section */}
      <section id="sponsors" className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Our Sponsors &amp; Partners
            </h2>
            <p className="mt-4 text-lg text-muted-foreground text-pretty">
              We&apos;re grateful for the support of local businesses and organizations 
              that help make our programs possible.
            </p>
          </div>
          <div className="mx-auto max-w-3xl">
            <Card className="text-center py-12 border-0 shadow-lg">
              <CardContent>
                <p className="text-muted-foreground">
                  Interested in supporting youth athletics in Lansing? We welcome community partners, 
                  sponsors, volunteers, and donors.
                </p>
                <Button asChild className="mt-6 bg-accent text-accent-foreground hover:bg-accent/90">
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
