import { AppFrame } from "../app/AppFrame"
import { BoardView } from "../app/BoardView"
import { ScaledFrame } from "../app/ScaledFrame"
import { Reveal } from "../atoms/Reveal"

export function AboutPreview() {
  return (
    <section className="border-t border-line px-6 py-20 md:py-28">
      <Reveal className="mx-auto max-w-5xl">
        <AppFrame>
          <ScaledFrame
            width={1100}
            height={640}
            label="Orbit's board, with issues grouped by status"
            initialScale={0.9}
            minScale={0.62}
          >
            <BoardView groupBy="status" />
          </ScaledFrame>
        </AppFrame>
      </Reveal>
    </section>
  )
}
