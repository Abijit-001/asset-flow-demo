import { Search, X } from 'lucide-react'
import { cn } from '@/lib/cn'

interface SearchInputProps {
  value: string
  onValueChange: (value: string) => void
  placeholder?: string
  /** Required: the magnifier icon is not an accessible name. */
  label: string
  autoFocus?: boolean
  className?: string
  inputClassName?: string
}

/**
 * Controlled search field with a clear button that only appears once there is
 * something to clear.
 */
export function SearchInput({
  value,
  onValueChange,
  placeholder,
  label,
  autoFocus,
  className,
  inputClassName,
}: SearchInputProps) {
  return (
    <div className={cn('flex items-center gap-3', className)}>
      <Search className="text-content-muted size-4.5 shrink-0" aria-hidden />
      <input
        type="search"
        value={value}
        autoFocus={autoFocus}
        onChange={(event) => onValueChange(event.target.value)}
        placeholder={placeholder}
        aria-label={label}
        className={cn(
          // The native search clear button duplicates ours and cannot be styled.
          'flex-1 bg-transparent text-sm outline-none [&::-webkit-search-cancel-button]:hidden',
          inputClassName,
        )}
      />
      {value && (
        <button
          type="button"
          onClick={() => onValueChange('')}
          aria-label="Clear search"
          className="text-content-muted hover:text-content shrink-0 cursor-pointer"
        >
          <X className="size-4" aria-hidden />
        </button>
      )}
    </div>
  )
}
