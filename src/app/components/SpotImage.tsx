"use client"
import React from "react"
import Image from "next/image"
import { KitesurfSpot } from "../../../mock"

interface SpotImageProps {
  spot: KitesurfSpot
}

const SpotImage: React.FC<SpotImageProps> = ({ spot }) => {
  return (
    <div className="relative flex flex-col justify-center items-center w-full min-h-[500px] h-full rounded-lg shadow-lg hover:shadow-blue-500 overflow-hidden">
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
