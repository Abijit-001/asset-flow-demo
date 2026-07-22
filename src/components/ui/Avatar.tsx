import { cn } from '@/lib/cn'

/**
 * Splits on any whitespace run and ignores empty parts, so a name with double
 * spaces or a trailing space still yields real initials rather than blanks.
 */
function initials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase()
}

interface AvatarProps {
  name: string
  size?: 'sm' | 'md'
  className?: string
}

const SIZES = {
  sm: 'size-7 text-[0.625rem]',
  md: 'size-9 text-xs',
} as const

/**
 * Initials only -- there are no user photos in this system. `name` is exposed
 * as a title so the circle is not an unlabelled blob for a mouse user, and
 * callers that need an accessible name give the interactive parent one.
 */
export function Avatar({ name, size = 'md', className }: AvatarProps) {
  return (
    <span
      title={name}
      className={cn(
        'bg-accent text-accent-content grid shrink-0 place-items-center rounded-full font-semibold',
        SIZES[size],
        className,
      )}
    >
      {initials(name)}
    </span>
  )
}
