import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, Calendar, Clock, MapPin, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { createClient } from "@/lib/supabase/server"
import { PracticeScheduleDisplay } from "@/components/practice-schedule-display"
import { TrackMeetsSection } from "@/components/track-meets-section"

export const metadata: Metadata = {
  title: "Practice Schedule & Track Meets | Lansing Area Track Club",
  description: "View Lansing Area Track Club practice schedule, locations, and 2026 track meet schedule. Practices Monday-Wednesday 6-7:30pm at Alfreda Schmidt Community Center Track.",
  keywords: [
    "youth track practice Lansing",
    "track practice schedule Lansing MI",
    "kids running practice Lansing",
    "youth athletics training Mid-Michigan",
    "LATC track meets",
    "Lansing track meet schedule 2026"
  ],
}

const whatToBring = [
  "Comfortable athletic clothing",
  "Running shoes (spikes optional for advanced athletes)",
  "Water bottle",
  "Sunscreen (for outdoor practices)",
  "Positive attitude!",
]

const expectations = [
  {
    title: "Arrive On Time",
    description: "Please arrive 10-15 minutes early to check in and warm up with the group.",
  },
  {
    title: "Be Prepared",
    description: "Bring water, appropriate shoes, and dress for the weather conditions.",
  },
  {
    title: "Stay Positive",
    description: "Encourage teammates and maintain a growth mindset during training.",
  },
  {
    title: "Listen to Coaches",
    description: "Follow instructions and ask questions when you need clarification.",
  },
]

export default async function PracticesPage() {
  const supabase = await createClient()
  const { data: schedules } = await supabase
    .from('practice_schedules')
    .select('*')
    .eq('is_active', true)
    .order('display_order', { ascending: true })

  return (
    <>
      {/* Hero Section */}
      <section className="bg-primary py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-primary-foreground sm:text-5xl text-balance">
              Practice Schedule & Track Meets
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-primary-foreground/80 text-pretty">
              Find your practice times, locations, and view our complete 
              track meet schedule for the 2026 season.
            </p>
          </div>
        </div>
      </section>

      {/* Practice Schedule Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Weekly Practice Schedule
            </h2>
            <p className="mt-4 text-lg text-muted-foreground text-pretty">
              Join us for practice sessions throughout the week. All schedules are subject 
              to change based on weather and facility availability.
            </p>
          </div>
          
          {schedules && schedules.length > 0 ? (
            <PracticeScheduleDisplay schedules={schedules} />
          ) : (
            <Card className="max-w-2xl mx-auto">
              <CardContent className="py-12 text-center">
                <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">
                  Practice schedule coming soon. Please check back later!
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </section>

      {/* Track Meet Schedule Section */}
      <TrackMeetsSection athleticNetUrl="https://www.athletic.net/team/91933/track-and-field-outdoor/2026" />

      {/* What to Bring */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                What to Bring
              </h2>
              <p className="mt-4 text-lg text-muted-foreground text-pretty">
                Make sure your athlete is prepared for every practice session.
              </p>
              <ul className="mt-8 space-y-3">
                {whatToBring.map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10">
                      <div className="h-2 w-2 rounded-full bg-primary" />
                    </div>
                    <span className="text-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                What to Expect
              </h2>
              <p className="mt-4 text-lg text-muted-foreground text-pretty">
                Here&apos;s what a typical practice looks like at LATC.
              </p>
              <div className="mt-8 space-y-4">
                {expectations.map((item, index) => (
                  <div key={item.title} className="flex gap-4">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent text-accent-foreground text-sm font-bold">
                      {index + 1}
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{item.title}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Typical Practice Structure */}
      <section className="bg-muted py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Typical Practice Structure
              </h2>
              <p className="mt-4 text-lg text-muted-foreground text-pretty">
                Every practice follows a structured format to maximize development and safety.
              </p>
            </div>
            <div className="relative">
              <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-border lg:left-1/2 lg:-translate-x-1/2" />
              <div className="space-y-8">
                {[
                  { time: "0-15 min", activity: "Check-in & Dynamic Warm-up", description: "Athletes check in with coaches and begin group warm-up exercises." },
                  { time: "15-30 min", activity: "Drills & Technique Work", description: "Focused drills to improve running form, starts, and event-specific skills." },
                  { time: "30-60 min", activity: "Main Workout", description: "Event-specific training, conditioning, or speed work based on the day's plan." },
                  { time: "60-75 min", activity: "Cool Down & Stretch", description: "Light jogging and stretching to aid recovery." },
                  { time: "75-90 min", activity: "Team Talk & Dismissal", description: "Coaches share announcements and athletes are dismissed to parents." },
                ].map((item, index) => (
                  <div key={item.time} className={`relative flex gap-6 ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}>
                    <div className="absolute left-4 lg:left-1/2 lg:-translate-x-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold">
                      {index + 1}
                    </div>
                    <div className={`ml-16 lg:ml-0 lg:w-1/2 ${index % 2 === 0 ? 'lg:pr-12 lg:text-right' : 'lg:pl-12'}`}>
                      <Card>
                        <CardHeader className="pb-2">
                          <div className={`text-sm font-medium text-accent ${index % 2 === 0 ? 'lg:text-right' : ''}`}>
                            {item.time}
                          </div>
                          <CardTitle className="text-lg">{item.activity}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <CardDescription>{item.description}</CardDescription>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl text-balance">
              Ready to Get Started?
            </h2>
            <p className="mt-4 text-lg text-primary-foreground/80 text-pretty">
              Register your athlete today and join us at our next practice!
            </p>
            <div className="mt-10">
              <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 motion-button">
                <Link href="/contact">
                  Register Now
                  <ArrowRight className="ml-2 h-4 w-4 motion-icon" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
