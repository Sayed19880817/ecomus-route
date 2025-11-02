import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // experimental: {
  //   useCache: true,
  //   cacheComponents: true,
  //   cacheLife: {
  //     biweekly: {
  //       stale: 5, // 14 days
  //       revalidate: 10, // 1 day
  //       expire: 5, // 14 days
  //     },
  //   },
  // },
  images: {
    localPatterns: [{ pathname: "/src/assets/**", search: "" }],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ecommerce.routemisr.com",
        pathname: "/Route-Academy-categories/**",
      },
      {
        protocol: "https",
        hostname: "ecommerce.routemisr.com",
        pathname: "/Route-Academy-products/**",
      },
      {
        protocol: "https",
        hostname: "ecommerce.routemisr.com",
        pathname: "/Route-Academy-brands/**",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/account",
        destination: "/account/profile",
        permanent: true,
      },
      {
        source: "/allOrders",
        destination: "/account/orders",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
