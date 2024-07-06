"use client"

import React from "react"
import { useRouter } from "next/navigation"
import { Home, Person, Favorite } from "@mui/icons-material"

interface Route {
  path: string
  icon: JSX.Element
  label: string
}

const routes: Route[] = [
  {
    path: "/",
    icon: <Home />,
    label: "Home",
  },
  {
    path: "/profile",
    icon: <Person />,
    label: "Saved Locations",
  },
  {
    path: "/surfprofile",
    icon: <Favorite />,
    label: "Surf Profile",
  },
]

const BottomNavigationBar = () => {
  const router = useRouter()

  const handleNavigation = (path: string) => {
    router.push(path)
  }

  return (
    <div className="fixed bottom-0 w-full bg-white shadow-lg">
      <div className="flex justify-around py-2">
        {routes.map((route, index) => (
          <div
            key={index}
            className="flex flex-col items-center cursor-pointer"
            onClick={() => handleNavigation(route.path)}
          >
            {route.icon}
            <span className="text-xs text-gray-700">{route.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default BottomNavigationBar
