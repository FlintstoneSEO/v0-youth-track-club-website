import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, HelpCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { createClient } from "@/lib/supabase/server"
import type { SupabaseRow } from "@/lib/supabase/rows"

export const metadata: Metadata = {
  title: "Youth Track FAQ | Registration, Practices & Meets",
  description: "Answers to common questions about Lansing Area Track Club registration, youth track practices, meets, equipment, age groups, and running programs in Lansing, Michigan.",
  keywords: [
    "Lansing youth track FAQ",
    "kids track registration questions Lansing",
    "youth track practice questions Lansing MI",
    "Lansing Area Track Club registration",
  ],
}

async function getFaqs(): Promise<SupabaseRow[]> {
  const supabase = await createClient()
  const { data } = await supabase
    .from('faqs')
    .select('*')
    .eq('is_published', true)
    .order('sort_order', { ascending: true })
  
  return data || []
}

const categoryLabels: Record<string, string> = {
  general: 'General',
  registration: 'Registration',
  practices: 'Practices',
  meets: 'Competitions',
  equipment: 'Equipment',
  other: 'Other',
}

export default async function FAQPage() {
  const faqs = await getFaqs()
  
  // Group FAQs by category
  const faqsByCategory = faqs.reduce((acc, faq) => {
    const category = faq.category || 'general'
    if (!acc[category]) {
      acc[category] = []
    }
    acc[category].push(faq)
    return acc
  }, {} as Record<string, typeof faqs>)

  const categories = Object.keys(faqsByCategory)

  return (
    <>
      {/* Hero Section */}
      <section className="bg-primary py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-primary-foreground sm:text-5xl text-balance">
              Frequently Asked Questions
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-primary-foreground/80 text-pretty">
              Find answers to common questions about Lansing Area Track Club, our 
              programs, registration, and more.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            {faqs.length === 0 ? (
              <div className="text-center py-12">
                <div className="mx-auto h-16 w-16 rounded-full bg-muted flex items-center justify-center mb-6">
                  <HelpCircle className="h-8 w-8 text-muted-foreground" />
                </div>
                <h2 className="text-2xl font-bold text-foreground">No FAQs Yet</h2>
                <p className="mt-3 text-muted-foreground text-pretty">
                  Check back soon for answers to common questions.
                </p>
              </div>
            ) : (
              categories.map((category) => (
                <div key={category} className="mb-12 last:mb-0">
                  <h2 className="text-2xl font-bold text-foreground mb-6">
                    {categoryLabels[category] || category}
                  </h2>
                  <Accordion type="single" collapsible className="space-y-4">
                    {faqsByCategory[category].map((faq: SupabaseRow) => (
                      <AccordionItem
                        key={faq.id}
                        value={faq.id}
                        className="border rounded-lg px-6 data-[state=open]:bg-muted/50"
                      >
                        <AccordionTrigger className="text-left hover:no-underline py-4">
                          <span className="font-medium text-foreground">{faq.question}</span>
                        </AccordionTrigger>
                        <AccordionContent className="pb-4 text-muted-foreground leading-relaxed whitespace-pre-line">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Still Have Questions */}
      <section className="bg-muted py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
              Still Have Questions?
            </h2>
            <p className="mt-4 text-lg text-muted-foreground text-pretty">
              We&apos;re here to help! Reach out to us and we&apos;ll get back to you as soon as possible.
            </p>
            <div className="mt-10">
              <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                <Link href="/contact">
                  Contact Us
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
