import type { Metadata } from "next"
import { Inter } from "next/font/google"
import Head from "next/head"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Kitesurf Ninja",
  description: "Your ultimate kitesurfing guide",
}

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  return (
    <html lang="en">
      <Head>
        <title>Kitesurf Ninja</title>
        <meta name="description" content={metadata.description ?? undefined} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body className={inter.className}>
        <header>
          <nav>
            <ul>
              <li>
                <a href="/">Home</a>
              </li>
              <li>
                <a href="/about">About</a>
              </li>
              <li>
                <a href="/contact">Contact</a>
              </li>
              <li>
                <a href="/blog">Blog</a>
              </li>
            </ul>
          </nav>
        </header>
        <main>{children}</main>
        <footer>
          <p>
            &copy; {new Date().getFullYear()} Kitesurf Ninja. All rights
            reserved.
          </p>
        </footer>
      </body>
    </html>
  )
}

export default RootLayout
