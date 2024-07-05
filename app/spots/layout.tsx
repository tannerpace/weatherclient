"use client"
import { TabGroup } from "@/components/TabGroup"
import React from "react"

export default function Layout({ children }: { children: React.ReactNode }) {
  const ids = [{ id: "1" }, { id: "2" }, { id: "3" }]

  return (
    <div className="space-y-9">
      <TabGroup
        path="/spots"
        items={[
          {
            text: "Home",
          },
          ...ids.map((x) => ({
            text: `spots ${x.id}`,
            slug: x.id,
          })),
        ]}
      />

      <div>{children}</div>
    </div>
  )
}
