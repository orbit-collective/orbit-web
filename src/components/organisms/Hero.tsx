import { Button } from "../atoms/Button"
import { Reveal } from "../atoms/Reveal"
import { useParallax } from "../../hooks/useParallax"
import { OrbitGraphic } from "./OrbitGraphic"

export function Hero() {
  const parallaxOffset = useParallax(-0.08)

  return (
    <section className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-20 md:grid-cols-2 md:gap-16 md:py-28">
      <div>
        <Reveal eager>
          <h1 className="text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
            Plan the work. Track the progress. Ship with clarity.
          </h1>
        </Reveal>
        <Reveal eager delay={100}>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-muted">
            Orbit is an issue and project tracker for teams who want one clear place to plan
            projects, move issues through a workflow, and watch progress add up on a dashboard.
          </p>
        </Reveal>
        <Reveal eager delay={200}>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Button href="/download" size="md">
              Download Orbit
            </Button>
            <Button href="/about" variant="secondary" size="md">
              Read more
            </Button>
          </div>
        </Reveal>
      </div>

      <Reveal eager delay={150}>
        <div style={{ transform: `translateY(${parallaxOffset}px)` }}>
          <OrbitGraphic />
        </div>
      </Reveal>
    </section>
  )
}
