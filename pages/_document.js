import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  const meta = {
    title: 'Tanner Bleakley - Full-Stack Developer & Drone Enthusiast',
    description: 'Explore the portfolio and blog of Tanner Bleakley, a full-stack developer with a passion for kitesurfing, drone technology, and creating dynamic web experiences.',
    image: 'https://your-image-url.com/your-portfolio-image.jpg',
    twitterHandle: '@boyashaka83',
    siteUrl: 'https://tannerb.dev'
  }

  return (
    <Html lang="en">
      <Head>
        <meta name="robots" content="follow, index" />
        <meta name="description" content={meta.description} />
        <meta property="og:site_name" content={meta.title} />
        <meta property="og:description" content={meta.description} />
        <meta property="og:title" content={meta.title} />
        <meta property="og:image" content={meta.image} />
        <meta property="og:url" content={meta.siteUrl} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content={meta.twitterHandle} />
        <meta name="twitter:title" content={meta.title} />
        <meta name="twitter:description" content={meta.description} />
        <meta name="twitter:image" content={meta.image} />
        <link rel="preload" href="/fonts/Poppins-Regular.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
      </Head>
      <body>
        <Main />
        <NextScript />
        <footer className="footer">
          <p>&copy; {new Date().getFullYear()} Tanner Bleakley. All rights reserved.</p>
          <p>
            Follow me on
            <a href="https://twitter.com/boyashaka83" className="text-blue-500"> Twitter</a>,
            <a href="https://github.com/tannerpace" className="text-blue-500"> GitHub</a>,
            <a href="https://linkedin.com/in/tannerbleakley" className="text-blue-500"> LinkedIn</a>, and
            <a href="https://instagram.com/tannerpaceb" className="text-blue-500"> Instagram</a>.
          </p>
          <p>Email: <a href="mailto:tannerpace@gmail.com" className="text-blue-500">tannerpace@gmail.com</a></p>
        </footer>
      </body>
    </Html>
  )
}
