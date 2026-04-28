"use client"

import type { Metadata } from "next"
import { useState } from "react"
import { Mail, MapPin, Send, CheckCircle } from "lucide-react"
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

export default function ContactPage() {
  const [signupSubmitted, setSignupSubmitted] = useState(false)
  const [contactSubmitted, setContactSubmitted] = useState(false)

  const handleSignupSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // This will connect to Supabase later
    setSignupSubmitted(true)
  }

  const handleContactSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // This will connect to Supabase/email service later
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
                        <Label htmlFor="athlete-first">Athlete First Name</Label>
                        <Input id="athlete-first" required placeholder="First name" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="athlete-last">Athlete Last Name</Label>
                        <Input id="athlete-last" required placeholder="Last name" />
                      </div>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="athlete-age">Athlete Age</Label>
                        <Input id="athlete-age" type="number" required min="6" max="18" placeholder="Age" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="athlete-grade">Grade Level</Label>
                        <Select required>
                          <SelectTrigger id="athlete-grade">
                            <SelectValue placeholder="Select grade" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="k">Kindergarten</SelectItem>
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
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="parent-name">Parent/Guardian Name</Label>
                      <Input id="parent-name" required placeholder="Full name" />
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="parent-email">Email</Label>
                        <Input id="parent-email" type="email" required placeholder="email@example.com" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="parent-phone">Phone</Label>
                        <Input id="parent-phone" type="tel" required placeholder="(555) 555-5555" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="experience">Track Experience</Label>
                      <Select>
                        <SelectTrigger id="experience">
                          <SelectValue placeholder="Select experience level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="none">No prior experience</SelectItem>
                          <SelectItem value="some">Some experience (1 year or less)</SelectItem>
                          <SelectItem value="moderate">Moderate experience (2-3 years)</SelectItem>
                          <SelectItem value="experienced">Experienced (4+ years)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="events">Events of Interest (optional)</Label>
                      <Input id="events" placeholder="e.g., Sprints, Long Jump, Distance" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="notes">Additional Notes (optional)</Label>
                      <Textarea 
                        id="notes" 
                        placeholder="Any medical conditions, allergies, or other information we should know?"
                        rows={3}
                      />
                    </div>
                    <Button type="submit" className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                      Submit Registration
                      <Send className="ml-2 h-4 w-4" />
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
