"use client"
import React from "react"
import { usePathname, useRouter } from "next/navigation"
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
  const pathname = usePathname()

  const handleNavigation = (path: string) => {
    router.push(path)
  }

  return (
    <div className="fixed bottom-0 w-full bg-white shadow-lg">
      <div className="flex justify-around py-2">
        {routes.map((route, index) => (
          <div
            key={index}
            className={`flex flex-col items-center cursor-pointer ${
              pathname === route.path ? "text-primary" : "text-gray-700"
            }`}
            onClick={() => handleNavigation(route.path)}
          >
            {route.icon}
            <span className="text-xs">{route.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default BottomNavigationBar
