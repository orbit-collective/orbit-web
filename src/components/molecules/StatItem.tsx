import { useCountUp } from "../../hooks/useCountUp"
import { useInView } from "../../hooks/useInView"

interface StatItemProps {
  value: number
  suffix?: string
  label: string
}

export function StatItem({ value, suffix = "", label }: StatItemProps) {
  const { ref, isInView } = useInView<HTMLDivElement>(0.6)
  const displayValue = useCountUp(value, isInView)

  return (
    <div ref={ref} className="text-center">
      <p className="text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
        {/* The counter starts at 0 for the animation; assistive tech gets the real number. */}
        <span aria-hidden="true">
          {displayValue}
          {suffix}
        </span>
        <span className="sr-only">
          {value}
          {suffix}
        </span>
      </p>
      <p className="mt-2 text-sm text-ink-muted">{label}</p>
    </div>
  )
}
