import { useState } from "react"
import { cn } from "../../lib/cn"
import { MockupFrame } from "../atoms/MockupFrame"
import { Reveal } from "../atoms/Reveal"

const platforms = [
  {
    name: "Linux",
    installCmd: "curl -fsSL https://get.docker.com | sh",
    badge: "Recommended",
  },
  { name: "macOS", installCmd: "brew install --cask docker" },
  {
    name: "Windows",
    installCmd: "winget install Docker.DockerDesktop",
    badge: "WSL recommended",
  },
]

export function DownloadPlatforms() {
  const [activeIndex, setActiveIndex] = useState(0)
  const active = platforms[activeIndex]

  return (
    <section className="border-t border-line px-6 py-20 md:py-28">
      <div className="mx-auto max-w-3xl">
        <Reveal className="text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-ink">
            Runs anywhere Docker does
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-ink-muted">
            Orbit ships as a container, so the host operating system is entirely up to you.
          </p>
        </Reveal>

        <Reveal delay={100} className="mt-14">
          <div
            role="tablist"
            aria-label="Host operating system"
            className="mx-auto flex w-full max-w-sm items-center justify-center gap-1 rounded-full border border-line bg-surface p-1"
          >
            {platforms.map((platform, index) => (
              <div key={platform.name} className="relative flex-1">
                {platform.badge ? (
                  <span className="absolute -top-6 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-line-strong bg-canvas-hover px-2 py-0.5 text-[10px] font-medium text-ink-muted">
                    {platform.badge}
                  </span>
                ) : null}
                <button
                  type="button"
                  role="tab"
                  aria-selected={index === activeIndex}
                  onClick={() => setActiveIndex(index)}
                  className={cn(
                    "w-full cursor-pointer rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200 ease-in-out",
                    index === activeIndex
                      ? "bg-accent text-accent-ink"
                      : "text-ink-muted hover:text-ink",
                  )}
                >
                  {platform.name}
                </button>
              </div>
            ))}
          </div>

          <MockupFrame className="mx-auto mt-6 max-w-lg text-left">
            <div className="flex flex-col gap-2 px-5 py-5 font-mono text-[13px] leading-relaxed">
              <p className="text-ink-muted">
                <span className="text-accent">$</span> {active.installCmd}
              </p>
              <p className="text-ink-muted">
                <span className="text-accent">$</span> git clone
                https://github.com/orbit-collective/orbit.git
              </p>
              <p className="text-ink-muted">
                <span className="text-accent">$</span> docker compose up -d
              </p>
              <p className="text-ink-muted">Starting orbit_app ... done</p>
            </div>
          </MockupFrame>
        </Reveal>
      </div>
    </section>
  )
}
