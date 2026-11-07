import { useEffect, useRef } from "react"

/**
 * Moves an element at `speed` times the scroll distance. The transform is
 * written straight to the element, so scrolling never re-renders React.
 * Stops once the page has scrolled well past the first screen.
 */
export function useParallax<T extends HTMLElement>(speed: number) {
  const ref = useRef<T>(null)

  useEffect(() => {
    const node = ref.current
    if (!node) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    let frame = 0

    const update = () => {
      const offset = Math.min(window.scrollY, window.innerHeight * 1.5) * speed
      node.style.transform = `translate3d(0, ${offset}px, 0)`
    }

    const onScroll = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(update)
    }

    update()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener("scroll", onScroll)
    }
  }, [speed])

  return ref
}
