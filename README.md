<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="./public/YYC3-Family-001.png">
    <source media="(prefers-color-scheme: light)" srcset="./public/YYC3-Family-001.png">
    <img alt="YYC³ Pulse — 万象归元于云枢" src="./public/YYC3-Family-001.png" width="100%" style="max-width: 1200px;">
  </picture>
</p>

<div align="center">

# YYC³ Pulse

### _All Realms Converge at Cloud Nexus, DeepStack Ignites a New Era._

---

[![Website](https://img.shields.io/badge/Website-pulse.yyc3.top-f97316?style=flat-square&logo=cloudflare&logoColor=white)](https://pulse.yyc3.top)
[![GitHub Release](https://img.shields.io/github/v/release/YYC-Cube/YYC3-Pulse?style=flat-square&logo=github&color=2563eb)](https://github.com/YYC-Cube/YYC3-Pulse/releases)
[![Build Status](https://img.shields.io/github/actions/workflow/status/YYC-Cube/YYC3-Pulse/deploy.yml?style=flat-square&logo=githubactions&logoColor=white&label=deploy)](https://github.com/YYC-Cube/YYC3-Pulse/actions)
[![Next.js](https://img.shields.io/badge/Next.js-16.2-black?style=flat-square&logo=next.js&logoColor=white)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19.2-61dafb?style=flat-square&logo=react&logoColor=white)](https://react.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.3-06b6d4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![pnpm](https://img.shields.io/badge/pnpm-11-f69220?style=flat-square&logo=pnpm&logoColor=white)](https://pnpm.io)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178c6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-Welcome-brightgreen?style=flat-square)](https://github.com/YYC-Cube/YYC3-Pulse/pulls)

---

</div>

<br/>

<div align="center">
  <strong>English</strong> · <a href="#文档">中文</a>
</div>

<br/>

---

## Overview

> **YYC³ Pulse** is the core web platform of the **YanYuCloudCube** intelligent application ecosystem. Inspired by the philosophy _"All Realms Converge at Cloud Nexus"_ and powered by **Next.js 16**, **React 19**, **Radix UI**, and **Tailwind CSS 4**, it serves as a brand showcase and intelligent application hub — a pulse point where technology ignites a new era.

### ✨ Key Features

- **Neon Pulse Wave Animation** — 6 SVG light trails with radial gradient glowing particles, flowing along organic Bézier curves
- **Dual-Language i18n** — Built-in Chinese/English internationalization with automatic language detection via proxy
- **Enterprise-Grade UI** — 50+ Radix UI / shadcn/ui components with full accessibility (WCAG)
- **Dark-First Design** — Black-and-orange cyberpunk aesthetic with noise texture rendering
- **Cross-Platform Ready** — PWA manifest, multi-platform icons (Android/iOS/macOS/tvOS/watchOS/Windows)
- **GitHub Pages Deployed** — Automated CI/CD via GitHub Actions, custom domain `pulse.yyc3.top`

### 🏗️ Tech Stack

| Category | Technology |
|----------|-----------|
| **Framework** | [Next.js 16.2](https://nextjs.org) (App Router, Static Export) |
| **UI Engine** | [React 19.2](https://react.dev) + [TypeScript 5.8](https://www.typescriptlang.org) |
| **Components** | [Radix UI](https://www.radix-ui.com) + [shadcn/ui](https://ui.shadcn.com) (50+) |
| **Styling** | [Tailwind CSS 4.3](https://tailwindcss.com) + CSS Variables |
| **Animation** | [Motion](https://motion.dev) (Framer Motion) + SVG SMIL |
| **i18n** | Custom dictionary engine (zh-CN / en) with `@formatjs/intl-localematcher` |
| **Charts** | [Recharts](https://recharts.org) |
| **Forms** | [React Hook Form](https://react-hook-form.com) + [Zod](https://zod.dev) |
| **Package Manager** | [pnpm 11](https://pnpm.io) |
| **CI/CD** | GitHub Actions → GitHub Pages |
| **Domain** | `pulse.yyc3.top` (Cloudflare DNS) |

---

<a name="文档"></a>

## 概述

> **YYC³ Pulse** 是 **YanYuCloudCube** 智能应用生态的核心 Web 平台，以「万象归元于云枢，深栈智启新纪元」为核心理念，基于 **Next.js 16** + **React 19** + **Radix UI** + **Tailwind CSS 4** 构建，兼具品牌展示与智能应用入口功能。

### ✨ 功能特性

- **霓虹脉冲光流动效** — 6 条 SVG 光轨沿有机贝塞尔曲线流动，搭载径向渐变脉冲发光粒子
- **中英双语国际化** — 内置自研字典引擎，通过 `proxy.ts` 实现自动语言检测与重定向
- **企业级 UI 组件** — 50+ Radix UI / shadcn/ui 组件，完整支持无障碍访问 (WCAG)
- **暗色优先设计** — 黑橙赛博朋克美学，搭载 SVG 噪点纹理渲染
- **全平台就绪** — PWA Manifest、多平台图标全覆盖（Android/iOS/macOS/tvOS/watchOS/Windows）
- **GitHub Pages 部署** — GitHub Actions 自动化 CI/CD，自定义域名 `pulse.yyc3.top`

### 🏗️ 技术栈

| 类别 | 技术 |
|------|------|
| **框架** | [Next.js 16.2](https://nextjs.org)（App Router、静态导出） |
| **UI 引擎** | [React 19.2](https://react.dev) + [TypeScript 5.8](https://www.typescriptlang.org) |
| **组件库** | [Radix UI](https://www.radix-ui.com) + [shadcn/ui](https://ui.shadcn.com)（50+ 组件） |
| **样式** | [Tailwind CSS 4.3](https://tailwindcss.com) + CSS 变量 |
| **动画** | [Motion](https://motion.dev)（Framer Motion）+ SVG SMIL |
| **国际化** | 自建字典引擎（zh-CN / en）配合 `@formatjs/intl-localematcher` |
| **数据可视化** | [Recharts](https://recharts.org) |
| **表单** | [React Hook Form](https://react-hook-form.com) + [Zod](https://zod.dev) |
| **包管理** | [pnpm 11](https://pnpm.io) |
| **CI/CD** | GitHub Actions → GitHub Pages |
| **域名** | `pulse.yyc3.top`（Cloudflare DNS） |

---

## Project Structure

```
yyc3-pulse/
├── .github/workflows/       # CI/CD: GitHub Actions 部署流水线
├── app/
│   ├── [lang]/              # 国际化路由 (zh-CN / en)
│   │   ├── layout.tsx       # 根布局（元数据、OG、字体、PWA manifest）
│   │   ├── page.tsx         # 首页服务端组件
│   │   └── HomePageClient.tsx # 首页客户端组件（动效、交互）
│   ├── lib/
│   │   ├── dictionaries/    # 多语言 JSON 字典
│   │   ├── get-dictionary.ts
│   │   └── i18n-config.ts
│   └── globals.css          # 全局样式 + shadcn/ui CSS 变量
├── components/
│   ├── ui/                  # 50+ shadcn/ui 组件
│   ├── line-shadow-text.tsx # 品牌线条阴影文字组件
│   ├── shimmer-button.tsx   # 闪光动效按钮组件
│   └── theme-provider.tsx   # 主题管理
├── docs/                    # 项目文档
│   ├── YYC3-团队规范-开发标准.md
│   └── 首页接口说明文档.md
├── hooks/                   # 自定义 React Hooks
├── lib/                     # 工具函数
├── public/
│   ├── icons/               # Web 图标 (16/32/64/256/512px)
│   ├── yyc3-icons/          # 全平台图标资源
│   ├── YYC3-Family-001.png  # 品牌主视觉
│   ├── CNAME                # 自定义域名配置
│   ├── site.webmanifest     # PWA Manifest
│   └── favicon.ico          # favicon
├── proxy.ts                 # Next.js 16 国际化路由代理（原 middleware.ts）
├── next.config.mjs          # Next.js 16 构建配置
└── package.json
```

---

## Quick Start / 快速开始

### Prerequisites / 环境要求

- **Node.js** 22+
- **pnpm** 11+

### Installation / 安装

```bash
# Clone the repository / 克隆仓库
git clone https://github.com/YYC-Cube/YYC3-Pulse.git
cd YYC3-Pulse

# Install dependencies / 安装依赖
pnpm install
```

### Development / 开发

```bash
# Start dev server on port 3154 / 启动开发服务器（端口 3154）
pnpm dev
# → http://localhost:3154
```

### Build & Deploy / 构建与部署

```bash
# Type check / 类型检查
pnpm type-check

# Lint / 代码检查
pnpm lint

# Production build / 生产构建
pnpm build

# Preview production build / 预览生产构建
pnpm start
```

### Security Audit / 安全审计

```bash
# Run dependency audit / 运行依赖漏洞扫描
pnpm audit
```

---

## 🧩 Extensibility / 可扩展方向

| Direction / 方向 | Tech Readiness / 技术储备 |
|------------------|--------------------------|
| **Dashboard Console** | shadcn/ui full component library + Recharts |
| **AI Intelligence Panel** | React Server Components + Streaming |
| **SaaS Multi-Tenant** | proxy.ts routing + i18n architecture |
| **Desktop App** | Electron (standards pre-defined in docs) |
| **Data Dashboard** | SVG animation pipeline + Recharts |

---

## 🤝 Contributing / 贡献指南

We welcome contributions! Please follow our [YYC³ Development Standards](./docs/YYC3-团队规范-开发标准.md):

- Markdown YAML Front Matter header specification
- Code file JSDoc header specification
- Semantic versioning (SemVer 2.0.0)
- Unified naming conventions
- Document change tracking mechanism

欢迎贡献！请遵循 [YYC³ 团队统一开发标准](./docs/YYC3-团队规范-开发标准.md)：

1. Fork the repository
2. Create your feature branch (`git checkout -b feat/amazing-feature`)
3. Commit your changes following the standard (`git commit -m "feat: v1.1.0 新增某某功能"`)
4. Push to the branch (`git push origin feat/amazing-feature`)
5. Open a Pull Request

---

## 📄 License / 许可证

Copyright © 2026 [YanYuCloudCube Team](https://github.com/YYC-Cube). All rights reserved.

Distributed under the MIT License. See `LICENSE` for more information.

---

<div align="center">

**YYC³ Pulse** — _Words Initiate Quadrants, Language Serves as Core for Future._

[![Website](https://img.shields.io/badge/🌐-pulse.yyc3.top-f97316?style=flat-square)](https://pulse.yyc3.top)
[![GitHub](https://img.shields.io/badge/🐙-GitHub-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/YYC-Cube/YYC3-Pulse)

</div>

---

> *言启千行代码，语枢万物智能。*  
> *Words inspire thousands of lines of code, language pivots the intelligence of all things.*