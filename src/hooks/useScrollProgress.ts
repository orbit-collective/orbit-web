import { useEffect, useRef, useState } from "react"

export function useScrollProgress<T extends HTMLElement>() {
  const ref = useRef<T>(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    let frame: number

    const update = () => {
      const rect = node.getBoundingClientRect()
      const scrollableDistance = rect.height - window.innerHeight
      const scrolled = -rect.top
      const value = scrollableDistance > 0 ? scrolled / scrollableDistance : 0
      setProgress(Math.min(1, Math.max(0, value)))
    }

    const handleChange = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(update)
    }

    update()
    window.addEventListener("scroll", handleChange, { passive: true })
    window.addEventListener("resize", handleChange)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener("scroll", handleChange)
      window.removeEventListener("resize", handleChange)
    }
  }, [])

  return { ref, progress }
}
