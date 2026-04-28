import { createClient } from '@/lib/supabase/server'
import { RunThaCityManager } from '@/components/admin/run-tha-city-manager'

export default async function RunThaCityAdminPage() {
  const supabase = await createClient()
  const { data: events } = await supabase
    .from('run_tha_city_events')
    .select('*')
    .order('event_date', { ascending: false })

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Run Tha City 517</h2>
        <p className="text-muted-foreground mt-1">
          Manage running group events and activities
        </p>
      </div>
      <RunThaCityManager initialEvents={events || []} />
    </div>
  )
}
