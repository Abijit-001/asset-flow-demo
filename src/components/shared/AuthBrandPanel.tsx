import { BrandMark } from '@/components/shared/BrandMark'

/**
 * Display copy with exactly one consumer, so it stays local rather than moving
 * to src/constants -- Phase 8 introduces a real Categories feature, and a
 * hardcoded list under that name would collide with it.
 */
const TRACKED_CATEGORIES = [
  'Laptops',
  'Monitors',
  'Phones',
  'Licences',
  'Accessories',
] as const

/**
 * Brand field for the signed-out pages. `data-panel` opts into the panel focus
 * ring in index.css -- the default accent ring is invisible on this navy.
 */
export function AuthBrandPanel() {
  return (
    <aside
      data-panel
      className="bg-panel text-panel-content relative hidden flex-col justify-between overflow-hidden p-10 lg:flex xl:p-14"
    >
      {/* Punch-hole rail: the wordmark's tag motif repeated at page scale. */}
      <div
        aria-hidden
        className="absolute inset-y-0 left-5 w-1.5 [background-image:radial-gradient(circle_at_center,var(--panel-muted)_0_2.5px,transparent_2.5px)] [background-size:6px_30px] opacity-30"
      />

      <div className="relative">
        <BrandMark tone="inverse" />
      </div>

      <p className="font-display relative max-w-md text-3xl leading-tight font-semibold tracking-tight text-balance xl:text-4xl">
        Every laptop, licence and monitor your company owns, on one register.
      </p>

      <div className="relative">
        <h2 className="text-panel-muted font-mono text-[0.625rem] tracking-widest uppercase">
          Tracked in AssetFlow
        </h2>
        <ul className="mt-4 grid max-w-md gap-px">
          {TRACKED_CATEGORIES.map((category) => (
            <li
              key={category}
              className="border-panel-muted/20 border-t py-2.5 text-sm"
            >
              {category}
            </li>
          ))}
        </ul>
      </div>
    </aside>
  )
}
