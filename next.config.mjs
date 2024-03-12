/** @type {import('next').NextConfig} */

const nextConfig = {
  compiler: {
    styledComponents: {
      ssr: true,
      displayName: true,
      namespace: "areeba",
      minify: true
    }
  }
};

export default nextConfig;
