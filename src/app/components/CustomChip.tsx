// "use client"
// import React from "react"
// import { AllergenType, allergenColors } from "./AllergenFilter"

// interface CustomChipProps {
//   label: string
//   icon: JSX.Element
//   selected: boolean
//   onClick: () => void
//   value: AllergenType
// }

// const CustomChip: React.FC<CustomChipProps> = ({
//   label,
//   icon,
//   selected,
//   onClick,
//   value,
// }) => {
//   return (
//     <div
//       className={`flex place-items-center rounded-sm cursor-pointer border-r-2${
//         selected ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"
//       }`}
//       style={{
//         backgroundColor: selected ? allergenColors[value] : undefined,
//         opacity: selected ? 1 : 0.8,
//         borderRadius: "3rem",
//       }}
//       onClick={onClick}
//     >
//       <div className="flex-shrink-0 mt-1">{icon}</div>
//       <div className="text-sm mb-1">{label}</div>
//     </div>
//   )
// }

// export default CustomChip
