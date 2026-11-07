import { Button } from "../atoms/Button"
import { Reveal } from "../atoms/Reveal"
import { CopyCommand } from "../molecules/CopyCommand"

interface CallToActionProps {
  title?: string
  description?: string
  buttonLabel?: string
  buttonHref?: string
}

export function CallToAction({
  title = "Bring your team's work into one place",
  description = "Set up your first project in minutes and see how Orbit keeps planning, tracking, and reporting in sync.",
  buttonLabel = "Download Orbit",
  buttonHref,
}: CallToActionProps) {
  return (
    <section id="cta" className="scroll-mt-16 border-t border-line px-6 py-20 md:py-28">
      <Reveal className="mx-auto flex max-w-3xl flex-col items-center text-center">
        <h2 className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl">{title}</h2>
        <p className="mt-4 max-w-xl text-lg leading-relaxed text-ink-muted">{description}</p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Button href={buttonHref} size="md">
            {buttonLabel}
          </Button>
          <Button href="https://github.com/orbit-collective/orbit" external variant="secondary" size="md">
            View on GitHub
          </Button>
        </div>
        <CopyCommand
          className="mt-8"
          command="git clone https://github.com/orbit-collective/orbit.git && cd orbit && make setup"
        />
      </Reveal>
    </section>
  )
}
