// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
//   reactCompiler: true,
// };

// export default nextConfig;


import type { NextConfig } from "next";

const repoName = "creations";
const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  output: "export",
  reactCompiler: true,
  images: {
    unoptimized: true
  },
  trailingSlash: true,
  ...(isProd && {
    basePath: `/${repoName}`,
    assetPrefix: `/${repoName}/`
  })
};

export default nextConfig;