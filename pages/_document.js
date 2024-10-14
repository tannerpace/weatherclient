import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  const meta = {
    title: 'Tanner Bleakley - Portfolio',
    description: 'Tanner Bleakley is a full-stack developer and DevOps engineer.',
    image: 'https://assets.vercel.com/image/upload/q_auto/front/vercel/dps.png' // Update this with your actual image URL
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
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://tannerb.dev" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@tannerpaceb" />
        <meta name="twitter:title" content={meta.title} />
        <meta name="twitter:description" content={meta.description} />
        <meta name="twitter:image" content={meta.image} />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
