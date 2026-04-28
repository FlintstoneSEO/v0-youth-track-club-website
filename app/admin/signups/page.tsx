import { createClient } from '@/lib/supabase/server'
import { SignupsManager } from '@/components/admin/signups-manager'

export default async function SignupsAdminPage() {
  const supabase = await createClient()
  const { data: signups } = await supabase
    .from('athlete_signups')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Athlete Signups</h2>
        <p className="text-muted-foreground mt-1">
          Review and manage athlete registration submissions
        </p>
      </div>
      <SignupsManager initialSignups={signups || []} />
    </div>
  )
}
