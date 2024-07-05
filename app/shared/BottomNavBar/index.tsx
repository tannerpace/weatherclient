"use client"

import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import HomeIcon from "@mui/icons-material/Home"
import SearchIcon from "@mui/icons-material/Search"
import FavoriteIcon from "@mui/icons-material/Favorite"
import PersonIcon from "@mui/icons-material/Person"

interface Route {
  path: string
  icon: JSX.Element
  label: string
}

const routes: Route[] = [
  { path: "/", icon: <HomeIcon />, label: "Home" },
  { path: "/app/search-restaurants", icon: <SearchIcon />, label: "Search" },
  { path: "/menu", icon: <FavoriteIcon />, label: "Menu" },
  { path: "/profile", icon: <PersonIcon />, label: "Profile" },
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
    isActive ? "text-white" : "text-gray-400"
  }`

  return (
    <button
      className={buttonClass}
      onClick={() => onClick(index)}
      aria-label={label}
    >
      {icon}
      <span className="text-xs">{label}</span>
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
    <div className="fixed bottom-0 w-full text-white shadow-md flex justify-around mb-2 bg-teal-400">
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
