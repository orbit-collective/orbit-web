import { Seo } from "../components/atoms/Seo"
import { ChangelogTemplate } from "../components/templates/ChangelogTemplate"
import { useHashScroll } from "../hooks/useHashScroll"

export function ChangelogPage() {
  useHashScroll()

  return (
    <>
      <Seo
        title="Changelog · Orbit"
        description="Every Orbit release: new features, bug fixes and performance work, straight from the repository's changelog."
        path="/changelog"
      />
      <ChangelogTemplate />
    </>
  )
}
