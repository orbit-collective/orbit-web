import { AppFrame } from "../app/AppFrame"
import { AppShellView } from "../app/AppShellView"
import { ScaledFrame } from "../app/ScaledFrame"
import { SHELL_SIZE } from "../app/sizes"
import { Reveal } from "../atoms/Reveal"

/** The first real look at Orbit: the whole app, right under the headline. */
export function HeroShowcase() {
  return (
    <section className="px-6 pb-20 md:pb-28">
      <Reveal eager delay={300} className="mx-auto max-w-6xl">
        <AppFrame>
          <ScaledFrame
            {...SHELL_SIZE}
            label="Orbit's project board: the sidebar, the project header with its view tabs, and issues in columns by status"
            initialScale={1.04}
            minScale={0.62}
            autoplay
            // Wait for the frame around it to fade in (300 ms delay plus most of its 700 ms).
            delay="650ms"
          >
            <AppShellView />
          </ScaledFrame>
        </AppFrame>
      </Reveal>
    </section>
  )
}
