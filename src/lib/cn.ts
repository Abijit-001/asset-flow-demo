import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/** Merges conditional classes and lets a caller's utility win over a default. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
