// src/utils/usePolling.js
import { onMounted, onBeforeUnmount } from 'vue'

/**
 * Reusable polling utility for Vue 3 Composition API.
 *
 * @param {() => (void|Promise<void>)} callback - Function to execute on each tick.
 * @param {{ intervalMs?: number, immediate?: boolean, visibleOnly?: boolean }} options
 *   - intervalMs: polling interval in milliseconds (default: 60000)
 *   - immediate: run once immediately on mount/visibility gain (default: true)
 *   - visibleOnly: pause when document is hidden, resume when visible (default: true)
 * @returns {{ start: () => void, stop: () => void }} controls to start/stop manually
 */
export function usePolling(callback, options = {}) {
  const intervalMs = typeof options.intervalMs === 'number' ? options.intervalMs : 60000
  const immediate = options.immediate !== false
  const visibleOnly = options.visibleOnly !== false

  let timerId = null

  const clear = () => {
    if (timerId !== null) {
      clearInterval(timerId)
      timerId = null
    }
  }

  const tick = async () => {
    try {
      await callback()
    } catch (err) {
      // Swallow errors to keep polling stable; logging can be added by caller if needed
      // eslint-disable-next-line no-console
      console.debug('Polling tick error (ignored):', err?.message || err)
    }
  }

  const start = () => {
    clear()
    timerId = setInterval(tick, intervalMs)
  }

  const handleVisibility = () => {
    if (!visibleOnly) return
    if (document.hidden) {
      clear()
    } else {
      if (immediate) tick()
      start()
    }
  }

  onMounted(() => {
    if (visibleOnly && typeof document !== 'undefined') {
      document.addEventListener('visibilitychange', handleVisibility)
    }
    if (!visibleOnly || !document.hidden) {
      if (immediate) tick()
      start()
    }
  })

  onBeforeUnmount(() => {
    clear()
    if (visibleOnly && typeof document !== 'undefined') {
      document.removeEventListener('visibilitychange', handleVisibility)
    }
  })

  return { start, stop: clear }
}
