import type { CSSProperties } from "react"

type MotionVars = {
  /** Place in a list: the delay is this times `step`, up to `cap`. */
  i?: number
  step?: string
  cap?: number
  /** A fixed delay added to everything else. */
  base?: string
  /** How far a .m-rise element travels. */
  y?: string
  /** The final height, width or ring offset of .m-bar-h, .m-bar-w and .m-draw. */
  to?: string
  from?: string
}

const DEFAULTS = { i: 0, step: "30ms", cap: 10, base: "0ms", y: "8px" } as const

/**
 * Sets the CSS variables the .m-* animation classes read. Custom properties
 * inherit, so a card inside a column would otherwise pick up the column's
 * step and offset: every call therefore sets all of the timing ones, falling
 * back to the app's defaults (30 ms step, cap 10, 8 px).
 */
export function motionVars(vars: MotionVars = {}): CSSProperties {
  const merged = { ...DEFAULTS, ...vars }
  const style: Record<string, string | number> = {
    "--i": merged.i,
    "--m-step": merged.step,
    "--m-cap": merged.cap,
    "--m-base": merged.base,
    "--m-y": merged.y,
  }
  if (vars.to !== undefined) style["--m-to"] = vars.to
  if (vars.from !== undefined) style["--m-from"] = vars.from
  return style as CSSProperties
}
