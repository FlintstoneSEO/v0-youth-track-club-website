import { createClient } from '@/lib/supabase/server'
import { EventsManager } from '@/components/admin/events-manager'

export default async function EventsAdminPage() {
  const supabase = await createClient()
  const { data: events } = await supabase
    .from('events')
    .select('*')
    .order('event_date', { ascending: false })

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Events</h2>
        <p className="text-muted-foreground mt-1">
          Manage track meets, practices, and club events
        </p>
      </div>
      <EventsManager initialEvents={events || []} />
    </div>
  )
}
