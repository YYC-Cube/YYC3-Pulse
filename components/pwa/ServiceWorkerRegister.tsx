"use client"

/**
 * ServiceWorkerRegister.tsx
 * ==========================
 * YYC³ Pulse — Service Worker 注册组件
 * 在客户端挂载时注册 SW，启用离线缓存
 */

import { useEffect } from "react";

export function ServiceWorkerRegister() {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      // 延迟注册，避免影响首屏加载
      const timeoutId = setTimeout(() => {
        navigator.serviceWorker
          .register("/sw.js")
          .then((registration) => {
            console.log("[SW] 注册成功:", registration.scope);
          })
          .catch((error) => {
            console.warn("[SW] 注册失败:", error);
          });
      }, 3000);

      return () => clearTimeout(timeoutId);
    }
  }, []);

  return null;
}
