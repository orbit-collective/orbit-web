import type { CSSProperties } from "react"

/**
 * Sets the CSS variables the .m-* animation classes read: --i (place in a list),
 * --m-step, --m-cap, --m-base, --m-y, --m-to... Numbers are unitless, strings
 * carry their unit, e.g. { i: 2, step: "60ms", y: "16px" }.
 */
export function motionVars(vars: Record<string, string | number>): CSSProperties {
  const style: Record<string, string | number> = {}
  for (const [name, value] of Object.entries(vars)) {
    style[name === "i" ? "--i" : `--m-${name}`] = value
  }
  return style as CSSProperties
}
