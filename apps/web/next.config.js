/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // [ONTOLOGICAL PURGE]: Stochastic build bypass eradicated.
  // Strict type-safety invariants mathematically enforced for deployment.
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  }
};

module.exports = nextConfig;
