/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  async redirects() {
    return [
      {
        source: "/",
        destination: "/login",
        permanent: true, // Set to true if this redirect is permanent
      },
    ];
  },
};

export default nextConfig;
