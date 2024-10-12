"use client"
import React from "react"
import { usePathname, useRouter } from "next/navigation"
import { Home, Person } from "@mui/icons-material"

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
    path: "/savedlocations",
    icon: <Person />,
    label: "Edit Locations",
  },
]

const BottomNavigationBar = () => {
  const router = useRouter()
  const pathname = usePathname()

  const handleNavigation = (path: string) => {
    router.push(path)
  }

  return (
    <div className="fixed bottom-0 w-full bg-black shadow-lg z-30 p-2">
      <div className="flex justify-around">
        {routes.map((route, index) => (
          <div
            key={index}
            className={`flex flex-col items-center cursor-pointer ${
              pathname === route.path ? "text-primary" : "text-gray-700"
            }`}
            onClick={() => handleNavigation(route.path)}
          >
            {route.icon}
            <span
              className="text-xs"
              style={{
                color:
                  pathname === route.path
                    ? "var(--primary-color)"
                    : "var(--text-color)",
              }}
            >
              {route.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default BottomNavigationBar
