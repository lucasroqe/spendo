'use client'

import { useEffect, useState } from 'react'
import {
  CircleDollarSign,
  Settings2,
  ChartBar,
  HandCoins,
  Sparkles,
} from 'lucide-react'
import { NavMain } from './nav-main'
import { NavUser } from './nav-user'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar'
import { authClient } from '@/lib/auth-client'
import Link from 'next/link'

export function AppSidebar({ ...props }) {
  const [user, setUser] = useState({
    name: '',
    email: '',
    avatar: '',
  })

  useEffect(() => {
    const fetchSession = async () => {
      const session = await authClient.getSession()

      setUser({
        name: session.data?.user.name ?? '',
        email: session.data?.user.email ?? '',
        avatar: session.data?.user.name ?? '',
      })
    }

    fetchSession()
  }, [])

  const data = {
    user,
    navMain: [
      { title: 'Dashboard', url: '/dashboard', icon: ChartBar, isActive: true },
      {
        title: 'Transactions',
        url: '/dashboard/transactions',
        icon: HandCoins,
      },
      { title: 'AI Assistant', url: '/dashboard/assistant', icon: Sparkles },
      {
        title: 'Settings',
        url: '',
        icon: Settings2,
        items: [
          {
            title: 'User',
            url: '/dashboard/settings/user',
          },
          {
            title: 'General',
            url: '/dashboard/settings/general',
          },
        ],
      },
    ],
  }

  return (
    <Sidebar {...props} variant="inset">
      <SidebarHeader>
        <div>
          <Link
            href="/dashboard"
            className="flex flex-row items-center gap-3 text-xl font-bold"
          >
            <CircleDollarSign className="text-emerald-500" size={32} />
            <h2 className="font-semibold">Spendo</h2>
          </Link>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
