import { ActivityView } from "../app/ActivityView"
import { CommandPaletteView } from "../app/CommandPaletteView"
import { DevelopmentView } from "../app/DevelopmentView"
import { LiveIssueView } from "../app/LiveIssueView"
import { PreviewStack } from "../app/PreviewStack"
import type { PreviewPanel } from "../app/PreviewStack"
import { RolesView } from "../app/RolesView"
import {
  ACTIVITY_SIZE,
  DEVELOPMENT_SIZE,
  LIVE_SIZE,
  PALETTE_SIZE,
  ROLES_SIZE,
} from "../app/sizes"

interface DeepDivePreviewProps {
  activeIndex: number
}

// In the same order as the chapters in DeepDive.
const panels: PreviewPanel[] = [
  { label: "An issue page with teammates viewing and a warning about concurrent edits", ...LIVE_SIZE, view: <LiveIssueView /> },
  { label: "The command palette searching issues", ...PALETTE_SIZE, view: <CommandPaletteView /> },
  { label: "An issue's linked pull requests with CI and review status", ...DEVELOPMENT_SIZE, view: <DevelopmentView /> },
  { label: "The list of project roles and their permissions", ...ROLES_SIZE, view: <RolesView /> },
  { label: "The activity log of an issue", ...ACTIVITY_SIZE, view: <ActivityView /> },
]

export function DeepDivePreview({ activeIndex }: DeepDivePreviewProps) {
  return <PreviewStack panels={panels} activeIndex={activeIndex} className="h-[33rem]" />
}
