import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export const metadata: Metadata = {
  title: "FAQ",
  description: "Frequently asked questions about Lansing Area Track Club programs, registration, and more.",
}

// These will be fetched from Supabase when connected
const faqs = [
  {
    id: "1",
    question: "What ages do you accept?",
    answer: "Lansing Area Track Club accepts athletes from ages 6 through 18 (high school). We have age-appropriate programs for youth (6-12), middle school (12-14), and high school prep (14-18) athletes.",
    category: "General",
  },
  {
    id: "2",
    question: "How much does it cost to join?",
    answer: "Registration fees vary by season and program level. Our spring/summer season typically runs $75-125 depending on the program. Early bird discounts are available, and we offer payment plans and financial assistance for families who need it. Contact us for current pricing.",
    category: "Registration",
  },
  {
    id: "3",
    question: "Does my child need prior track experience?",
    answer: "No prior experience is necessary! We welcome athletes of all skill levels. Our youth program focuses on fundamentals and making track fun, while more advanced programs build competitive skills progressively.",
    category: "General",
  },
  {
    id: "4",
    question: "What equipment does my child need?",
    answer: "Athletes need comfortable athletic clothing and running shoes. Track spikes are optional and recommended only for more experienced athletes. We recommend bringing a water bottle, sunscreen for outdoor practices, and weather-appropriate layers.",
    category: "Practices",
  },
  {
    id: "5",
    question: "Where are practices held?",
    answer: "Practices are held at various Lansing-area high school tracks depending on the age group. Youth practices are at Sexton High School, middle school at Eastern High School, and high school prep at Everett High School. Check our Practices page for current locations.",
    category: "Practices",
  },
  {
    id: "6",
    question: "How often are practices?",
    answer: "Practice frequency depends on the age group. Youth athletes practice 2 days per week, middle school athletes practice 3 days per week, and high school prep athletes practice 5 days per week during the competitive season.",
    category: "Practices",
  },
  {
    id: "7",
    question: "Will my child compete in meets?",
    answer: "Yes! All athletes have opportunities to compete in local and regional track meets. Competition is optional for younger athletes, but we encourage participation as it's a great way to measure progress and build confidence.",
    category: "Competitions",
  },
  {
    id: "8",
    question: "Do you require USATF membership?",
    answer: "USATF membership is required for athletes who want to compete in USATF-sanctioned meets, including Junior Olympics qualifiers. We help families with the registration process. For local, non-sanctioned meets, USATF membership is not required.",
    category: "Competitions",
  },
  {
    id: "9",
    question: "What is Run Tha City 517?",
    answer: "Run Tha City 517 is our community running group, also founded by Ramon Brunson. It's open to all ages and skill levels and focuses on bringing the Lansing community together through running. We host regular group runs throughout the city.",
    category: "Programs",
  },
  {
    id: "10",
    question: "How do I register my child?",
    answer: "Registration is available through our Contact page. Fill out the athlete signup form, and our team will reach out with next steps including payment information and practice details.",
    category: "Registration",
  },
  {
    id: "11",
    question: "Can parents watch practices?",
    answer: "Yes, parents are welcome to watch practices from designated areas. We ask that parents allow coaches to work with athletes during practice time. Parent volunteers are always appreciated for help with meets and events!",
    category: "Practices",
  },
  {
    id: "12",
    question: "What events do you teach?",
    answer: "We teach all standard track and field events including sprints (100m, 200m, 400m), distance (800m, 1500m, 3000m), hurdles, relays, long jump, high jump, shot put, and discus. Event availability varies by age group and athlete interest.",
    category: "Programs",
  },
]

const categories = [...new Set(faqs.map((faq) => faq.category))]

export default function FAQPage() {
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
            {categories.map((category) => (
              <div key={category} className="mb-12 last:mb-0">
                <h2 className="text-2xl font-bold text-foreground mb-6">{category}</h2>
                <Accordion type="single" collapsible className="space-y-4">
                  {faqs
                    .filter((faq) => faq.category === category)
                    .map((faq) => (
                      <AccordionItem
                        key={faq.id}
                        value={faq.id}
                        className="border rounded-lg px-6 data-[state=open]:bg-muted/50"
                      >
                        <AccordionTrigger className="text-left hover:no-underline py-4">
                          <span className="font-medium text-foreground">{faq.question}</span>
                        </AccordionTrigger>
                        <AccordionContent className="pb-4 text-muted-foreground leading-relaxed">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                </Accordion>
              </div>
            ))}
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
