import { useEffect, useRef, useState } from "react"
import { useStageState } from "../../hooks/useStageState"

const DURATION_MS = 800

/** cubic-bezier(0.22, 1, 0.36, 1), the app's ease, solved for time -> progress. */
function ease(t: number): number {
  const [x1, y1, x2, y2] = [0.22, 1, 0.36, 1]
  const bezier = (a: number, b: number, u: number) => 3 * a * (1 - u) ** 2 * u + 3 * b * (1 - u) * u ** 2 + u ** 3
  let low = 0
  let high = 1
  for (let i = 0; i < 24; i++) {
    const mid = (low + high) / 2
    if (bezier(x1, x2, mid) < t) low = mid
    else high = mid
  }
  return bezier(y1, y2, (low + high) / 2)
}

interface CountUpProps {
  value: number
  /** Milliseconds to wait once the stage starts playing. */
  delay?: number
  suffix?: string
}

/**
 * A number that counts up to its value, like the app's AnimatedNumber. It
 * shows the real value until its stage is armed, then 0, then counts when the
 * stage plays; with no stage or with reduced motion it simply shows the value.
 */
export function CountUp({ value, delay = 0, suffix = "" }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const state = useStageState(ref)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // An "autoplay" stage is already on screen when the page hydrates; counting then would reset a number people can see.
    if (state !== "playing") return

    let frame = 0
    let start = 0
    const tick = (now: number) => {
      start ||= now
      const elapsed = now - start - delay
      setProgress(elapsed <= 0 ? 0 : ease(Math.min(1, elapsed / DURATION_MS)))
      if (elapsed < DURATION_MS) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [state, delay])

  useEffect(() => {
    // Back to the first frame whenever the stage is armed again, ready for the next play.
    if (state !== "armed") return
    const frame = requestAnimationFrame(() => setProgress(0))
    return () => cancelAnimationFrame(frame)
  }, [state])

  const shown = state === "armed" ? 0 : state === "playing" ? Math.round(value * progress) : value

  return (
    <span ref={ref}>
      {shown}
      {suffix}
    </span>
  )
}
