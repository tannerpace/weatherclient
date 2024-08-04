import { Metadata } from "next"
import { Inter } from "next/font/google"
import React, { ReactNode } from "react"
import Head from "next/head"
import "./globals.css"

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
      <Head>
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
        <title>Windy Session – Find Your Perfect Kitesurf Spot</title>
      </Head>
      <body className={inter.className}>
        <div id="__next">
          <main>{children}</main>
        </div>
      </body>
    </html>
  )
}
