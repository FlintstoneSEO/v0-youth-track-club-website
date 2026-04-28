"use client"

import { useState } from "react"
import { Mail, MapPin, Send, CheckCircle, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { createClient } from "@/lib/supabase/client"

export default function ContactPage() {
  const [signupSubmitted, setSignupSubmitted] = useState(false)
  const [signupLoading, setSignupLoading] = useState(false)
  const [signupError, setSignupError] = useState<string | null>(null)
  const [contactSubmitted, setContactSubmitted] = useState(false)

  const handleSignupSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSignupLoading(true)
    setSignupError(null)

    const formData = new FormData(e.currentTarget)
    const supabase = createClient()

    const { error } = await supabase.from('athlete_signups').insert([{
      athlete_first_name: formData.get('athlete-first'),
      athlete_last_name: formData.get('athlete-last'),
      athlete_dob: formData.get('athlete-dob'),
      athlete_gender: formData.get('athlete-gender') || null,
      athlete_grade: formData.get('athlete-grade'),
      athlete_school: formData.get('athlete-school') || null,
      parent_first_name: formData.get('parent-first'),
      parent_last_name: formData.get('parent-last'),
      parent_email: formData.get('parent-email'),
      parent_phone: formData.get('parent-phone'),
      emergency_contact_name: formData.get('emergency-name') || null,
      emergency_contact_phone: formData.get('emergency-phone') || null,
      medical_conditions: formData.get('medical') || null,
      experience_level: formData.get('experience') || 'beginner',
      preferred_events: formData.get('events') ? (formData.get('events') as string).split(',').map(s => s.trim()) : null,
      how_heard_about_us: formData.get('how-heard') || null,
      status: 'pending',
    }])

    setSignupLoading(false)

    if (error) {
      setSignupError('There was an error submitting your registration. Please try again.')
      return
    }

    setSignupSubmitted(true)
  }

  const handleContactSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // For now, just show success - in production, you'd send an email
    setContactSubmitted(true)
  }

  return (
    <>
      {/* Hero Section */}
      <section className="bg-primary py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-primary-foreground sm:text-5xl text-balance">
              Contact & Sign Up
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-primary-foreground/80 text-pretty">
              Register your athlete for Lansing Area Track Club or get in touch 
              with questions about our programs.
            </p>
          </div>
        </div>
      </section>

      {/* Forms Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Athlete Signup Form */}
            <Card className="h-fit">
              <CardHeader>
                <CardTitle className="text-2xl">Athlete Registration</CardTitle>
                <CardDescription>
                  Sign up your athlete for Lansing Area Track Club. We&apos;ll contact you 
                  with next steps including practice information and payment details.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {signupSubmitted ? (
                  <div className="text-center py-8">
                    <div className="mx-auto h-16 w-16 rounded-full bg-success/10 flex items-center justify-center mb-4">
                      <CheckCircle className="h-8 w-8 text-success" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">Registration Received!</h3>
                    <p className="text-muted-foreground">
                      Thank you for registering. We&apos;ll be in touch soon with next steps.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSignupSubmit} className="space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="athlete-first">Athlete First Name *</Label>
                        <Input id="athlete-first" name="athlete-first" required placeholder="First name" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="athlete-last">Athlete Last Name *</Label>
                        <Input id="athlete-last" name="athlete-last" required placeholder="Last name" />
                      </div>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="athlete-dob">Date of Birth *</Label>
                        <Input id="athlete-dob" name="athlete-dob" type="date" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="athlete-gender">Gender</Label>
                        <Select name="athlete-gender">
                          <SelectTrigger id="athlete-gender">
                            <SelectValue placeholder="Select gender" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="male">Male</SelectItem>
                            <SelectItem value="female">Female</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                            <SelectItem value="prefer_not_to_say">Prefer not to say</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="athlete-grade">Grade Level</Label>
                        <Select name="athlete-grade">
                          <SelectTrigger id="athlete-grade">
                            <SelectValue placeholder="Select grade" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="K">Kindergarten</SelectItem>
                            <SelectItem value="1">1st Grade</SelectItem>
                            <SelectItem value="2">2nd Grade</SelectItem>
                            <SelectItem value="3">3rd Grade</SelectItem>
                            <SelectItem value="4">4th Grade</SelectItem>
                            <SelectItem value="5">5th Grade</SelectItem>
                            <SelectItem value="6">6th Grade</SelectItem>
                            <SelectItem value="7">7th Grade</SelectItem>
                            <SelectItem value="8">8th Grade</SelectItem>
                            <SelectItem value="9">9th Grade</SelectItem>
                            <SelectItem value="10">10th Grade</SelectItem>
                            <SelectItem value="11">11th Grade</SelectItem>
                            <SelectItem value="12">12th Grade</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="athlete-school">School</Label>
                        <Input id="athlete-school" name="athlete-school" placeholder="School name" />
                      </div>
                    </div>
                    
                    <div className="border-t pt-4 mt-4">
                      <h4 className="font-medium mb-4">Parent/Guardian Information</h4>
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="parent-first">First Name *</Label>
                          <Input id="parent-first" name="parent-first" required placeholder="First name" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="parent-last">Last Name *</Label>
                          <Input id="parent-last" name="parent-last" required placeholder="Last name" />
                        </div>
                      </div>
                      <div className="grid gap-4 sm:grid-cols-2 mt-4">
                        <div className="space-y-2">
                          <Label htmlFor="parent-email">Email *</Label>
                          <Input id="parent-email" name="parent-email" type="email" required placeholder="email@example.com" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="parent-phone">Phone *</Label>
                          <Input id="parent-phone" name="parent-phone" type="tel" required placeholder="(555) 555-5555" />
                        </div>
                      </div>
                    </div>

                    <div className="border-t pt-4 mt-4">
                      <h4 className="font-medium mb-4">Emergency Contact</h4>
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="emergency-name">Name</Label>
                          <Input id="emergency-name" name="emergency-name" placeholder="Emergency contact name" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="emergency-phone">Phone</Label>
                          <Input id="emergency-phone" name="emergency-phone" type="tel" placeholder="(555) 555-5555" />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="experience">Track Experience</Label>
                      <Select name="experience">
                        <SelectTrigger id="experience">
                          <SelectValue placeholder="Select experience level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="beginner">Beginner (no prior experience)</SelectItem>
                          <SelectItem value="intermediate">Intermediate (1-2 years)</SelectItem>
                          <SelectItem value="advanced">Advanced (3+ years)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="events">Events of Interest (optional)</Label>
                      <Input id="events" name="events" placeholder="e.g., Sprints, Long Jump, Distance" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="medical">Medical Conditions/Allergies</Label>
                      <Textarea 
                        id="medical" 
                        name="medical"
                        placeholder="Any medical conditions, allergies, or other health information we should know?"
                        rows={3}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="how-heard">How did you hear about us?</Label>
                      <Input id="how-heard" name="how-heard" placeholder="e.g., Friend, Social Media, School" />
                    </div>

                    {signupError && (
                      <p className="text-sm text-destructive">{signupError}</p>
                    )}

                    <Button 
                      type="submit" 
                      className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
                      disabled={signupLoading}
                    >
                      {signupLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        <>
                          Submit Registration
                          <Send className="ml-2 h-4 w-4" />
                        </>
                      )}
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>

            {/* Contact Form & Info */}
            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">Get in Touch</CardTitle>
                  <CardDescription>
                    Have questions? Send us a message and we&apos;ll get back to you soon.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {contactSubmitted ? (
                    <div className="text-center py-8">
                      <div className="mx-auto h-16 w-16 rounded-full bg-success/10 flex items-center justify-center mb-4">
                        <CheckCircle className="h-8 w-8 text-success" />
                      </div>
                      <h3 className="text-xl font-semibold text-foreground mb-2">Message Sent!</h3>
                      <p className="text-muted-foreground">
                        Thank you for reaching out. We&apos;ll respond as soon as possible.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleContactSubmit} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="contact-name">Name</Label>
                        <Input id="contact-name" required placeholder="Your name" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="contact-email">Email</Label>
                        <Input id="contact-email" type="email" required placeholder="email@example.com" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="subject">Subject</Label>
                        <Select>
                          <SelectTrigger id="subject">
                            <SelectValue placeholder="Select a subject" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="general">General Question</SelectItem>
                            <SelectItem value="registration">Registration Help</SelectItem>
                            <SelectItem value="volunteer">Volunteering</SelectItem>
                            <SelectItem value="sponsor">Sponsorship</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="message">Message</Label>
                        <Textarea 
                          id="message" 
                          required
                          placeholder="How can we help you?"
                          rows={4}
                        />
                      </div>
                      <Button type="submit" className="w-full">
                        Send Message
                        <Send className="ml-2 h-4 w-4" />
                      </Button>
                    </form>
                  )}
                </CardContent>
              </Card>

              {/* Contact Info */}
              <Card>
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-foreground">Location</p>
                      <p className="text-sm text-muted-foreground">Lansing, Michigan</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Mail className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-foreground">Email</p>
                      <a 
                        href="mailto:info@lansingatc.com" 
                        className="text-sm text-muted-foreground hover:text-primary transition-colors"
                      >
                        info@lansingatc.com
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Volunteer CTA */}
              <Card id="volunteer" className="bg-primary text-primary-foreground">
                <CardHeader>
                  <CardTitle className="text-primary-foreground">Interested in Volunteering?</CardTitle>
                  <CardDescription className="text-primary-foreground/80">
                    We&apos;re always looking for volunteer coaches, meet helpers, and 
                    community supporters. Select &quot;Volunteering&quot; in the contact form 
                    above to learn more about opportunities.
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
