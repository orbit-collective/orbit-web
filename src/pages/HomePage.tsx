import { Seo, SITE_URL } from "../components/atoms/Seo"
import { LandingTemplate } from "../components/templates/LandingTemplate"
import { useHashScroll } from "../hooks/useHashScroll"

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Orbit",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Linux, macOS, Windows (via Docker)",
  description:
    "Orbit is a self-hosted issue and project tracker: plan projects, track issues through a workflow, and see progress on a dashboard.",
  url: SITE_URL,
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
}

export function HomePage() {
  useHashScroll()

  return (
    <>
      <Seo
        title="Orbit — Self-hosted issue and project tracker"
        description="Orbit is an issue and project tracker: plan projects, track issues through a workflow, and see progress on a dashboard."
        path="/"
        jsonLd={jsonLd}
      />
      <LandingTemplate />
    </>
  )
}
