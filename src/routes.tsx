import { lazy } from "react"
import type { ReactNode } from "react"
import { Navigate, Route, Routes } from "react-router-dom"
import { AboutPage } from "./pages/AboutPage"
import { DownloadPage } from "./pages/DownloadPage"
import { HomePage } from "./pages/HomePage"
import { NotFoundPage } from "./pages/NotFoundPage"

// The docs chunk, plus the body of the page being opened, so the first render
// already has its article instead of showing an empty one while it loads.
const LazyLearnPage = lazy(async () => {
  const [{ LearnPage }, { preloadDocRoute }] = await Promise.all([
    import("./pages/LearnPage"),
    import("./lib/docs"),
  ])
  await preloadDocRoute(window.location.pathname)
  return { default: LearnPage }
})

interface AppRoutesProps {
  /** Override the /learn route's element (used by the prerender script, which
   * needs LearnPage rendered eagerly since renderToString can't await Suspense). */
  learnPageElement?: ReactNode
}

export function AppRoutes({ learnPageElement }: AppRoutesProps) {
  const learnElement = learnPageElement ?? <LazyLearnPage />

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/download" element={<DownloadPage />} />
      <Route path="/learn" element={<Navigate to="/learn/en" replace />} />
      <Route path="/learn/:lang" element={learnElement} />
      <Route path="/learn/:lang/:category" element={learnElement} />
      <Route path="/learn/:lang/:category/:slug" element={learnElement} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}
