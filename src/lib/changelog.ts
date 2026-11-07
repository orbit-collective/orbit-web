import data from "../generated/changelog.json"

export interface ChangeCommit {
  hash: string
  url: string
}

export interface Change {
  scope?: string
  text: string
  commits: ChangeCommit[]
}

export interface ReleaseSection {
  title: string
  changes: Change[]
}

export interface Release {
  version: string
  date: string
  compareUrl?: string
  sections: ReleaseSection[]
}

/** Newest first, as the file is written. */
export const releases = data as Release[]

export const CHANGELOG_URL = "https://github.com/orbit-collective/orbit/blob/master/CHANGELOG.md"
export const RELEASES_URL = "https://github.com/orbit-collective/orbit/releases"

/** The element id of a release: "0.13.1" -> "v0-13-1". */
export function releaseId(version: string): string {
  return `v${version.replace(/\./g, "-")}`
}

export function countChanges(release: Release): number {
  return release.sections.reduce((total, section) => total + section.changes.length, 0)
}

/** "2026-11-07" -> "7 Nov 2026", fixed to UTC and English so the prerender and the browser agree. */
export function formatReleaseDate(date: string): string {
  return new Date(`${date}T00:00:00Z`).toLocaleDateString("en-GB", {
    timeZone: "UTC",
    day: "numeric",
    month: "short",
    year: "numeric",
  })
}
