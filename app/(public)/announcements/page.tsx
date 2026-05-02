import type { Metadata } from "next"
import { Calendar, Megaphone } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { createClient } from "@/lib/supabase/server"
import type { SupabaseRow } from "@/lib/supabase/rows"

export const metadata: Metadata = {
  title: "Club Announcements & Updates",
  description: "Stay updated with Lansing Area Track Club news, practice updates, registration reminders, youth track announcements, and important information for Lansing families.",
  keywords: [
    "Lansing Area Track Club announcements",
    "Lansing youth track updates",
    "track practice updates Lansing MI",
    "youth sports announcements Lansing",
  ],
}

async function getAnnouncements(): Promise<SupabaseRow[]> {
  const supabase = await createClient()
  const { data } = await supabase
    .from('announcements')
    .select('*')
    .eq('is_published', true)
    .order('priority', { ascending: false })
    .order('published_at', { ascending: false })
  
  return data || []
}

const priorityColors: Record<string, string> = {
  urgent: "bg-red-100 text-red-700",
  high: "bg-orange-100 text-orange-700",
  normal: "bg-primary/10 text-primary",
  low: "bg-muted text-muted-foreground",
}

export default async function AnnouncementsPage() {
  const announcements = await getAnnouncements()
  
  const urgentAnnouncements = announcements.filter((a) => a.priority === 'urgent')
  const regularAnnouncements = announcements.filter((a) => a.priority !== 'urgent')

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

      {/* Urgent Announcements */}
      {urgentAnnouncements.length > 0 && (
        <section className="py-8 bg-red-50 border-b border-red-100">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl space-y-4">
              {urgentAnnouncements.map((announcement) => (
                <Card key={announcement.id} className="border-red-200 bg-white">
                  <CardHeader>
                    <div className="flex items-center gap-2 mb-2">
                      <Megaphone className="h-5 w-5 text-red-600" />
                      <span className="text-sm font-medium text-red-600">Urgent</span>
                    </div>
                    <CardTitle className="text-xl">{announcement.title}</CardTitle>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>
                        {announcement.published_at 
                          ? new Date(announcement.published_at).toLocaleDateString('en-US', {
                              month: 'long',
                              day: 'numeric',
                              year: 'numeric'
                            })
                          : new Date(announcement.created_at).toLocaleDateString('en-US', {
                              month: 'long',
                              day: 'numeric',
                              year: 'numeric'
                            })
                        }
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                      {announcement.content}
                    </p>
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
            {regularAnnouncements.length === 0 && urgentAnnouncements.length === 0 ? (
              <div className="text-center py-12">
                <div className="mx-auto h-16 w-16 rounded-full bg-muted flex items-center justify-center mb-6">
                  <Megaphone className="h-8 w-8 text-muted-foreground" />
                </div>
                <h2 className="text-2xl font-bold text-foreground">No Announcements Yet</h2>
                <p className="mt-3 text-muted-foreground text-pretty">
                  Check back soon for news and updates from Lansing Area Track Club.
                </p>
              </div>
            ) : (
              regularAnnouncements.map((announcement) => (
                <Card key={announcement.id}>
                  <CardHeader>
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${priorityColors[announcement.priority] || priorityColors.normal}`}>
                        {announcement.priority === 'normal' ? 'Update' : announcement.priority}
                      </span>
                    </div>
                    <CardTitle className="text-xl">{announcement.title}</CardTitle>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>
                        {announcement.published_at 
                          ? new Date(announcement.published_at).toLocaleDateString('en-US', {
                              month: 'long',
                              day: 'numeric',
                              year: 'numeric'
                            })
                          : new Date(announcement.created_at).toLocaleDateString('en-US', {
                              month: 'long',
                              day: 'numeric',
                              year: 'numeric'
                            })
                        }
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                      {announcement.content}
                    </p>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </section>
    </>
  )
}
