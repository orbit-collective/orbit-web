import { issues } from "./data"
import { IssueCard } from "./BoardView"

/** Two issues as board cards: what a freshly captured issue looks like, with its status, labels and assignee. */
export function IssueCardsView() {
  return (
    <div className="flex h-full items-center justify-center gap-5 bg-[var(--bg-color)] p-6">
      {[issues[0], issues[2]].map((issue) => (
        <div key={issue.number} className="w-[336px]">
          <IssueCard issue={issue} />
        </div>
      ))}
    </div>
  )
}
