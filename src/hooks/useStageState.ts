import { useCallback, useSyncExternalStore } from "react"
import type { RefObject } from "react"

export type StageState = "idle" | "armed" | "playing" | "autoplay"

const stageOf = (element: Element | null) => element?.closest<HTMLElement>("[data-motion-root]") ?? null

/**
 * The state of the motion stage an element is in (see useMotionStage):
 * "idle" when there is none or reduced motion is on, then "armed" and
 * "playing"; "autoplay" for a stage that was already playing in the
 * prerendered HTML. It follows the stage's data-motion attribute, so an element can
 * react (a number counting up) without the stage re-rendering.
 */
export function useStageState(ref: RefObject<Element | null>): StageState {
  const subscribe = useCallback(
    (notify: () => void) => {
      const stage = stageOf(ref.current)
      if (!stage) return () => {}
      const observer = new MutationObserver(notify)
      observer.observe(stage, { attributes: true, attributeFilter: ["data-motion", "class"] })
      return () => observer.disconnect()
    },
    [ref],
  )

  const snapshot = useCallback(() => {
    const stage = stageOf(ref.current)
    if (!stage || !stage.classList.contains("m-on")) return "idle"
    if (stage.hasAttribute("data-motion-autoplay")) return "autoplay"
    return stage.dataset.motion === "playing" ? "playing" : "armed"
  }, [ref])

  return useSyncExternalStore(subscribe, snapshot, () => "idle" as StageState)
}
