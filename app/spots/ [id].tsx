// File: app/spots/[id].tsx
"use client"

import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import BottomNavBar from "../shared/BottomNavBar"

const SpotPage: React.FC = () => {
  const router = useRouter()
  const [spotId, setSpotId] = useState<string | null>(null)

  useEffect(() => {
    if (router.isReady) {
      const { id } = router.query
      if (typeof id === "string") {
        setSpotId(id)
      }
    }
  }, [router.isReady, router.query])

  return (
    <main>
      SPOT PAGE
      <div>Spot ID: {spotId}</div>
      <BottomNavBar />
    </main>
  )
}

export default SpotPage
