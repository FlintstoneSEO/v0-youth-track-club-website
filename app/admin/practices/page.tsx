import { createClient } from '@/lib/supabase/server'
import { PracticeSchedulesManager } from '@/components/admin/practice-schedules-manager'

export default async function PracticesAdminPage() {
  const supabase = await createClient()
  const { data: schedules } = await supabase
    .from('practice_schedules')
    .select('*')
    .order('display_order', { ascending: true })

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Practice Schedules</h2>
        <p className="text-muted-foreground mt-1">
          Manage weekly practice times, locations, and details
        </p>
      </div>
      <PracticeSchedulesManager initialSchedules={schedules || []} />
    </div>
  )
}
