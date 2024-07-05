import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Informed Dining- Allergy-Friendly Food Finder",
  description:
    "Find restaurants and food options that cater to your allergy needs.",
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
          content="Find restaurants and food options that cater to your allergy needs."
        />
        <meta
          name="keywords"
          content="allergy, food, restaurant, finder, health, management"
        />
        <meta name="author" content="Dine Safe Team" />
        <title>Informed Dining - Allergy-Friendly Food Finder</title>
      </head>
      <body className={inter.className}>
        <div id="__next">
          <main className="bg-teal-200">{children}</main>
        </div>
      </body>
    </html>
  )
}
