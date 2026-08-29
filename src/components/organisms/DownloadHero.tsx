import { Button } from "../atoms/Button"
import { Reveal } from "../atoms/Reveal"

export function DownloadHero() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-20 text-center md:py-28">
      <Reveal>
        <h1 className="text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
          Run Orbit on your own infrastructure
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-ink-muted">
          Orbit is self-hosted by design. Deploy it on your own server and keep every project and
          issue on infrastructure you control, not someone else&apos;s.
        </p>
        <div className="mt-10">
          <Button size="md" href={"https://github.com/orbit-collective/orbit/releases/latest"}>Download latest release</Button>
        </div>
      </Reveal>
    </section>
  )
}
