/**
 * Fails the build when a component uses a semantic-token utility that Tailwind
 * never generated.
 *
 * An undefined utility is silent: the class parses, emits no CSS, and the
 * element renders invisibly. tsc, oxlint and vitest are all blind to it. This
 * is how a transparent dropdown shipped once already, and Phase 4 has no
 * preview surface, so this script is the only automated guard.
 *
 * Scans .tsx only. index.css uses @apply, which inlines utilities rather than
 * emitting them as classes, so scanning CSS would produce false positives.
 */
import { readFileSync, readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'

const TOKENS = [
  'canvas',
  'surface-raised',
  'surface',
  'content-muted',
  'content',
  'accent-content',
  'accent',
  'panel-content',
  'panel-muted',
  'panel',
  'available',
  'assigned',
  'maintenance',
  'retired',
  // Longer names first is not required (each is matched with boundary
  // lookarounds), but a new token MUST be added here or the audit silently
  // skips it -- which is the exact blind spot this script exists to close.
  'danger-content',
  'danger',
]
const PREFIXES = [
  'bg',
  'text',
  'border',
  'outline',
  'ring',
  'fill',
  'stroke',
  'divide',
]

function walk(dir, out = []) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry)
    if (statSync(full).isDirectory()) walk(full, out)
    else if (full.endsWith('.tsx')) out.push(full)
  }
  return out
}

function findCss() {
  const dir = 'dist/assets'
  const file = readdirSync(dir).find((f) => f.endsWith('.css'))
  if (!file)
    throw new Error('No built CSS in dist/assets — run vite build first')
  return readFileSync(join(dir, file), 'utf8')
}

const css = findCss()
const used = new Map() // utility -> Set of files

for (const file of walk('src')) {
  const source = readFileSync(file, 'utf8')
  for (const prefix of PREFIXES) {
    for (const token of TOKENS) {
      const utility = `${prefix}-${token}`
      // Not preceded/followed by a word char, so bg-surface does not match
      // inside bg-surface-raised.
      const re = new RegExp(`(?<![a-zA-Z0-9-])${utility}(?![a-zA-Z0-9-])`)
      if (re.test(source)) {
        if (!used.has(utility)) used.set(utility, new Set())
        used.get(utility).add(file)
      }
    }
  }
}

const missing = []
for (const [utility, files] of used) {
  const re = new RegExp(`(?<![a-zA-Z0-9-])${utility}(?![a-zA-Z0-9-])`)
  if (!re.test(css)) missing.push({ utility, files: [...files] })
}

/*
 * Second check, added in Phase 5. Charts pass colours to Recharts as raw CSS
 * vars (fill="var(--status-available)") rather than classes, so the utility
 * scan above cannot see them — and a typo renders transparent, silently. Every
 * var referenced from a .tsx must be declared in the source CSS.
 */
const declared = new Set(
  [...readFileSync('src/index.css', 'utf8').matchAll(/^\s*(--[a-z0-9-]+)\s*:/gm)].map(
    (m) => m[1],
  ),
)

for (const file of walk('src')) {
  const source = readFileSync(file, 'utf8')
  for (const match of source.matchAll(/var\(\s*(--[a-z0-9-]+)/g)) {
    const name = match[1]
    // Radix sets its own vars at runtime; they are never in our CSS.
    if (name.startsWith('--radix-') || name.startsWith('--tw-')) continue
    if (!declared.has(name)) {
      missing.push({ utility: `var(${name})`, files: [file] })
    }
  }
}

if (missing.length > 0) {
  console.error('\nToken audit FAILED — these utilities generate no CSS:\n')
  for (const { utility, files } of missing) {
    console.error(`  ${utility}`)
    for (const f of files) console.error(`      used in ${f}`)
  }
  console.error(
    '\nAdd the token to the @theme inline block in src/index.css, or fix the class name.\n',
  )
  process.exit(1)
}

console.log(
  `Token audit: ${used.size} semantic-token utilities, all generated.`,
)
