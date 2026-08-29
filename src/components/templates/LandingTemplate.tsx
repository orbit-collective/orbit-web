import { CallToAction } from "../organisms/CallToAction"
import { Features } from "../organisms/Features"
import { Footer } from "../organisms/Footer"
import { Hero } from "../organisms/Hero"
import { Learn } from "../organisms/Learn"
import { Navbar } from "../organisms/Navbar"
import { Workflow } from "../organisms/Workflow"

export function LandingTemplate() {
  return (
    <div className="min-h-screen bg-canvas">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Workflow />
        <Learn />
        <CallToAction />
      </main>
      <Footer />
    </div>
  )
}
