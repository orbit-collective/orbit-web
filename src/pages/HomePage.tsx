import { LandingTemplate } from "../components/templates/LandingTemplate"
import { useHashScroll } from "../hooks/useHashScroll"

export function HomePage() {
  useHashScroll()

  return <LandingTemplate />
}
