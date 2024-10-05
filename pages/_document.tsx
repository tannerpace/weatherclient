import Document, { Html, Head, Main, NextScript } from "next/document"
import Script from "next/script"

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel="manifest" href="/manifest.json" />
          <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
          <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
          <meta name="theme-color" content="#000000" />
        </Head>
        <body>
          <Main />
          <NextScript />
          {/* Material Tailwind tooltip script */}
          <Script
            src="https://unpkg.com/@material-tailwind/html@latest/scripts/tooltip.js"
            strategy="afterInteractive"
          />
        </body>
      </Html>
    )
  }
}

export default MyDocument
