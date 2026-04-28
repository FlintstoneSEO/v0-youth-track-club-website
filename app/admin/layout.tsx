import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { AdminSidebar } from '@/components/admin/admin-sidebar'
import { AdminHeader } from '@/components/admin/admin-header'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/auth/login?redirect=/admin')
  }

  // Get user profile to check admin status
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  // Check if user is admin
  if (!profile || !['admin', 'super_admin'].includes(profile.role)) {
    redirect('/?error=unauthorized')
  }

  return (
    <div className="min-h-screen bg-background flex">
      <AdminSidebar user={user} profile={profile} />
      <div className="flex-1 flex flex-col lg:pl-64">
        <AdminHeader user={user} profile={profile} />
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
