import type { NextConfig } from "next";

const isGithubActions = process.env.GITHUB_ACTIONS || false;
let repo = "";
if (isGithubActions) {
  repo = process.env.GITHUB_REPOSITORY?.replace(/.*?\//, "") || "desk-look-portfolio";
}

const nextConfig: NextConfig = {
  output: "export",
  basePath: isGithubActions ? `/${repo}` : (process.env.NEXT_PUBLIC_BASE_PATH || ""),
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
