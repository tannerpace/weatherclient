import React from "react"

interface CardProps {
  title: string
  children: React.ReactNode
}

const Card: React.FC<CardProps> = ({ title, children }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-4 mb-4 w-full">
      <div className="flex items-center">
        <h2 className="text-xl font-bold text-gray-800 flex-grow">{title}</h2>
        <div className="text-gray-600">{children}</div>
      </div>
    </div>
  )
}

export default Card
