/** @type {import('next').NextConfig} */
const nextConfig = {
    swcMinify: false,
    reactStrictMode: false,
    images: {
        remotePatterns: [
            {
            hostname: "*",
            },
        ],
    },
};

export default nextConfig;
