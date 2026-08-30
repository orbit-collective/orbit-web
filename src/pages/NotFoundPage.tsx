import { useLocation } from "react-router-dom"
import { Seo } from "../components/atoms/Seo"
import { Button } from "../components/atoms/Button"
import { Footer } from "../components/organisms/Footer"
import { Navbar } from "../components/organisms/Navbar"

export function NotFoundPage() {
  const { pathname } = useLocation()

  return (
    <div className="flex min-h-screen flex-col bg-canvas">
      <Seo
        title="Page not found · Orbit"
        description="The page you're looking for doesn't exist or has moved."
        path={pathname}
        noindex
      />
      <Navbar />
      <main className="flex flex-1 flex-col items-center justify-center px-6 py-20 text-center">
        <p className="text-sm font-medium text-ink-muted">404</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          This page drifted out of orbit
        </h1>
        <p className="mt-4 max-w-md text-lg leading-relaxed text-ink-muted">
          The page you&apos;re looking for doesn&apos;t exist or has moved.
        </p>
        <Button href="/" className="mt-10">
          Back to home
        </Button>
      </main>
      <Footer />
    </div>
  )
}
