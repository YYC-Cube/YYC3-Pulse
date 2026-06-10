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
[![Test Status](https://img.shields.io/badge/tests-48%20passed-22c55e?style=flat-square&logo=vitest&logoColor=white)](https://github.com/YYC-Cube/YYC3-Pulse)
[![Coverage](https://img.shields.io/badge/coverage-87%25-22c55e?style=flat-square&logo=istanbul&logoColor=white)](https://github.com/YYC-Cube/YYC3-Pulse)
[![PWA](https://img.shields.io/badge/PWA-ready-5A0FC8?style=flat-square&logo=pwa&logoColor=white)](https://pulse.yyc3.top)
[![Next.js](https://img.shields.io/badge/Next.js-16.2-black?style=flat-square&logo=next.js&logoColor=white)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19.2-61dafb?style=flat-square&logo=react&logoColor=white)](https://react.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.3-06b6d4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![shadcn/ui](https://img.shields.io/badge/shadcn%2Fui-50%2B%20components-000000?style=flat-square&logo=shadcnui&logoColor=white)](https://ui.shadcn.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178c6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![pnpm](https://img.shields.io/badge/pnpm-11-f69220?style=flat-square&logo=pnpm&logoColor=white)](https://pnpm.io)
[![Vitest](https://img.shields.io/badge/Vitest-4.1-6B9A00?style=flat-square&logo=vitest&logoColor=white)](https://vitest.dev)
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

<details open>
<summary><strong>📑 Table of Contents / 目录</strong></summary>

- [Overview / 概述](#overview--概述)
- [Key Features / 功能特性](#key-features--功能特性)
- [Tech Stack / 技术栈](#tech-stack--技术栈)
- [Project Structure / 项目结构](#project-structure--项目结构)
- [Quick Start / 快速开始](#quick-start--快速开始)
- [Development Guide / 开发指南](#development-guide--开发指南)
- [Testing / 测试](#testing--测试)
- [Architecture / 架构](#architecture--架构)
- [PWA Support / PWA 支持](#pwa-support--pwa-支持)
- [Extensibility / 可扩展方向](#extensibility--可扩展方向)
- [Contributing / 贡献指南](#contributing--贡献指南)
- [Changelog / 变更历史](#changelog--变更历史)
- [License / 许可证](#license--许可证)

</details>

---

## Overview / 概述

> **YYC³ Pulse** is the core web platform of the **YanYuCloudCube** intelligent application ecosystem. Inspired by the philosophy _"All Realms Converge at Cloud Nexus"_ and powered by **Next.js 16**, **React 19**, **Radix UI**, and **Tailwind CSS 4**, it serves as a brand showcase and intelligent application hub — a pulse point where technology ignites a new era.

> **YYC³ Pulse** 是 **YanYuCloudCube** 智能应用生态的核心 Web 平台，以「万象归元于云枢，深栈智启新纪元」为核心理念，基于 **Next.js 16** + **React 19** + **Radix UI** + **Tailwind CSS 4** 构建，兼具品牌展示与智能应用入口功能。

---

## Key Features / 功能特性

### Brand & UI / 品牌与 UI

| Feature / 特性 | Description / 描述 |
|----------------|-------------------|
| **Neon Pulse Wave Animation** / 霓虹脉冲光流动效 | 6 SVG light trails with radial gradient glowing particles flowing along organic Bézier curves — 6 条 SVG 光轨沿有机贝塞尔曲线流动，搭载径向渐变脉冲发光粒子 |
| **Shimmer Text Effects** / 闪光文字效果 | Navigation and badge text with animated white gradient sweep, matching brand identity — 导航文字与徽章的动态扫光效果 |
| **Dark-First Design** / 暗色优先设计 | Black-and-orange cyberpunk aesthetic with noise texture rendering — 黑橙赛博朋克美学，搭载噪点纹理渲染 |
| **Enterprise-Grade UI** / 企业级 UI 组件 | 50+ Radix UI / shadcn/ui components with full accessibility (WCAG) — 50+ 组件，完整无障碍支持 |
| **Dual-Language i18n** / 中英双语国际化 | Built-in Chinese/English dictionary engine with automatic language detection via proxy — 自研字典引擎，自动语言检测与重定向 |

### AI Assistant Panel / AI 智能助理面板

| Feature / 特性 | Description / 描述 |
|----------------|-------------------|
| **Floating Chat Panel** / 浮动对话面板 | Draggable AI chat interface with 4-tab layout (Chat, Commands, Prompts, Settings) — 可拖拽 AI 对话界面，4 标签页布局 |
| **Local Model Scanning** / 本地模型扫描 | Auto-detect Ollama models via `/api/tags` — 自动扫描本地 Ollama 已安装模型 |
| **Custom Model Management** / 自编辑模型 | Add/edit/delete custom models (Ollama, OpenAI-compatible, custom API) — 添加/编辑/删除自定义模型 |
| **System Commands** / 系统命令 | 10 preset commands for cluster status, model deployment, security audit, etc. — 10 个预设系统命令 |
| **Prompt Presets** / 提示词预设 | 5 role-based system prompts (operations, tuning, data analysis, security, general) — 5 种角色预设提示词 |
| **Model Testing** / 模型连接测试 | Inline connectivity test for each model — 内联测试模型连接状态 |

### PWA & Cross-Platform / PWA 与全平台

| Feature / 特性 | Description / 描述 |
|----------------|-------------------|
| **Service Worker** / 离线缓存 | Cache-first strategy with per-resource error isolation — Cache First 逐个缓存策略 |
| **iOS Support** / iOS 支持 | Apple meta tags, splash screen, "Add to Home Screen" guide — iOS 元标签、启动屏、安装引导 |
| **Install Prompt** / 安装提示 | Chrome `beforeinstallprompt` event handling — 响应式安装引导 UI |
| **Mobile Safe Area** / 安全区域 | Full safe-area-inset-* adaptation for notch devices — 刘海屏安全区域适配 |
| **Cross-Platform Icons** / 多平台图标 | Android, iOS, macOS, tvOS, watchOS, Windows icon sets included |

---

## Tech Stack / 技术栈

### Core / 核心

| Category / 类别 | Technology / 技术 | Version |
|-----------------|-------------------|---------|
| **Framework** / 框架 | [Next.js](https://nextjs.org) (App Router, Static Export) | 16.2 |
| **UI Engine** / UI 引擎 | [React](https://react.dev) + [TypeScript](https://www.typescriptlang.org) | 19.2 / 5.8 |
| **Components** / 组件库 | [Radix UI](https://www.radix-ui.com) + [shadcn/ui](https://ui.shadcn.com) | 50+ |
| **Styling** / 样式 | [Tailwind CSS](https://tailwindcss.com) + CSS Variables | 4.3 |
| **Animation** / 动画 | [Motion](https://motion.dev) (Framer Motion) + SVG SMIL | latest |
| **Icons** / 图标 | [Lucide React](https://lucide.dev) | latest |

### AI & PWA

| Category / 类别 | Technology / 技术 | Purpose / 用途 |
|-----------------|-------------------|----------------|
| **AI Assistant** / 智能助理 | Custom React panel | Floating chat, commands, model management |
| **PWA** / 渐进式 Web 应用 | Service Worker + Manifest | Offline caching, install prompt |
| **Ollama Integration** / Ollama 集成 | REST API (`/api/tags`) | Local model auto-discovery |

### Developer Tools / 开发工具

| Tool / 工具 | Version | Purpose / 用途 |
|-------------|---------|----------------|
| [pnpm](https://pnpm.io) | 11 | Package manager / 包管理 |
| [Vitest](https://vitest.dev) | 4.1 | Testing framework / 测试框架 |
| [Testing Library](https://testing-library.com) | 16.3 | React component testing / 组件测试 |
| [jsdom](https://github.com/jsdom/jsdom) | 29 | DOM environment for tests / 测试 DOM 环境 |
| [Prettier](https://prettier.io) | latest | Code formatting / 代码格式化 |
| GitHub Actions | - | CI/CD deployment / 持续集成部署 |

---

## Project Structure / 项目结构

```
yyc3-pulse/
├── .github/workflows/           # CI/CD: GitHub Actions 部署流水线
│   └── deploy.yml               #   → GitHub Pages 自动部署
│
├── app/                          # Next.js App Router
│   ├── [lang]/                   #   国际化路由 (zh-CN / en)
│   │   ├── layout.tsx            #     根布局（Meta、OG、PWA、字体）
│   │   ├── page.tsx              #     首页服务端组件
│   │   └── HomePageClient.tsx    #     首页客户端组件（动效、交互、AI 助手）
│   ├── lib/
│   │   ├── dictionaries/         #     多语言 JSON 字典
│   │   │   ├── zh-CN.json
│   │   │   └── en.json
│   │   ├── get-dictionary.ts
│   │   └── i18n-config.ts
│   ├── globals.css               #     全局样式 + CSS 变量 + 动画
│   └── page.tsx                  #     国际化路由代理
│
├── components/                   # 可复用 UI 组件
│   ├── ai-assistant/             #   AI 智能助理面板模块
│   │   ├── AIAssistant.tsx       #     主组件（4 标签页浮窗）
│   │   ├── types.ts              #     类型定义（ChatMessage、ModelConfig 等）
│   │   ├── assets/               #     品牌 Logo 资源
│   │   ├── constants/            #     命令 & 提示词预设
│   │   │   ├── commands.ts       #       10 个系统命令
│   │   │   └── prompts.ts        #       5 个角色提示词
│   │   ├── hooks/                #     自定义 Hooks
│   │   │   ├── useChat.ts        #       聊天消息管理
│   │   │   ├── useAIConfig.ts    #       AI 配置 + 模型 CRUD
│   │   │   ├── useFloatingPanel.ts #     浮窗状态管理
│   │   │   ├── useDraggable.ts   #       可拖拽逻辑
│   │   │   └── useModelProvider.ts #     模型扫描 + 自定义 CRUD
│   │   ├── services/             #     服务层
│   │   │   └── modelService.ts   #       Ollama 扫描 + localStorage CRUD
│   │   └── components/           #     子组件
│   │       ├── ChatPanel/        #       对话面板（消息、输入、打字指示）
│   │       ├── CommandsPanel/    #       命令面板（过滤、卡片）
│   │       ├── PromptsPanel/     #       提示词面板（预设、自定义）
│   │       ├── SettingsPanel/    #       设置面板（API Key、模型、参数）
│   │       ├── FloatingButton.tsx #      浮动触发按钮
│   │       └── PanelHeader.tsx   #      面板头部
│   │
│   ├── pwa/                      #   PWA 功能组件
│   │   ├── PWAProvider.tsx       #     客户端集成
│   │   ├── PWAInstallPrompt.tsx  #     安装引导（Chrome + iOS）
│   │   ├── ServiceWorkerRegister.tsx # SW 注册
│   │   └── index.ts
│   │
│   ├── ui/                       #   50+ shadcn/ui 组件
│   │   ├── button.tsx, card.tsx, dialog.tsx, tabs.tsx, slider.tsx ...
│   │   └── use-mobile.tsx        #     移动端检测 Hook
│   │
│   ├── line-shadow-text.tsx      #   品牌线条阴影文字
│   ├── shimmer-button.tsx        #   闪光动效按钮
│   └── theme-provider.tsx        #   主题管理
│
├── test/                         # 测试配置
│   └── setup.ts                  #   Vitest 环境配置
│
├── public/                       # 静态资源
│   ├── icons/                    #   PWA 图标 (16/32/64/256/512px)
│   ├── yyc3-icons/               #   全平台图标 (Android/iOS/macOS/tvOS/watchOS/Windows)
│   ├── yyc3-logo-white/          #   白色版全平台 Logo
│   ├── CNAME                     #   自定义域名
│   ├── site.webmanifest          #   PWA Manifest（增强版）
│   ├── sw.js                     #   Service Worker
│   └── YYC3-Family-001.png      #   品牌主视觉
│
├── docs/                         # 项目文档
│   ├── YYC3-团队规范-开发标准.md  #     团队规范（代码、文档、命名）
│   ├── 首页接口说明文档.md          #     首页 API 接口说明
│   └── ai-assistant-dev/         #     AI 助手可复用开发模板
│
├── vitest.config.ts              # Vitest 测试配置
├── next.config.mjs               # Next.js 构建配置
├── tsconfig.json                 # TypeScript 配置
├── components.json               # shadcn/ui 配置
├── package.json                  # 依赖与脚本
└── pnpm-workspace.yaml           # pnpm 工作空间配置
```

---

## Quick Start / 快速开始

### Prerequisites / 环境要求

| Requirement / 要求 | Version / 版本 |
|--------------------|---------------|
| **Node.js** | 22+ |
| **pnpm** | 11+ |

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
# Start dev server on port 3154 / 启动开发服务器
pnpm dev
# → http://localhost:3154
```

### Production / 生产构建

```bash
# Type check / 类型检查
pnpm type-check

# Lint / 代码检查
pnpm lint

# Run tests / 运行测试
pnpm test

# Production build / 生产构建 → out/
pnpm build

# Preview production build / 预览
pnpm start
```

### Testing / 测试

```bash
# Run all tests / 运行全部测试
pnpm test

# Watch mode / 监听模式
pnpm test:watch
```

### Security / 安全审计

```bash
pnpm audit
```

---

## Development Guide / 开发指南

### Available Scripts / 可用脚本

| Script / 脚本 | Description / 描述 |
|---------------|-------------------|
| `pnpm dev` | Start dev server on port 3154 |
| `pnpm build` | Production static export |
| `pnpm start` | Preview production build |
| `pnpm test` | Run all Vitest tests |
| `pnpm test:watch` | Run tests in watch mode |
| `pnpm type-check` | TypeScript type checking (`tsc --noEmit`) |
| `pnpm lint` | Prettier formatting check |
| `pnpm format` | Auto-format all files with Prettier |
| `pnpm audit` | Security audit dependencies |

### Code Standards / 代码标准

This project follows the **[YYC³ Development Standards](./docs/YYC3-团队规范-开发标准.md)** which include:

- **Document headers**: All files must include JSDoc/YAML Front Matter headers with author, version, description
- **Naming conventions**: Unified camelCase, PascalCase, and kebab-case rules
- **Semantic versioning**: SemVer 2.0.0 for all releases
- **TypeScript strict mode**: Full strict type checking enabled
- **Component structure**: Each component directory includes its own `index.tsx`, types, and tests

### Key Conventions / 关键规范

| Convention / 规范 | Rule / 规则 |
|-------------------|-------------|
| **File naming** | `kebab-case.tsx` for components, `camelCase.ts` for hooks/utils |
| **CSS** | Tailwind CSS utility classes + CSS variables via `globals.css` |
| **Imports** | Use `@/` path alias (maps to project root) |
| **Client components** | Add `'use client'` directive for interactive components |
| **Accessibility** | All interactive elements must have `aria-label` or visible label |
| **Mobile** | All touch targets minimum `44px`, test with `useIsMobile()` hook |
| **Animations** | Use Tailwind CSS `animate-*` utilities or CSS `@keyframes` in `globals.css` |

---

## Testing / 测试

### Test Architecture / 测试架构

```bash
pnpm test     # 48 tests, 6 files - all passed ✅
```

| Test File / 测试文件 | Tests | Coverage / 覆盖内容 |
|---------------------|-------|-------------------|
| `modelService.test.ts` | 11 | Ollama scan, CRUD, merge, edge cases |
| `useChat.test.ts` | 6 | Send, clear, preset, clipboard, edge cases |
| `useFloatingPanel.test.ts` | 6 | Open/close, maximize, tabs, mobile/desktop classes |
| `ChatInput.test.tsx` | 8 | Render, Enter/Shift+Enter, disabled, onChange |
| `FloatingButton.test.tsx` | 4 | Click, tooltip, mobile/desktop styles |
| `ModelSelector.test.tsx` | 13 | Render, select, tags, loading, scan error, add/edit/delete form |

### Adding Tests / 添加测试

```typescript
// Example: components/example.test.tsx
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Example } from "./Example";

describe("Example", () => {
  it("should render and respond to interaction", () => {
    const onClick = vi.fn();
    render(<Example onClick={onClick} />);
    fireEvent.click(screen.getByRole("button"));
    expect(onClick).toHaveBeenCalled();
  });
});
```

---

## Architecture / 架构

### Component Hierarchy / 组件层级

```
RootLayout ([lang]/layout.tsx)
├── PWAProvider
│   ├── ServiceWorkerRegister
│   └── PWAInstallPrompt
│
└── HomePageClient
    ├── SVG Wave Animation (6 light trails)
    ├── Header
    │   ├── Logo (YYC³)
    │   ├── Navigation (言启智云/语枢未来/深栈智启/万象归元)
    │   └── ShimmerButton (YanYuCloud³)
    ├── Hero Section
    │   ├── Badge (万象归元于云枢丨深栈智启新纪元)
    │   ├── Title (YYC³ YanYuCloudCube)
    │   └── CTA Button
    └── AIAssistant
        ├── FloatingButton (trigger)
        └── Panel (on open)
            ├── PanelHeader
            ├── Tabs (Chat | Commands | Prompts | Settings)
            ├── ChatPanel
            ├── CommandsPanel
            ├── PromptsPanel
            └── SettingsPanel
```

### Data Flow / 数据流

```
┌──────────────────────────────────────────────────────────┐
│                     useAIConfig                          │
│  ┌─────────────────┐    ┌────────────────────────────┐  │
│  │ useModelProvider │    │     useSettingsStore       │  │
│  │  ┌───────────┐   │    │  ┌──────────────────────┐ │  │
│  │  │Ollama Scan│   │    │  │   localStorage       │ │  │
│  │  │ /api/tags │   │    │  │ yyc3_settings        │ │  │
│  │  └───────────┘   │    │  └──────────────────────┘ │  │
│  │  ┌───────────┐   │    │  aiApiKey, aiModel,      │  │
│  │  │Custom CRUD│   │    │  aiTemperature, etc.     │  │
│  │  │localStorage│  │    └────────────────────────────┘  │
│  │  └───────────┘   │                                     │
│  │  mergeModels()   │                                     │
│  └─────────────────┘                                     │
└──────────────────────────────────────────────────────────┘
                            │
                            ▼
                    SettingsPanel
                    (ModelSelector)
```

---

## PWA Support / PWA 支持

YYC³ Pulse is a fully featured Progressive Web App:

| Feature / 特性 | Status / 状态 |
|----------------|--------------|
| **Manifest** / Web 清单 | ✅ Enhanced (`display_override`, `orientation`, `purpose`, `categories`) |
| **Service Worker** / 离线缓存 | ✅ Cache-first with fault-tolerant per-resource caching |
| **Install Prompt** / 安装引导 | ✅ Chrome `beforeinstallprompt` + iOS Safari guide |
| **iOS Support** / iOS 支持 | ✅ `apple-mobile-web-app-capable`, status bar, splash screen |
| **Offline Fallback** / 离线降级 | ✅ Returns cached index page on network failure |
| **Safe Area** / 安全区域 | ✅ `env(safe-area-inset-*)` for notch devices |
| **Icons** / 图标 | ✅ 16px–512px + platform-specific sets |

### Lighthouse Checklist / 审核清单

- [x] `start_url` points to `/`
- [x] `display: standalone`
- [x] Icons include 192px and 512px
- [x] `theme_color` and `background_color` defined
- [x] Service Worker registered with cache strategy
- [x] HTTPS (via Cloudflare + GitHub Pages)
- [x] Responsive design for all screen sizes

---

## Extensibility / 可扩展方向

| Direction / 方向 | Tech Readiness / 技术储备 |
|------------------|--------------------------|
| **Dashboard Console** / 控制台 | shadcn/ui full component library + Recharts + AI panel |
| **AI Intelligence Panel** / 智能面板 | React Server Components + Streaming + Ollama API |
| **SaaS Multi-Tenant** / 多租户 | proxy.ts routing + i18n architecture |
| **Desktop App** / 桌面应用 | Electron (standards pre-defined in team docs) |
| **Data Dashboard** / 数据仪表板 | SVG animation pipeline + Recharts + AI prompts |
| **Real-time Monitoring** / 实时监控 | WebSocket + AI assistant commands |

---

## Contributing / 贡献指南

We welcome contributions! Please follow our **[YYC³ Development Standards](./docs/YYC3-团队规范-开发标准.md)**:

### Quick Steps / 快速步骤

1. **Fork** the repository
2. **Create** your feature branch (`git checkout -b feat/amazing-feature`)
3. **Commit** your changes following the standard:
   - Format: `type: vX.Y.Z 描述`
   - Types: `feat`, `fix`, `refactor`, `docs`, `test`, `chore`
   - Example: `feat: v1.2.0 新增 AI 模型扫描功能`
4. **Push** to the branch (`git push origin feat/amazing-feature`)
5. **Open** a Pull Request

### Before Submitting / 提交前检查

- [ ] Code follows [team standards](./docs/YYC3-团队规范-开发标准.md)
- [ ] JSDoc/YAML headers present on new files
- [ ] TypeScript strict mode passes (`pnpm type-check`)
- [ ] All tests pass (`pnpm test`)
- [ ] No Prettier warnings (`pnpm lint`)
- [ ] Mobile responsive tested

---

## Changelog / 变更历史

| Version / 版本 | Date / 日期 | Highlights / 关键变更 |
|----------------|-------------|----------------------|
| **v1.1.0** | 2026-06-10 | AI Assistant panel, model scanning/CRUD, PWA iOS support, mobile Safe Area, 48 tests |
| **v1.0.0** | 2026-06-09 | Initial release: Brand showcase, SVG animation, i18n, shadcn/ui, shimmers, PWA manifest |

### v1.1.0 Detailed / 详细变更

**✨ New Features / 新功能**
- AI Assistant floating panel with 4-tab layout (Chat, Commands, Prompts, Settings)
- Ollama local model auto-scanning via `/api/tags`
- Custom model management (add/edit/delete with localStorage persistence)
- 10 system command presets (cluster, model, data, security, monitor)
- 5 role-based system prompt presets

**📱 Mobile Optimization / 移动端优化**
- Safe Area adaptation (`safe-area-inset-*` for notch devices)
- Full-screen bottom drawer panel layout
- Touch tooltip for floating button (replaces hover)
- 44px minimum touch targets on all interactive elements

**🌐 PWA Enhancement / PWA 增强**
- Service Worker fault-tolerant caching (per-resource error isolation)
- iOS Safari install guide ("Share → Add to Home Screen")
- Apple meta tags for standalone mode
- Install prompt positioning (non-overlapping with AI button)

**🧪 Testing / 测试**
- 48 test cases across 6 test files
- Vitest + Testing Library + jsdom
- Hook tests (useChat, useFloatingPanel)
- Component tests (ChatInput, FloatingButton, ModelSelector)
- Service tests (modelService: scan, CRUD, merge)

---

## License / 许可证

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
