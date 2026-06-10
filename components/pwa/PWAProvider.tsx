"use client"

/**
 * PWAProvider.tsx
 * ================
 * YYC³ Pulse — PWA 功能客户端集成组件
 * 需要在根 layout 中使用 client 组件包装
 */

import { PWAInstallPrompt } from "./PWAInstallPrompt";
import { ServiceWorkerRegister } from "./ServiceWorkerRegister";

export function PWAProvider() {
  return (
    <>
      <ServiceWorkerRegister />
      <PWAInstallPrompt />
    </>
  );
}
