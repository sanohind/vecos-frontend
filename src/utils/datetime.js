// src/utils/datetime.js

// Parse a backend datetime string like "YYYY-MM-DD HH:mm:ss" (or with "T")
// into a Date constructed in LOCAL time, avoiding implicit UTC shifts.
export function parseDbDateTimeToLocalDate(input) {
  if (!input) return null
  if (input instanceof Date) return input
  if (typeof input !== 'string') return null

  // Match: 2025-08-19 16:10:00 or 2025-08-19T16:10:00
  const match = input.match(/^(\d{4})-(\d{2})-(\d{2})[ T](\d{2}):(\d{2})(?::(\d{2}))?/)
  if (!match) {
    // Fallback: best-effort parse, but may apply timezone conversions
    const fallback = new Date(input)
    return isNaN(fallback.getTime()) ? null : fallback
  }

  const [, y, m, d, hh, mm, ss] = match
  return new Date(
    Number(y),
    Number(m) - 1,
    Number(d),
    Number(hh),
    Number(mm),
    ss ? Number(ss) : 0,
    0,
  )
}

function pad2(n) {
  return String(n).padStart(2, '0')
}

// For <input type="datetime-local"> value (YYYY-MM-DDTHH:mm)
export function toInputLocal(dateLike) {
  const date = parseDbDateTimeToLocalDate(dateLike)
  if (!date) return ''
  const y = date.getFullYear()
  const m = pad2(date.getMonth() + 1)
  const d = pad2(date.getDate())
  const hh = pad2(date.getHours())
  const mm = pad2(date.getMinutes())
  return `${y}-${m}-${d}T${hh}:${mm}`
}

export function formatDateTimeID(dateLike, options = {}) {
  const date = parseDbDateTimeToLocalDate(dateLike)
  if (!date) return '—'
  const fmt = new Intl.DateTimeFormat('id-ID', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone: 'Asia/Jakarta',
    ...options,
  })
  return fmt.format(date)
}

export function formatDateID(dateLike, options = {}) {
  const date = parseDbDateTimeToLocalDate(dateLike)
  if (!date) return '—'
  const fmt = new Intl.DateTimeFormat('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'Asia/Jakarta',
    ...options,
  })
  return fmt.format(date)
}

export function formatTimeID(dateLike, options = {}) {
  const date = parseDbDateTimeToLocalDate(dateLike)
  if (!date) return '—'
  const fmt = new Intl.DateTimeFormat('id-ID', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone: 'Asia/Jakarta',
    ...options,
  })
  return fmt.format(date)
}

export function getDurationParts(startLike, endLike) {
  const start = parseDbDateTimeToLocalDate(startLike)
  const end = parseDbDateTimeToLocalDate(endLike)
  if (!start || !end) return { hours: 0, minutes: 0 }
  const diffMs = end.getTime() - start.getTime()
  const hours = Math.floor(diffMs / (1000 * 60 * 60))
  const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60))
  return { hours, minutes }
}

