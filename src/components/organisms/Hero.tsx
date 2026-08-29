import { Button } from "../atoms/Button"
import { OrbitGraphic } from "./OrbitGraphic"

export function Hero() {
  return (
    <section className="mx-auto grid max-w-6xl items-center gap-16 px-6 py-20 md:grid-cols-2 md:py-28">
      <div>
        <h1 className="text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
          Plan the work. Track the progress. Ship with clarity.
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-muted">
          Orbit is an issue and project tracker for teams who want one clear place to plan
          projects, move issues through a workflow, and watch progress add up on a dashboard.
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-4">
          <Button href="#cta" size="md">
            Get started
          </Button>
          <Button href="#features" variant="secondary" size="md">
            Explore features
          </Button>
        </div>
      </div>

      <OrbitGraphic />
    </section>
  )
}
