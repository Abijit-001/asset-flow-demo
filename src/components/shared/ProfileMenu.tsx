import { LogOut } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/DropdownMenu'
import { Avatar } from '@/components/ui/Avatar'
import { useAuth } from '@/features/auth/hooks/use-auth'
import { useLogout } from '@/features/auth/hooks/use-logout'

export function ProfileMenu() {
  const { user } = useAuth()
  const logout = useLogout()

  if (!user) return null

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        aria-label={`Account menu for ${user.name}`}
        className="shrink-0 cursor-pointer rounded-full"
      >
        <Avatar name={user.name} />
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuLabel>
          <span className="block text-sm font-medium">{user.name}</span>
          <span className="text-content-muted block truncate text-xs">
            {user.email}
          </span>
          <span className="text-content-muted mt-1 block font-mono text-[0.625rem] tracking-widest uppercase">
            {user.role}
          </span>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuItem onSelect={logout}>
          <LogOut className="size-4" aria-hidden />
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
