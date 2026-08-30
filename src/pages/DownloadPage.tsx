import { Seo } from "../components/atoms/Seo"
import { DownloadTemplate } from "../components/templates/DownloadTemplate"

export function DownloadPage() {
  return (
    <>
      <Seo
        title="Download · Orbit"
        description="Download and self-host Orbit, free and open source. Runs anywhere Docker does — Linux, macOS, or Windows."
        path="/download"
      />
      <DownloadTemplate />
    </>
  )
}
