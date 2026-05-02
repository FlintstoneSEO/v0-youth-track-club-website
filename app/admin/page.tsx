import { createClient } from '@/lib/supabase/server'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import type { SupabaseRow } from '@/lib/supabase/rows'
import { 
  Megaphone, 
  Calendar, 
  Users, 
  HelpCircle,
  Activity,
  Building2,
  TrendingUp,
  Clock,
  BookOpen,
  Eye,
} from 'lucide-react'
import Link from 'next/link'

const contentGuide = [
  {
    title: 'Announcements',
    href: '/admin/announcements',
    icon: Megaphone,
    use: 'Post urgent weather updates, registration reminders, meet results, and club news.',
    tip: 'Use a clear title, put the most important detail first, and publish only when families should see it.',
  },
  {
    title: 'Events',
    href: '/admin/events',
    icon: Calendar,
    use: 'Add practices, track meets, community runs, fundraisers, and special dates.',
    tip: 'Include the date, time, location, event type, and registration link when one exists.',
  },
  {
    title: 'FAQs',
    href: '/admin/faqs',
    icon: HelpCircle,
    use: 'Answer repeat parent questions about registration, practices, equipment, meets, and age groups.',
    tip: 'Write questions the way parents would ask them, then keep answers direct and searchable.',
  },
  {
    title: 'Run Tha City 517',
    href: '/admin/run-tha-city',
    icon: Activity,
    use: 'Share group runs, route details, difficulty, meeting spots, and community running updates.',
    tip: 'Mark beginner-friendly runs clearly so new runners know they are welcome.',
  },
  {
    title: 'Sponsors',
    href: '/admin/sponsors',
    icon: Building2,
    use: 'Add supporters, sponsor levels, logos, websites, and donation partners.',
    tip: 'Use accurate business names and links so sponsors get visible credit on the site.',
  },
]

async function getStats() {
  const supabase = await createClient()

  const [
    { count: announcementsCount },
    { count: eventsCount },
    { count: signupsCount },
    { count: pendingSignups },
    { count: faqsCount },
    { count: rtcEventsCount },
    { count: sponsorsCount },
  ] = await Promise.all([
    supabase.from('announcements').select('*', { count: 'exact', head: true }),
    supabase.from('events').select('*', { count: 'exact', head: true }),
    supabase.from('athlete_signups').select('*', { count: 'exact', head: true }),
    supabase.from('athlete_signups').select('*', { count: 'exact', head: true }).eq('status', 'pending'),
    supabase.from('faqs').select('*', { count: 'exact', head: true }),
    supabase.from('run_tha_city_events').select('*', { count: 'exact', head: true }),
    supabase.from('sponsors').select('*', { count: 'exact', head: true }),
  ])

  return {
    announcements: announcementsCount || 0,
    events: eventsCount || 0,
    signups: signupsCount || 0,
    pendingSignups: pendingSignups || 0,
    faqs: faqsCount || 0,
    rtcEvents: rtcEventsCount || 0,
    sponsors: sponsorsCount || 0,
  }
}

async function getRecentSignups(): Promise<SupabaseRow[]> {
  const supabase = await createClient()
  const { data } = await supabase
    .from('athlete_signups')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(5)
  
  return data || []
}

async function getUpcomingEvents(): Promise<SupabaseRow[]> {
  const supabase = await createClient()
  const { data } = await supabase
    .from('events')
    .select('*')
    .gte('event_date', new Date().toISOString().split('T')[0])
    .order('event_date', { ascending: true })
    .limit(5)
  
  return data || []
}

export default async function AdminDashboardPage() {
  const [stats, recentSignups, upcomingEvents] = await Promise.all([
    getStats(),
    getRecentSignups(),
    getUpcomingEvents(),
  ])

  const statCards = [
    { 
      title: 'Total Signups', 
      value: stats.signups, 
      icon: Users, 
      href: '/admin/signups',
      description: `${stats.pendingSignups} pending review`
    },
    { 
      title: 'Events', 
      value: stats.events, 
      icon: Calendar, 
      href: '/admin/events',
      description: 'Track meets & events'
    },
    { 
      title: 'Announcements', 
      value: stats.announcements, 
      icon: Megaphone, 
      href: '/admin/announcements',
      description: 'Club news & updates'
    },
    { 
      title: 'FAQs', 
      value: stats.faqs, 
      icon: HelpCircle, 
      href: '/admin/faqs',
      description: 'Help articles'
    },
    { 
      title: 'Run Tha City 517', 
      value: stats.rtcEvents, 
      icon: Activity, 
      href: '/admin/run-tha-city',
      description: 'Running group events'
    },
    { 
      title: 'Sponsors', 
      value: stats.sponsors, 
      icon: Building2, 
      href: '/admin/sponsors',
      description: 'Club supporters'
    },
  ]

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h2 className="text-2xl font-bold text-foreground">Dashboard Overview</h2>
        <p className="text-muted-foreground mt-1">
          Quick overview of your track club management
        </p>
      </div>

      {/* Content Guide */}
      <Card className="border-primary/20 bg-secondary/60">
        <CardHeader>
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <CardTitle className="flex items-center gap-2 text-xl">
                <BookOpen className="h-5 w-5 text-primary" />
                Content Guide
              </CardTitle>
              <CardDescription className="mt-2 max-w-3xl">
                Use this guide when adding new site content. The goal is simple: keep families informed,
                make updates easy to find, and help local searches understand that LATC serves Lansing
                and Mid-Michigan youth athletes.
              </CardDescription>
            </div>
            <Link
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
            >
              <Eye className="h-4 w-4" />
              Preview public site
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 lg:grid-cols-5">
            {contentGuide.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className="rounded-lg border border-border bg-card p-4 transition-colors hover:border-primary/50"
              >
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-md bg-primary/10">
                  <item.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.use}</p>
                <p className="mt-3 text-xs leading-relaxed text-foreground">{item.tip}</p>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {statCards.map((stat) => (
          <Link key={stat.title} href={stat.href}>
            <Card className="hover:border-primary/50 transition-colors cursor-pointer">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <stat.icon className="h-5 w-5 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Recent Activity Section */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Signups */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  Recent Signups
                </CardTitle>
                <CardDescription>Latest athlete registrations</CardDescription>
              </div>
              <Link 
                href="/admin/signups" 
                className="text-sm text-primary hover:underline"
              >
                View all
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            {recentSignups.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-8">
                No signups yet
              </p>
            ) : (
              <div className="space-y-4">
                {recentSignups.map((signup) => (
                  <div 
                    key={signup.id} 
                    className="flex items-center justify-between border-b border-border pb-3 last:border-0 last:pb-0"
                  >
                    <div>
                      <p className="font-medium text-sm">
                        {signup.athlete_first_name} {signup.athlete_last_name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {signup.parent_email}
                      </p>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      signup.status === 'pending' 
                        ? 'bg-amber-100 text-amber-700' 
                        : signup.status === 'approved'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-gray-100 text-gray-700'
                    }`}>
                      {signup.status}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Upcoming Events */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary" />
                  Upcoming Events
                </CardTitle>
                <CardDescription>Next scheduled events</CardDescription>
              </div>
              <Link 
                href="/admin/events" 
                className="text-sm text-primary hover:underline"
              >
                View all
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            {upcomingEvents.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-8">
                No upcoming events
              </p>
            ) : (
              <div className="space-y-4">
                {upcomingEvents.map((event) => (
                  <div 
                    key={event.id} 
                    className="flex items-center justify-between border-b border-border pb-3 last:border-0 last:pb-0"
                  >
                    <div>
                      <p className="font-medium text-sm">{event.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {event.location}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">
                        {new Date(event.event_date).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric'
                        })}
                      </p>
                      <p className="text-xs text-muted-foreground capitalize">
                        {event.event_type}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
