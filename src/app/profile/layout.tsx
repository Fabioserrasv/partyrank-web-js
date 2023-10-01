import { Suspense } from "react"
import { LoadingComponent } from "../components/loading-component"

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Suspense fallback={<LoadingComponent />}>
      {children}
    </Suspense>
  )
}