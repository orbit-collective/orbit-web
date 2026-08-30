import { execSync } from "node:child_process"
import { cpSync, existsSync, mkdtempSync, rmSync } from "node:fs"
import { tmpdir } from "node:os"
import { fileURLToPath } from "node:url"
import { dirname, join } from "node:path"

const REPO_URL = "https://github.com/orbit-collective/orbit.git"
const BRANCH = "master"

const projectRoot = dirname(dirname(fileURLToPath(import.meta.url)))
const dest = join(projectRoot, "src/content/docs")

const tmpDir = mkdtempSync(join(tmpdir(), "orbit-docs-"))

try {
  execSync(
    `git clone --depth 1 --branch ${BRANCH} --filter=blob:none --sparse ${REPO_URL} "${tmpDir}"`,
    { stdio: "inherit" },
  )
  execSync("git sparse-checkout set documentation", { cwd: tmpDir, stdio: "inherit" })

  if (existsSync(dest)) {
    rmSync(dest, { recursive: true, force: true })
  }

  cpSync(join(tmpDir, "documentation/en"), join(dest, "en"), { recursive: true })
  cpSync(join(tmpDir, "documentation/pl"), join(dest, "pl"), { recursive: true })

  console.log("Docs fetched into src/content/docs/")
} finally {
  rmSync(tmpDir, { recursive: true, force: true })
}
