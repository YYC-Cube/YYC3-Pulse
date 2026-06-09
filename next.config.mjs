/**
 * file: next.config.mjs
 * description: Next.js 16 构建配置 — 支持 GitHub Pages 静态导出
 * author: YanYuCloudCube Team
 * version: v1.0.0
 * created: 2026-06-09
 * updated: 2026-06-09
 * status: stable
 * tags: [config],[build],[nextjs]
 */

/** @type {import('next').NextConfig} */
const nextConfig = {
  // GitHub Pages 静态导出
  output: "export",

  // 自定义域名
  assetPrefix: undefined,

  // 静态资源路径优化
  trailingSlash: true,
  skipTrailingSlashRedirect: true,

  // 图片未优化的静态导出模式
  images: {
    unoptimized: true,
  },

  // 生产环境严格类型检查
  typescript: {
    ignoreBuildErrors: false,
  },

  // Turbopack root 配置（多 lockfile 环境兼容）
  turbopack: {
    root: new URL(".", import.meta.url).pathname,
  },
};

export default nextConfig;
