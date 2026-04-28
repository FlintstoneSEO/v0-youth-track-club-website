import { createClient } from '@/lib/supabase/server'
import { SponsorsManager } from '@/components/admin/sponsors-manager'

export default async function SponsorsAdminPage() {
  const supabase = await createClient()
  const { data: sponsors } = await supabase
    .from('sponsors')
    .select('*')
    .order('sponsor_level', { ascending: true })
    .order('sort_order', { ascending: true })

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Sponsors</h2>
        <p className="text-muted-foreground mt-1">
          Manage club sponsors and supporters
        </p>
      </div>
      <SponsorsManager initialSponsors={sponsors || []} />
    </div>
  )
}
