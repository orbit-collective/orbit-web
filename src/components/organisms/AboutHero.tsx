import { Reveal } from "../atoms/Reveal"

export function AboutHero() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-20 text-center md:py-28">
      <Reveal>
        <h1 className="text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
          About Orbit
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-ink-muted">
          Orbit started from a simple frustration: most issue trackers make you configure more
          than you ship. We wanted one place to plan a project, move issues through a workflow,
          and see progress add up, without the setup getting in the way of the work.
        </p>
      </Reveal>
    </section>
  )
}
