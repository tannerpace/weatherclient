"use client"

import React, { useEffect, useState } from "react"
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

interface NavButtonProps {
  index: number
  value: number
  onClick: (index: number) => void
  icon: JSX.Element
  label: string
}

const NavButton: React.FC<NavButtonProps> = ({
  index,
  value,
  onClick,
  icon,
  label,
}) => {
  const isActive = value === index
  const buttonClass = `flex flex-col items-center py-2 ${
    isActive ? "text-blue-500" : "text-gray-400"
  } hover:text-blue-300 transition duration-200 ease-in-out`

  return (
    <button
      className={buttonClass}
      onClick={() => onClick(index)}
      aria-label={label}
    >
      {icon}
      <span className="text-xs mt-1">{label}</span>
    </button>
  )
}

const BottomNavBar: React.FC = () => {
  const router = useRouter()
  const [value, setValue] = useState(0)

  useEffect(() => {
    const path = window.location.pathname
    const index = routes.findIndex((route) => route.path === path)
    if (index !== -1) {
      setValue(index)
    }
  }, [])

  const handleNavigation = (index: number) => {
    setValue(index)
    router.push(routes[index].path)
  }

  return (
    <div className="fixed bottom-0 w-full bg-gray-900 text-white shadow-md flex justify-around py-2 rounded-t-lg border-t border-gray-700">
      {routes.map((route, index) => (
        <NavButton
          key={index}
          index={index}
          value={value}
          onClick={handleNavigation}
          icon={route.icon}
          label={route.label}
        />
      ))}
    </div>
  )
}

export default BottomNavBar
