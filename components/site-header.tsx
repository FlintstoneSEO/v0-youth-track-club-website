"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Menu, X, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const navigation = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Practices", href: "/practices" },
  { name: "Events", href: "/events" },
  { name: "Announcements", href: "/announcements" },
  { name: "FAQ", href: "/faq" },
  { name: "Run Tha City 517", href: "/run-tha-city-517" },
  { name: "Juneteenth 5K", href: "/juneteenth-5k" },
  { name: "Contact", href: "/contact" },
]

export function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container mx-auto flex h-16 items-center justify-between px-4 lg:px-8">
        {/* Logo */}
        <Link href="/" className="group flex items-center gap-2">
          <Image
            src="/images/latc-logo.jpg"
            alt="Lansing Area Track Club"
            width={48}
            height={48}
            className="h-12 w-auto transition-transform duration-200 group-hover:scale-105"
            priority
          />
          <div className="hidden sm:block">
            <p className="text-sm font-bold leading-tight text-foreground">Lansing Area</p>
            <p className="text-sm font-bold leading-tight text-primary">Track Club</p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex lg:items-center lg:gap-1">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "rounded-md px-3 py-2 text-sm font-medium transition-all duration-200 hover:-translate-y-0.5",
                pathname === item.href
                  ? "text-primary bg-primary/10"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              )}
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* CTA Button & Admin */}
        <div className="hidden lg:flex lg:items-center lg:gap-3">
          <Link 
            href="/auth/login"
            className="flex items-center gap-1.5 px-3 py-2 text-sm text-muted-foreground transition-all duration-200 hover:-translate-y-0.5 hover:text-foreground"
            title="Admin Login"
          >
            <Lock className="h-4 w-4" />
            <span>Admin</span>
          </Link>
          <Button asChild className="motion-button bg-accent text-accent-foreground hover:bg-accent/90">
            <Link href="/contact">Join Now</Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          className="lg:hidden -m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-foreground"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <span className="sr-only">Toggle menu</span>
          {mobileMenuOpen ? (
            <X className="h-6 w-6" aria-hidden="true" />
          ) : (
            <Menu className="h-6 w-6" aria-hidden="true" />
          )}
        </button>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="animate-rise lg:hidden border-t border-border">
          <div className="container mx-auto px-4 py-4 space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "block rounded-md px-3 py-2 text-base font-medium transition-all duration-200",
                  pathname === item.href
                    ? "text-primary bg-primary/10"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                )}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="pt-4 border-t border-border mt-4 space-y-2">
              <Button asChild className="motion-button w-full bg-accent text-accent-foreground hover:bg-accent/90">
                <Link href="/contact">Join Now</Link>
              </Button>
              <Link 
                href="/auth/login"
                className="flex items-center justify-center gap-1.5 px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Lock className="h-4 w-4" />
                <span>Admin Login</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
