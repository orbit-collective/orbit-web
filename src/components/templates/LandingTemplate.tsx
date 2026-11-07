import { CallToAction } from "../organisms/CallToAction"
import { DeepDive } from "../organisms/DeepDive"
import { Features } from "../organisms/Features"
import { Footer } from "../organisms/Footer"
import { Hero } from "../organisms/Hero"
import { HowItWorks } from "../organisms/HowItWorks"
import { Learn } from "../organisms/Learn"
import { Navbar } from "../organisms/Navbar"
import { Stats } from "../organisms/Stats"
import { Workflow } from "../organisms/Workflow"

export function LandingTemplate() {
  return (
    <div className="min-h-screen bg-canvas">
      <Navbar />
      <main id="main-content" tabIndex={-1} className="outline-none">
        <Hero />
        <Stats />
        <Features />
        <HowItWorks />
        <Workflow />
        <DeepDive />
        <Learn />
        <CallToAction buttonHref="/download" />
      </main>
      <Footer />
    </div>
  )
}
