import { Target, Unlock, Zap } from "lucide-react"
import { Reveal } from "../atoms/Reveal"
import { FeatureCard } from "../molecules/FeatureCard"

const values = [
  {
    icon: Target,
    title: "Focused",
    description:
      "Every screen exists to answer one question: what should the team do next. Nothing gets added just because it can be.",
  },
  {
    icon: Zap,
    title: "Fast",
    description:
      "Triaging issues and reading a dashboard should never feel like waiting. Orbit is built to stay quick as your data grows.",
  },
  {
    icon: Unlock,
    title: "Open",
    description:
      "Self-hosted by default. Your issues, your projects and your history stay on your own infrastructure.",
  },
]

export function AboutValues() {
  return (
    <section className="border-t border-line px-6 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal className="max-w-2xl">
          <h2 className="text-3xl font-semibold tracking-tight text-ink">What we care about</h2>
          <p className="mt-4 text-lg leading-relaxed text-ink-muted">
            A short list of principles that shape every decision we make about Orbit.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-4 sm:grid-cols-3">
          {values.map((value, index) => (
            <Reveal key={value.title} delay={index * 80}>
              <FeatureCard {...value} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
