import { CallToAction } from "../organisms/CallToAction"
import { DownloadBenefits } from "../organisms/DownloadBenefits"
import { DownloadHero } from "../organisms/DownloadHero"
import { Footer } from "../organisms/Footer"
import { Navbar } from "../organisms/Navbar"

export function DownloadTemplate() {
  return (
    <div className="min-h-screen bg-canvas">
      <Navbar />
      <main>
        <DownloadHero />
        <DownloadBenefits />
        <CallToAction
          title="Ready when you are"
          description="Grab the latest release and have Orbit running in minutes."
          buttonLabel="Download latest release"
          buttonHref={"https://github.com/orbit-collective/orbit/releases/latest"}
        />
      </main>
      <Footer />
    </div>
  )
}
