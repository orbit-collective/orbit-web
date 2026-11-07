import { BoardView } from "../app/BoardView"
import { DashboardView } from "../app/DashboardView"
import { IssueCardsView } from "../app/IssueCardsView"
import { PreviewStack } from "../app/PreviewStack"
import type { PreviewPanel } from "../app/PreviewStack"
import { ProjectCardsView } from "../app/ProjectCardsView"
import { DASHBOARD_SIZE, ISSUE_CARDS_SIZE, PROJECTS_SIZE } from "../app/sizes"

interface HowItWorksPreviewProps {
  activeIndex: number
}

// One real Orbit screen per step: the Projects page, a captured issue, the board, the dashboard.
const panels: PreviewPanel[] = [
  { label: "The Projects page in Orbit", ...PROJECTS_SIZE, view: <ProjectCardsView /> },
  { label: "Issues captured with a status, labels and an assignee", ...ISSUE_CARDS_SIZE, view: <IssueCardsView /> },
  { label: "The board, grouped by status", width: 740, height: 470, view: <BoardView groupBy="status" columns={2} /> },
  { label: "The dashboard's completion ratio and priority breakdown", ...DASHBOARD_SIZE, view: <DashboardView /> },
]

export function HowItWorksPreview({ activeIndex }: HowItWorksPreviewProps) {
  return <PreviewStack panels={panels} activeIndex={activeIndex} className="h-[26rem]" />
}
