"use client"

import React from "react"
import { Tab } from "./Tab"

export type Item = {
  text: string
  slug?: string
  segment?: string
  parallelRoutesKey?: string
  weatherUrl?: string
}

export const TabGroup = ({
  path,
  parallelRoutesKey,
  items,
}: {
  path: string
  parallelRoutesKey?: string
  items: Item[]
}) => {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {items.map((item) => (
        <Tab
          key={`${path}${item.slug}`}
          item={item}
          path={path}
          parallelRoutesKey={parallelRoutesKey}
        />
      ))}
    </div>
  )
}
