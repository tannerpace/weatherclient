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
    icon: <Home fontSize="small" />,
    label: "Home",
  },
  {
    path: "/savedlocations",
    icon: <Person fontSize="small" />,
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
    <div className="fixed bottom-0 left-0 right-0 mt-2 bg-gray-900 text-white shadow-xl z-30 p-3 shadow-zinc-700">
      <div className="flex justify-around">
        {routes.map((route, index) => (
          <div
            key={index}
            className={`flex flex-col items-center justify-center space-y-1 cursor-pointer transition-colors duration-300 ${
              pathname === route.path ? "text-blue-500" : "text-gray-400"
            } hover:text-blue-400`}
            onClick={() => handleNavigation(route.path)}
          >
            {route.icon}
            <span
              className={`text-xs blur-none font-medium ${
                pathname === route.path ? "text-blue-500" : "text-gray-400"
              }`}
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
