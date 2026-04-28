import type { Metadata } from "next"
import { Calendar, ChevronRight, Megaphone } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Announcements",
  description: "Stay updated with the latest news and announcements from Lansing Area Track Club.",
}

// These will be fetched from Supabase when connected
const announcements = [
  {
    id: "1",
    title: "Spring 2026 Registration Now Open!",
    date: "February 15, 2026",
    category: "Registration",
    content: "We're excited to announce that registration for the Spring 2026 track season is now open! Early bird pricing is available through March 1st. Visit our contact page to sign up your athlete today.",
    is_pinned: true,
  },
  {
    id: "2",
    title: "New Practice Location for Middle School Athletes",
    date: "February 10, 2026",
    category: "Update",
    content: "Starting March 1st, middle school practices will move to Eastern High School track. This change gives us access to better facilities and more space for our growing program. Same days and times apply.",
    is_pinned: false,
  },
  {
    id: "3",
    title: "Congratulations to Our Fall Award Winners!",
    date: "January 25, 2026",
    category: "Recognition",
    content: "We want to recognize our outstanding athletes from the fall cross country season! Most Improved: Marcus Johnson. Outstanding Effort: Aaliyah Williams. Team Spirit: Devon Carter. Keep up the great work!",
    is_pinned: false,
  },
  {
    id: "4",
    title: "Volunteer Coaches Needed",
    date: "January 15, 2026",
    category: "Volunteer",
    content: "As our program grows, we need more volunteer coaches to help with practices and meets. If you have a background in track and field or just love working with kids, we'd love to hear from you. Contact us for more information.",
    is_pinned: false,
  },
  {
    id: "5",
    title: "Winter Training Program Update",
    date: "January 5, 2026",
    category: "Update",
    content: "Due to weather conditions, all indoor training sessions for January will be held at the Lansing Community Center gymnasium. Please check your email for specific schedule updates.",
    is_pinned: false,
  },
]

const categoryColors: Record<string, string> = {
  Registration: "bg-success/10 text-success",
  Update: "bg-primary/10 text-primary",
  Recognition: "bg-accent/10 text-accent",
  Volunteer: "bg-chart-4/10 text-chart-4",
}

export default function AnnouncementsPage() {
  const pinnedAnnouncements = announcements.filter((a) => a.is_pinned)
  const regularAnnouncements = announcements.filter((a) => !a.is_pinned)

  return (
    <>
      {/* Hero Section */}
      <section className="bg-primary py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-primary-foreground sm:text-5xl text-balance">
              Announcements
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-primary-foreground/80 text-pretty">
              Stay updated with the latest news, updates, and important information 
              from Lansing Area Track Club.
            </p>
          </div>
        </div>
      </section>

      {/* Pinned Announcements */}
      {pinnedAnnouncements.length > 0 && (
        <section className="py-8 bg-accent/5 border-b border-border">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl">
              {pinnedAnnouncements.map((announcement) => (
                <Card key={announcement.id} className="border-accent/50 bg-accent/5">
                  <CardHeader>
                    <div className="flex items-center gap-2 mb-2">
                      <Megaphone className="h-5 w-5 text-accent" />
                      <span className="text-sm font-medium text-accent">Pinned</span>
                      <span className={`ml-2 inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${categoryColors[announcement.category] || "bg-muted text-muted-foreground"}`}>
                        {announcement.category}
                      </span>
                    </div>
                    <CardTitle className="text-xl">{announcement.title}</CardTitle>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>{announcement.date}</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">{announcement.content}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Regular Announcements */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl space-y-6">
            {regularAnnouncements.map((announcement) => (
              <Card key={announcement.id}>
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${categoryColors[announcement.category] || "bg-muted text-muted-foreground"}`}>
                      {announcement.category}
                    </span>
                  </div>
                  <CardTitle className="text-xl">{announcement.title}</CardTitle>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>{announcement.date}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">{announcement.content}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Empty State (for when there are no announcements) */}
      {announcements.length === 0 && (
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-2xl text-center">
              <div className="mx-auto h-16 w-16 rounded-full bg-muted flex items-center justify-center mb-6">
                <Megaphone className="h-8 w-8 text-muted-foreground" />
              </div>
              <h2 className="text-2xl font-bold text-foreground">No Announcements Yet</h2>
              <p className="mt-3 text-muted-foreground text-pretty">
                Check back soon for news and updates from Lansing Area Track Club.
              </p>
            </div>
          </div>
        </section>
      )}
    </>
  )
}
