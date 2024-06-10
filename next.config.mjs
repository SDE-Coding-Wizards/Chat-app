/** @type {import('next').NextConfig} */
const nextConfig = {
  serverRuntimeConfig: {
    apiKey: process.env.FIREBASE_APIKEY ?? "",
    authDomain: process.env.FIREBASE_AUTHDOMAIN ?? "",
    projectId: process.env.FIREBASE_PROJECTID ?? "",
    storageBucket: process.env.FIREBASE_STORAGEBUCKET ?? "",
    messagingSenderId: process.env.FIREBASE_MESSAGINGSENDERID ?? "",
    appId: process.env.FIREBASE_APPID ?? "",
    measurementId: process.env.FIREBASE_MEASUREMENTID ?? ""
  },
  publicRuntimeConfig: {
    apiKey: process.env.FIREBASE_APIKEY ?? "",
    authDomain: process.env.FIREBASE_AUTHDOMAIN ?? "",
    projectId: process.env.FIREBASE_PROJECTID ?? "",
    storageBucket: process.env.FIREBASE_STORAGEBUCKET ?? "",
    messagingSenderId: process.env.FIREBASE_MESSAGINGSENDERID ?? "",
    appId: process.env.FIREBASE_APPID ?? "",
    measurementId: process.env.FIREBASE_MEASUREMENTID ?? ""
  },
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
    ],
  },
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
