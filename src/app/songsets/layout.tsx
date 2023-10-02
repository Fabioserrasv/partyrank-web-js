import { Suspense } from "react"
import { LoadingComponent } from "@/components/loading-component"

export default function SongsetsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Suspense fallback={<LoadingComponent />}>
          {children}
      </Suspense>
    </>
  )
}