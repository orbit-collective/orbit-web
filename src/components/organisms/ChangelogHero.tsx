import { ExternalLink } from "lucide-react"
import { RELEASES_URL, countChanges } from "../../lib/changelog"
import type { Release } from "../../lib/changelog"
import { Button } from "../atoms/Button"
import { Reveal } from "../atoms/Reveal"

export function ChangelogHero({ releases }: { releases: Release[] }) {
  const changes = releases.reduce((total, release) => total + countChanges(release), 0)

  return (
    <section className="mx-auto max-w-[75rem] px-6 pt-20 pb-10 md:pt-28 md:pb-14">
      <Reveal eager className="max-w-2xl">
        <h1 className="text-4xl font-semibold tracking-tight text-ink sm:text-5xl">Changelog</h1>
        <p className="mt-6 text-lg leading-relaxed text-ink-muted">
          Every release of Orbit, straight from the repository: new features, fixes and performance
          work, as it ships.
        </p>
        {releases.length > 0 ? (
          <p className="mt-4 text-sm text-ink-muted">
            {releases.length} releases, {changes} changes, most recently v{releases[0].version}.
          </p>
        ) : null}
        <div className="mt-8">
          <Button href={RELEASES_URL} external variant="secondary" size="md">
            Releases on GitHub
            <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
          </Button>
        </div>
      </Reveal>
    </section>
  )
}
