import { AboutHero } from "../organisms/AboutHero"
import { AboutValues } from "../organisms/AboutValues"
import { CallToAction } from "../organisms/CallToAction"
import { Footer } from "../organisms/Footer"
import { Navbar } from "../organisms/Navbar"

export function AboutTemplate() {
  return (
    <div className="min-h-screen bg-canvas">
      <Navbar />
      <main>
        <AboutHero />
        <AboutValues />
        <CallToAction buttonHref="/download" />
      </main>
      <Footer />
    </div>
  )
}
