import { lazy, Suspense, useEffect } from "react"
import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom"
import { AboutPage } from "./pages/AboutPage"
import { DownloadPage } from "./pages/DownloadPage"
import { HomePage } from "./pages/HomePage"
import { NotFoundPage } from "./pages/NotFoundPage"

const LearnPage = lazy(() => import("./pages/LearnPage").then((module) => ({ default: module.LearnPage })))

function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) return
    window.scrollTo(0, 0)
  }, [pathname, hash])

  return null
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/download" element={<DownloadPage />} />
          <Route path="/learn" element={<Navigate to="/learn/en" replace />} />
          <Route path="/learn/:lang" element={<LearnPage />} />
          <Route path="/learn/:lang/:category" element={<LearnPage />} />
          <Route path="/learn/:lang/:category/:slug" element={<LearnPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default App
