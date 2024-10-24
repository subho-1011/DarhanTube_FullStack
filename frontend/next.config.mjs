/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {},
    async rewrites() {
        return [
            {
                source: "/api/v1/:path*",
                destination: `${process.env.API_BASE_URL}/api/v1/:path*`,
            },
        ];
    },
};

export default nextConfig;
// API_BASE_URL: "http://localhost:8000/api/v1",