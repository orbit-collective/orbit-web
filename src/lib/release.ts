import release from "../generated/release.json"

export const FALLBACK_RELEASES_URL = "https://github.com/orbit-collective/orbit/releases/latest"

interface LatestRelease {
  version: string
  url: string
}

/** The latest Orbit release as of the last build, or undefined if it could not be looked up. */
export function getLatestRelease(): LatestRelease | undefined {
  const { version, url } = release as Partial<LatestRelease>
  return version && url ? { version, url } : undefined
}
