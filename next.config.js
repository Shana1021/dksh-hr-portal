/** @type {import('next').NextConfig} */
const nextConfig = {
  // Route segment config does not work, disabling all cache here works.
  headers: () => [
    {
      source: "/api/:first((?!auth).*)/:path*",
      headers: [
        {
          key: "Cache-Control",
          value: "no-store",
        }
      ]
    }
  ]
};

module.exports = nextConfig;
