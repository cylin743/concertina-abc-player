/** @type {import('next').NextConfig} */
const nextConfig = {
    basePath: "/concertina-abc-player",
    output: "export",  // <=== enables static exports
    reactStrictMode: true,
    experimental: {
        missingSuspenseWithCSRBailout: false,
    },
};
  

export default nextConfig;
