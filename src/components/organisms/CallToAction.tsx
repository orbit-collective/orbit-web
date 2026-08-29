import { Button } from "../atoms/Button"
import { Reveal } from "../atoms/Reveal"

export function CallToAction() {
  return (
    <section id="cta" className="border-t border-line px-6 py-20 md:py-28">
      <Reveal className="mx-auto flex max-w-3xl flex-col items-center text-center">
        <h2 className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          Bring your team&apos;s work into one place
        </h2>
        <p className="mt-4 max-w-xl text-lg leading-relaxed text-ink-muted">
          Set up your first project in minutes and see how Orbit keeps planning, tracking, and
          reporting in sync.
        </p>
        <div className="mt-10">
          <Button size="md">Get started</Button>
        </div>
      </Reveal>
    </section>
  )
}
