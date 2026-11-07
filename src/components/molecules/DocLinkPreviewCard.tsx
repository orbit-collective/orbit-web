interface DocLinkPreviewCardProps {
  id: string
  eyebrow?: string
  title: string
  description: string
}

export function DocLinkPreviewCard({ id, eyebrow, title, description }: DocLinkPreviewCardProps) {
  return (
    <span
      id={id}
      role="tooltip"
      className="not-prose pointer-events-none absolute left-0 max-sm:hidden [@media(hover:none)]:hidden top-full z-50 mt-2 w-72 max-w-[80vw] origin-top-left scale-95 rounded-lg border border-line-strong bg-canvas-hover p-4 text-left opacity-0 shadow-lg shadow-black/40 transition-all duration-150 ease-out group-hover:pointer-events-auto group-hover:scale-100 group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:scale-100 group-focus-within:opacity-100"
    >
      {eyebrow ? <span className="block text-xs font-medium text-ink-muted">{eyebrow}</span> : null}
      <span className="mt-1 block text-sm font-semibold text-ink">{title}</span>
      {description ? (
        <span className="mt-1.5 block text-xs leading-relaxed text-ink-muted">{description}</span>
      ) : null}
    </span>
  )
}
