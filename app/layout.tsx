import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Kitesurf Ninja - Find Your Perfect Kitesurf Spot",
  description:
    "Discover the best kitesurfing spots and get real-time weather updates.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
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
        <title>Kitesurf Ninja - Find Your Perfect Kitesurf Spot</title>
      </head>
      <body className={inter.className}>
        <div id="__next">
          <main className="bg-slate-400">{children}</main>
        </div>
      </body>
    </html>
  )
}
