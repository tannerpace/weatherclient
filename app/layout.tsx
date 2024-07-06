import { Metadata } from "next"
import { Inter } from "next/font/google"
import React, { ReactNode } from "react"
import "./globals.css"
import Navbar from "@/components/NavBar"
import BottomNavBar from "./shared/BottomNavBar"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Kitesurf Ninja Find Your Perfect Kitesurf Spot",
  description:
    "Discover the best kitesurfing spots and get real-time weather updates.",
}

interface RootLayoutProps {
  children: ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="description"
          content="Discover the best kitesurfing spots and get real-time weather updates."
        />
        <meta
          name="keywords"
          content="kitesurf, kitesurfing, spots, weather, wind, surfing, kite"
        />
        <meta name="author" content="Kitesurf Ninja Team" />
        <title>Kitesurf Ninja – Find Your Perfect Kitesurf Spot</title>
      </head>
      <body className={inter.className}>
        <div id="__next">
          <main className="bg-slate-900 flex-1">{children}</main>
          <BottomNavBar />
        </div>
      </body>
    </html>
  )
}
