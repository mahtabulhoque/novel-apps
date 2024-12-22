/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: "res.cloudinary.com",
          port: "",
          pathname: "/**", // This ensures all paths under the domain are allowed
        },
      ],
    },
  };
  
  export default nextConfig;
  