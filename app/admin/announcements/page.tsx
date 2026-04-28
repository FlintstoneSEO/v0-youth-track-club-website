import { createClient } from '@/lib/supabase/server'
import { AnnouncementsManager } from '@/components/admin/announcements-manager'

export default async function AnnouncementsAdminPage() {
  const supabase = await createClient()
  const { data: announcements } = await supabase
    .from('announcements')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Announcements</h2>
        <p className="text-muted-foreground mt-1">
          Manage club announcements and news updates
        </p>
      </div>
      <AnnouncementsManager initialAnnouncements={announcements || []} />
    </div>
  )
}
