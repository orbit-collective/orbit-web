/*
 * Sample data for the app mockups. It mirrors the shape Orbit's own Storybook
 * fixtures use, so what the page shows is what the app renders for the same
 * data: the same colours, icons and names a fresh workspace starts with.
 */

export interface Person {
  id: number
  name: string
}

export interface IssueType {
  name: string
  icon: "Bug" | "SquareCheck" | "Rocket"
  color: string
}

export interface Status {
  name: string
  color: string
}

export interface Priority {
  name: string
  icon: "SignalHigh" | "SignalMedium" | "SignalLow"
  color: string
}

export interface Label {
  name: string
  color: string
}

export interface Issue {
  number: number
  title: string
  type: IssueType
  status: Status
  priority: Priority
  assignee: Person | null
  labels: Label[]
  updated: string
  closed?: boolean
}

export const people = {
  jane: { id: 1, name: "Jane Cooper" },
  marcus: { id: 2, name: "Marcus Lee" },
  priya: { id: 3, name: "Priya Patel" },
  tom: { id: 4, name: "Tom Becker" },
} satisfies Record<string, Person>

export const types = {
  task: { name: "Task", icon: "SquareCheck", color: "#2196f3" },
  bug: { name: "Bug", icon: "Bug", color: "#f44336" },
  epic: { name: "Epic", icon: "Rocket", color: "#9c27b0" },
} satisfies Record<string, IssueType>

export const statuses = {
  open: { name: "Open", color: "#f44336" },
  todo: { name: "To do", color: "#757575" },
  fixing: { name: "Fixing", color: "#8844da" },
  review: { name: "In review", color: "#ff9800" },
  done: { name: "Done", color: "#4caf50" },
} satisfies Record<string, Status>

export const priorities = {
  high: { name: "High", icon: "SignalHigh", color: "#f44336" },
  medium: { name: "Medium", icon: "SignalMedium", color: "#ff9800" },
  low: { name: "Low", icon: "SignalLow", color: "#4caf50" },
} satisfies Record<string, Priority>

export const labels = {
  bug: { name: "bug", color: "#4caf50" },
  feature: { name: "feature", color: "#f44336" },
  ux: { name: "ux", color: "#ffc107" },
  design: { name: "design", color: "#673ab7" },
  performance: { name: "performance", color: "#607d8b" },
  chore: { name: "chore", color: "#009688" },
} satisfies Record<string, Label>

export const issues: Issue[] = [
  {
    number: 12,
    title: "Fix login redirect after session timeout",
    type: types.bug,
    status: statuses.fixing,
    priority: priorities.high,
    assignee: people.marcus,
    labels: [labels.bug, labels.ux],
    updated: "2h ago",
  },
  {
    number: 13,
    title: "Add keyboard shortcuts to the issue board",
    type: types.task,
    status: statuses.todo,
    priority: priorities.medium,
    assignee: null,
    labels: [labels.feature],
    updated: "5h ago",
  },
  {
    number: 14,
    title: "Board column drag handle is not reachable by keyboard",
    type: types.bug,
    status: statuses.open,
    priority: priorities.high,
    assignee: people.marcus,
    labels: [labels.bug, labels.design],
    updated: "1d ago",
  },
  {
    number: 15,
    title: "Speed up the project list for workspaces with 10k issues",
    type: types.task,
    status: statuses.review,
    priority: priorities.low,
    assignee: people.priya,
    labels: [labels.performance],
    updated: "1d ago",
  },
  {
    number: 16,
    title: "Release 0.13 checklist",
    type: types.task,
    status: statuses.done,
    priority: priorities.medium,
    assignee: people.tom,
    labels: [labels.chore],
    updated: "2d ago",
    closed: true,
  },
  {
    number: 17,
    title: "Rework onboarding for new workspaces",
    type: types.epic,
    status: statuses.todo,
    priority: priorities.high,
    assignee: people.jane,
    labels: [labels.feature],
    updated: "3d ago",
  },
  {
    number: 18,
    title: "Preview dark and light in the accent colour picker",
    type: types.task,
    status: statuses.review,
    priority: priorities.low,
    assignee: people.priya,
    labels: [labels.design],
    updated: "4d ago",
  },
  {
    number: 19,
    title: "Notify reviewers when CI fails on a linked pull request",
    type: types.task,
    status: statuses.todo,
    priority: priorities.medium,
    assignee: people.marcus,
    labels: [labels.feature],
    updated: "4d ago",
  },
]
