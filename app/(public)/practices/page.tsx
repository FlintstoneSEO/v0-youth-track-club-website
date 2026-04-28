import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, Calendar, Clock, MapPin, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Practice Schedule | Lansing Area Track Club",
  description: "View Lansing Area Track Club practice information, training updates, locations, and important details for youth athletes and parents in Lansing, Michigan.",
  keywords: [
    "youth track practice Lansing",
    "track practice schedule Lansing MI",
    "kids running practice Lansing",
    "youth athletics training Mid-Michigan"
  ],
}

const practiceSchedule = [
  {
    ageGroup: "Youth (Ages 6-12)",
    days: "Tuesday & Thursday",
    time: "5:00 PM - 6:30 PM",
    location: "Sexton High School Track",
    focus: "Fundamentals, fun activities, basic technique",
  },
  {
    ageGroup: "Middle School (Ages 12-14)",
    days: "Monday, Wednesday & Friday",
    time: "4:30 PM - 6:00 PM",
    location: "Eastern High School Track",
    focus: "Progressive training, event introduction, conditioning",
  },
  {
    ageGroup: "High School Prep (Ages 14-18)",
    days: "Monday - Friday",
    time: "4:00 PM - 6:00 PM",
    location: "Everett High School Track",
    focus: "Advanced training, event specialization, competition prep",
  },
]

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

export default function PracticesPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-primary py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-primary-foreground sm:text-5xl text-balance">
              Practice Schedule
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-primary-foreground/80 text-pretty">
              Find your practice times, locations, and learn what to expect at 
              Lansing Area Track Club training sessions.
            </p>
          </div>
        </div>
      </section>

      {/* Schedule Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Weekly Schedule
            </h2>
            <p className="mt-4 text-lg text-muted-foreground text-pretty">
              Practice schedules by age group. All schedules are subject to change 
              based on weather and facility availability.
            </p>
          </div>
          <div className="grid gap-6 lg:grid-cols-3">
            {practiceSchedule.map((schedule) => (
              <Card key={schedule.ageGroup} className="overflow-hidden">
                <div className="h-2 bg-primary" />
                <CardHeader>
                  <CardTitle className="text-xl">{schedule.ageGroup}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Calendar className="h-5 w-5 text-primary shrink-0" />
                    <span className="text-sm text-muted-foreground">{schedule.days}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-primary shrink-0" />
                    <span className="text-sm text-muted-foreground">{schedule.time}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-primary shrink-0" />
                    <span className="text-sm text-muted-foreground">{schedule.location}</span>
                  </div>
                  <div className="pt-4 border-t border-border">
                    <p className="text-sm font-medium text-foreground mb-1">Focus:</p>
                    <p className="text-sm text-muted-foreground">{schedule.focus}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* What to Bring */}
      <section className="bg-muted py-16 lg:py-24">
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
      <section className="py-16 lg:py-24">
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
              <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
                <Link href="/contact">
                  Register Now
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
