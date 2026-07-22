import type { ReactNode, ThHTMLAttributes, TdHTMLAttributes } from 'react'
import { cn } from '@/lib/cn'

/**
 * Styled table primitives rather than a data-table component: sorting, paging
 * and column visibility are Phase 6's job and belong to the feature, not here.
 *
 * The wrapper scrolls horizontally on its own so a wide table never makes the
 * page scroll sideways.
 */
export function Table({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div className="border-border w-full overflow-x-auto rounded-md border">
      <table className={cn('w-full border-collapse text-sm', className)}>
        {children}
      </table>
    </div>
  )
}

export function THead({ children }: { children: ReactNode }) {
  return <thead className="bg-canvas">{children}</thead>
}

export function TBody({ children }: { children: ReactNode }) {
  return <tbody>{children}</tbody>
}

export function TR({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <tr className={cn('border-border border-b last:border-0', className)}>
      {children}
    </tr>
  )
}

export function TH({
  children,
  className,
  ...props
}: ThHTMLAttributes<HTMLTableCellElement> & { children: ReactNode }) {
  return (
    <th
      scope="col"
      className={cn(
        'text-content-muted h-10 px-3 text-left text-xs font-medium whitespace-nowrap',
        className,
      )}
      {...props}
    >
      {children}
    </th>
  )
}

export function TD({
  children,
  className,
  ...props
}: TdHTMLAttributes<HTMLTableCellElement> & { children: ReactNode }) {
  return (
    <td className={cn('px-3 py-2 align-middle', className)} {...props}>
      {children}
    </td>
  )
}
