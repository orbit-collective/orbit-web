import { useLayoutEffect, useRef } from "react"

interface MotionStageOptions {
  /** Already playing in the prerendered HTML, so it starts on first paint with no JavaScript. */
  autoplay?: boolean
  /** Whether the stage is the one being shown. Turning it on again replays it. */
  active?: boolean
  /**
   * How much of the stage must be on screen to play it. A stage taller than
   * the screen can never show 25 % of itself, so tall ones pass a smaller value.
   */
  threshold?: number
}

/**
 * Drives a "stage" of app mockup animations (see the .m-* rules in index.css).
 * The stage is armed (every element held at its first frame), then played when
 * it scrolls into view, and again each time `active` turns back on.
 *
 * The state lives in data-motion and the m-on class on the element itself, not
 * in React state, so animating never re-renders anything. Reduced motion
 * leaves the stage without m-on, which shows its finished state.
 */
export function useMotionStage<T extends HTMLElement>({ autoplay = false, active = true, threshold = 0.25 }: MotionStageOptions = {}) {
  const ref = useRef<T>(null)
  const isFirstRun = useRef(true)

  useLayoutEffect(() => {
    const element = ref.current
    if (!element) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    const firstRun = isFirstRun.current
    isFirstRun.current = false

    // The prerendered HTML is already playing; leave it to finish.
    if (autoplay && firstRun) return

    const arm = () => {
      // Removing and re-adding the class restarts animations that have already finished.
      element.classList.remove("m-on")
      void element.offsetWidth
      element.classList.add("m-on")
      element.dataset.motion = "armed"
    }

    arm()
    if (!active) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        element.dataset.motion = "playing"
        observer.disconnect()
      },
      { threshold },
    )
    observer.observe(element)
    return () => observer.disconnect()
  }, [autoplay, active, threshold])

  return ref
}
