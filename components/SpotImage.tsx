"use client"
import React from "react"
import Image from "next/image"
import { ActivitySpot } from "../app/api/mock"

interface SpotImageProps {
  spot: ActivitySpot
}

const SpotImage: React.FC<SpotImageProps> = ({ spot }) => {
  return (
    <div className="relative flex flex-col justify-center items-center w-full h-64 sm:h-80 md:h-96 lg:h-[500px] rounded-lg shadow-lg hover:shadow-blue-500 overflow-hidden">
      <Image
        src={spot?.location_img_url || "/default-image.jpg"}
        alt={spot?.name || "Kitesurf Spot"}
        layout="fill"
        objectFit="cover"
        quality={100}
        className="rounded-lg"
      />
    </div>
  )
}

export default SpotImage
