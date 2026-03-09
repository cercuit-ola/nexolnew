'use client'
import { useEffect, useRef } from 'react'

/**
 * Attaches an IntersectionObserver to the returned ref.
 * When the element enters the viewport, the class `visible`
 * is added — triggering the CSS reveal animation defined in globals.css.
 *
 * @param {number} delay  Optional transition-delay in seconds (e.g. 0.12)
 */
export function useReveal(delay = 0) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    el.classList.add('reveal-el')
    if (delay) el.style.transitionDelay = `${delay}s`

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('visible')
          obs.disconnect()
        }
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    )

    obs.observe(el)
    return () => obs.disconnect()
  }, [delay])

  return ref
}
