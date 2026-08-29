import { useEffect } from "react"
import { useLocation } from "react-router-dom"

export function useHashScroll() {
  const { hash } = useLocation()

  useEffect(() => {
    if (!hash) return
    const id = hash.slice(1)
    const el = document.getElementById(id)
    el?.scrollIntoView({ behavior: "smooth", block: "start" })
  }, [hash])
}
