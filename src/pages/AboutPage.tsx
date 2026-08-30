import { Seo } from "../components/atoms/Seo"
import { AboutTemplate } from "../components/templates/AboutTemplate"

export function AboutPage() {
  return (
    <>
      <Seo
        title="About · Orbit"
        description="Why we built Orbit: a focused, fast, self-hosted issue and project tracker, and the principles behind it."
        path="/about"
      />
      <AboutTemplate />
    </>
  )
}
