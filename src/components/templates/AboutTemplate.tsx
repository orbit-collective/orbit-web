import { AboutHero } from "../organisms/AboutHero"
import { AboutPreview } from "../organisms/AboutPreview"
import { AboutTimeline } from "../organisms/AboutTimeline"
import { AboutValues } from "../organisms/AboutValues"
import { CallToAction } from "../organisms/CallToAction"
import { Footer } from "../organisms/Footer"
import { Navbar } from "../organisms/Navbar"
import { Stats } from "../organisms/Stats"

export function AboutTemplate() {
  return (
    <div className="min-h-screen bg-canvas">
      <Navbar />
      <main>
        <AboutHero />
        <AboutPreview />
        <Stats />
        <AboutTimeline />
        <AboutValues />
        <CallToAction buttonHref="/download" />
      </main>
      <Footer />
    </div>
  )
}
