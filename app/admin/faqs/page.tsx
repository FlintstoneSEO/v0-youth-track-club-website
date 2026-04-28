import { createClient } from '@/lib/supabase/server'
import { FaqsManager } from '@/components/admin/faqs-manager'

export default async function FaqsAdminPage() {
  const supabase = await createClient()
  const { data: faqs } = await supabase
    .from('faqs')
    .select('*')
    .order('sort_order', { ascending: true })

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">FAQs</h2>
        <p className="text-muted-foreground mt-1">
          Manage frequently asked questions
        </p>
      </div>
      <FaqsManager initialFaqs={faqs || []} />
    </div>
  )
}
