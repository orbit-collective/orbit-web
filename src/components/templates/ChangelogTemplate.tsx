import { releases } from "../../lib/changelog"
import { ChangelogHero } from "../organisms/ChangelogHero"
import { ChangelogIndex } from "../organisms/ChangelogIndex"
import { ChangelogRelease } from "../organisms/ChangelogRelease"
import { Footer } from "../organisms/Footer"
import { Navbar } from "../organisms/Navbar"

export function ChangelogTemplate() {
  return (
    <div className="min-h-screen bg-canvas">
      <Navbar />
      <main id="main-content" tabIndex={-1} className="outline-none">
        <ChangelogHero releases={releases} />
        {releases.length > 0 ? (
          <div className="mx-auto flex max-w-[75rem] gap-12 px-6 pb-24">
            <ChangelogIndex releases={releases} />
            <div className="min-w-0 flex-1">
              {releases.map((release, index) => (
                <ChangelogRelease key={release.version} release={release} isLatest={index === 0} />
              ))}
            </div>
          </div>
        ) : (
          <p className="mx-auto max-w-[75rem] px-6 pb-24 text-ink-muted">
            The changelog could not be loaded. It is always on{" "}
            <a className="text-ink underline" href="https://github.com/orbit-collective/orbit/blob/master/CHANGELOG.md">
              GitHub
            </a>
            .
          </p>
        )}
      </main>
      <Footer />
    </div>
  )
}
