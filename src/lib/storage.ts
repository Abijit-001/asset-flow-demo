export function safeStorage(kind: 'local' | 'session'): Storage | null {
  try {
    const storage =
      kind === 'local' ? globalThis.localStorage : globalThis.sessionStorage
    return typeof storage?.getItem === 'function' ? storage : null
  } catch {
    return null
  }
}
