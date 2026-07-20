import { APP_NAME, BRAND_SERIAL } from '@/constants'
import { cn } from '@/lib/cn'

type Tone = 'default' | 'inverse'

/**
 * The wordmark is drawn as a printed asset tag -- punch hole, coloured field,
 * mono serial -- because that is the physical object this software replaces. It
 * is the one decorative element in the app; everything around it stays plain.
 *
 * `inverse` is for the login panel. It uses panel tokens rather than the accent
 * because the accent changes with the theme while the panel does not, and a
 * theme-dependent accent on the fixed navy drops below the contrast floor.
 */
const TONES: Record<Tone, { chip: string; hole: string; serial: string }> = {
  default: {
    chip: 'bg-accent text-accent-content',
    hole: 'border-accent-content/70',
    serial: 'text-content-muted',
  },
  inverse: {
    chip: 'bg-panel-content text-panel',
    hole: 'border-panel/60',
    serial: 'text-panel-muted',
  },
}

interface BrandMarkProps {
  tone?: Tone
  className?: string
}

export function BrandMark({ tone = 'default', className }: BrandMarkProps) {
  const styles = TONES[tone]

  return (
    <span className={cn('inline-flex items-center gap-2.5', className)}>
      <span
        className={cn(
          'flex items-center gap-1.5 rounded-sm py-1 pr-2.5 pl-1.5',
          styles.chip,
        )}
      >
        <span
          className={cn('size-2 rounded-full border', styles.hole)}
          aria-hidden
        />
        <span className="font-display text-[0.8125rem] font-bold tracking-tight uppercase">
          {APP_NAME}
        </span>
      </span>
    </span>
  )
}
