'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { 
  LayoutDashboard, 
  Megaphone, 
  Calendar, 
  HelpCircle, 
  Users, 
  Trophy,
  Building2,
  Activity
} from 'lucide-react'
import type { User } from '@supabase/supabase-js'

interface AdminSidebarProps {
  user: User
  profile: {
    full_name: string | null
    role: string
  }
}

const navigation = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'Announcements', href: '/admin/announcements', icon: Megaphone },
  { name: 'Events', href: '/admin/events', icon: Calendar },
  { name: 'FAQs', href: '/admin/faqs', icon: HelpCircle },
  { name: 'Athlete Signups', href: '/admin/signups', icon: Users },
  { name: 'Run Tha City 517', href: '/admin/run-tha-city', icon: Activity },
  { name: 'Sponsors', href: '/admin/sponsors', icon: Building2 },
]

export function AdminSidebar({ profile }: AdminSidebarProps) {
  const pathname = usePathname()

  return (
    <aside className="fixed inset-y-0 left-0 z-50 w-64 bg-sidebar text-sidebar-foreground transform -translate-x-full lg:translate-x-0 transition-transform duration-200 ease-in-out">
      <div className="flex flex-col h-full">
        {/* Logo */}
        <div className="flex items-center gap-3 px-6 py-5 border-b border-sidebar-border">
          <div className="w-10 h-10 bg-sidebar-primary rounded-xl flex items-center justify-center">
            <Trophy className="w-5 h-5 text-sidebar-primary-foreground" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-sm">LATC Admin</span>
            <span className="text-xs text-sidebar-foreground/70">Dashboard</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
          {navigation.map((item) => {
            const isActive = pathname === item.href || 
              (item.href !== '/admin' && pathname.startsWith(item.href))
            
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                    : 'text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent/50'
                )}
              >
                <item.icon className="w-5 h-5" />
                {item.name}
              </Link>
            )
          })}
        </nav>

        {/* User info */}
        <div className="px-4 py-4 border-t border-sidebar-border">
          <div className="flex items-center gap-3 px-3 py-2">
            <div className="w-8 h-8 bg-sidebar-accent rounded-full flex items-center justify-center">
              <span className="text-xs font-medium text-sidebar-accent-foreground">
                {profile.full_name?.charAt(0) || 'A'}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium truncate">
                {profile.full_name || 'Admin User'}
              </span>
              <span className="text-xs text-sidebar-foreground/70 capitalize">
                {profile.role.replace('_', ' ')}
              </span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  )
}
