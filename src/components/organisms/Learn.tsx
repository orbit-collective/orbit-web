import { BookOpen, Compass, Rocket } from "lucide-react"
import { Reveal } from "../atoms/Reveal"
import { FeatureCard } from "../molecules/FeatureCard"

const resources = [
  {
    icon: Rocket,
    title: "Getting started",
    description: "Set up your first project and invite your team in a few short steps.",
  },
  {
    icon: Compass,
    title: "Best practices",
    description: "Learn how well organized teams structure projects, labels and workflows.",
  },
  {
    icon: BookOpen,
    title: "Guides",
    description: "Walkthroughs for the dashboard, saved filters, and every issue view.",
  },
]

export function Learn() {
  return (
    <section id="learn" className="border-t border-line px-6 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal className="max-w-2xl">
          <h2 className="text-3xl font-semibold tracking-tight text-ink">
            Learn how to get the most out of Orbit
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-ink-muted">
            Guides and resources to help your team set up projects the right way from day one.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {resources.map((resource, index) => (
            <Reveal key={resource.title} delay={index * 80}>
              <FeatureCard {...resource} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
