import Link from "next/link"
import Image from "next/image"
import { Facebook, Instagram, Mail, MapPin } from "lucide-react"
import { siteConfig } from "@/lib/site"

const quickLinks = [
  { name: "About Us", href: "/about" },
  { name: "Practices", href: "/practices" },
  { name: "Events", href: "/events" },
  { name: "FAQ", href: "/faq" },
]

const programLinks = [
  { name: "Youth Track", href: "/about#programs" },
  { name: "Run Tha City 517", href: "/run-tha-city-517" },
  { name: "Juneteenth 5K", href: "/juneteenth-5k" },
  { name: "Sponsors", href: "/about#sponsors" },
]

export function SiteFooter() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12 lg:py-16">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Image
                src="/images/latc-logo.jpg"
                alt="Lansing Area Track Club"
                width={56}
                height={56}
                className="h-14 w-auto rounded-lg bg-white p-1"
              />
              <div>
                <p className="text-sm font-bold leading-tight">Lansing Area</p>
                <p className="text-sm font-bold leading-tight text-accent">Track Club</p>
              </div>
            </div>
            <p className="text-sm text-primary-foreground/80 leading-relaxed">
              Helping youth athletes in Lansing, Michigan build speed, endurance, confidence, 
              and discipline through track, running, and community since 2015.
            </p>
            <p className="text-xs leading-relaxed text-primary-foreground/70">
              Serving {siteConfig.areaServed.slice(0, 6).join(", ")} and surrounding Mid-Michigan communities.
            </p>
            <div className="flex gap-4">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary-foreground/60 hover:text-accent transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary-foreground/60 hover:text-accent transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-sm text-primary-foreground/80 hover:text-accent transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h3 className="font-semibold mb-4">Programs</h3>
            <ul className="space-y-2">
              {programLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-sm text-primary-foreground/80 hover:text-accent transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                <span className="text-sm text-primary-foreground/80">
                  Lansing, Michigan and Mid-Michigan
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-accent shrink-0" />
                <a 
                  href="mailto:info@lansingatc.com"
                  className="text-sm text-primary-foreground/80 hover:text-accent transition-colors"
                >
                  info@lansingatc.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-primary-foreground/10">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-primary-foreground/60">
              &copy; {new Date().getFullYear()} Lansing Area Track Club. All rights reserved.
            </p>
            <p className="text-sm text-primary-foreground/60">
              Founded by Ramon Brunson
            </p>
          </div>
          <div className="mt-4 text-center">
            <p className="text-xs text-primary-foreground/40">
              Designed by{" "}
              <a 
                href="https://flintstoneseo.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary-foreground/60 hover:text-accent transition-colors underline underline-offset-2"
              >
                Flintstone SEO
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
