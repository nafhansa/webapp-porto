import App from "@/components/app"
import { LoadingScreen } from "@/components/loading-screen"

export default function Home() {
  return (
    <>
      <LoadingScreen />
      <App />
    </>
  )
}

export const dynamic = 'auto'
