import withPWA from 'next-pwa';

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    removeConsole: process.env.NODE_ENV !== "development",
  },
  pwa: {
    dest: 'public',
    disable: process.env.NODE_ENV === 'development',
    register: true,
    skipWaiting: true,
  },
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "weatherclient.vercel.app",
          },
        ],
        permanent: true,
        destination: "https://windysession.com/:path*",
      },
    ];
  },
};

export default withPWA(nextConfig);
