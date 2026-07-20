import { LayoutDashboard, type LucideIcon } from 'lucide-react'
import { ROUTES } from '@/constants'

export interface NavItem {
  label: string
  to: string
  icon: LucideIcon
}

/**
 * The single source for main navigation. The desktop sidebar and the mobile
 * drawer both map this array, so a new section is one entry rather than an edit
 * in every place nav is rendered.
 *
 * Only routes that exist get an entry -- Assets, Employees and the rest are
 * added by the phases that build them, not before.
 */
export const NAV_ITEMS: readonly NavItem[] = [
  { label: 'Dashboard', to: ROUTES.dashboard, icon: LayoutDashboard },
]
