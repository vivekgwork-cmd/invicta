import { useEffect, useRef, useState } from 'react'

/** Sticky offset so a hero taller than the viewport still scrolls its bottom (the proof strip)
 * into view before the next section slides over it: top = viewport height - hero height. */
export default function useStickyTop() {
  const ref = useRef(null)
  const [top, setTop] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const update = () => setTop(Math.min(0, window.innerHeight - el.offsetHeight))
    update()
    const ro = new ResizeObserver(update)
    ro.observe(el)
    window.addEventListener('resize', update)
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', update)
    }
  }, [])

  return [ref, top]
}
