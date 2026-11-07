import { DatabaseBackup, Lock, Radio, RefreshCw, Server, Zap } from "lucide-react"
import { Reveal } from "../atoms/Reveal"
import { FeatureCard } from "../molecules/FeatureCard"

const benefits = [
  {
    icon: Lock,
    title: "Your data stays yours",
    description: "Every project, issue and comment lives on your own server, not a vendor's cloud.",
  },
  {
    icon: Server,
    title: "Deploy anywhere",
    description: "Run Orbit on the infrastructure your team already manages and trusts.",
  },
  {
    icon: RefreshCw,
    title: "Update on your schedule",
    description: "Upgrade when you're ready, not when a vendor decides to change something.",
  },
  {
    icon: DatabaseBackup,
    title: "Backups included",
    description:
      "The Docker stack takes integrity-checked snapshots of your database every hour, keeping a rolling history plus one copy per day.",
  },
  {
    icon: Zap,
    title: "Fast out of the box",
    description:
      "Redis caches the busiest pages, sessions and queues, so Orbit stays quick as your projects and teams grow.",
  },
  {
    icon: Radio,
    title: "Live, with a safety net",
    description:
      "A built-in WebSocket server pushes changes to open pages, and Orbit quietly falls back to polling if it is ever unavailable.",
  },
]

export function DownloadBenefits() {
  return (
    <section className="border-t border-line px-6 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal className="max-w-2xl">
          <h2 className="text-3xl font-semibold tracking-tight text-ink">Why self-hosted</h2>
          <p className="mt-4 text-lg leading-relaxed text-ink-muted">
            Running Orbit yourself means fewer trade-offs between control and convenience.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-4 sm:grid-cols-3">
          {benefits.map((benefit, index) => (
            <Reveal key={benefit.title} delay={(index % 3) * 80}>
              <FeatureCard {...benefit} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
