"use client"

/**
 * PWAInstallPrompt.tsx
 * =====================
 * YYC³ Pulse — PWA 安装引导组件
 *
 * - Chrome: 监听 beforeinstallprompt 事件
 * - iOS Safari: 显示桌面端添加引导
 * - 自动避免与 AI 浮动按钮重叠
 */

import { AppWindowMac, Download, X } from "lucide-react";
import { useEffect, useState } from "react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
}

/** 检测是否 iOS Safari */
function isIOS(): boolean {
  if (typeof navigator === "undefined") return false;
  return /iphone|ipad|ipod/i.test(navigator.userAgent);
}

/** 是否已安装 PWA（display-mode: standalone） */
function isInstalledPWA(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(display-mode: standalone)").matches;
}

export function PWAInstallPrompt() {
  const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isDismissed, setIsDismissed] = useState(false);
  const [showIOSGuide, setShowIOSGuide] = useState(false);

  // 浏览器兼容性缓存key
  const DISMISSED_KEY = "yyc3_pwa_dismissed";
  const IOS_GUIDE_KEY = "yyc3_pwa_ios_guide";

  useEffect(() => {
    if (isInstalledPWA()) return;

    // Chrome: beforeinstallprompt
    const handler = (e: Event) => {
      e.preventDefault();
      setInstallPrompt(e as BeforeInstallPromptEvent);
    };
    window.addEventListener("beforeinstallprompt", handler);

    // iOS: 延迟显示引导（等页面完全加载）
    if (isIOS()) {
      const timer = setTimeout(() => {
        const shown = localStorage.getItem(IOS_GUIDE_KEY);
        if (!shown) {
          setShowIOSGuide(true);
        }
      }, 5000);
      return () => {
        clearTimeout(timer);
        window.removeEventListener("beforeinstallprompt", handler);
      };
    }

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
    };
  }, []);

  const handleInstall = async () => {
    if (!installPrompt) return;
    installPrompt.prompt();
    const result = await installPrompt.userChoice;
    if (result.outcome === "accepted") {
      setInstallPrompt(null);
    }
  };

  const handleDismiss = () => {
    setIsDismissed(true);
    localStorage.setItem(DISMISSED_KEY, Date.now().toString());
  };

  const handleDismissIOS = () => {
    setShowIOSGuide(false);
    localStorage.setItem(IOS_GUIDE_KEY, "true");
  };

  const isDismissedRecently = (): boolean => {
    const dismissed = localStorage.getItem(DISMISSED_KEY);
    if (!dismissed) return false;
    const hoursAgo = (Date.now() - parseInt(dismissed)) / (1000 * 60 * 60);
    return hoursAgo < 24;
  };

  // ─── iOS 引导 ──────────────────────────────────────
  if (showIOSGuide) {
    return (
      <div className="fixed bottom-24 left-4 right-4 md:left-auto md:right-4 md:bottom-28 md:w-80 z-70">
        <div className="relative bg-[rgba(8,25,55,0.97)] backdrop-blur-2xl border border-[rgba(0,180,255,0.2)] rounded-2xl p-4 shadow-[0_0_30px_rgba(0,180,255,0.12)]">
          <button
            onClick={handleDismissIOS}
            className="absolute top-2 right-2 p-1 rounded-lg hover:bg-[rgba(0,212,255,0.1)] transition-all"
            aria-label="关闭"
          >
            <X className="w-3.5 h-3.5 text-[rgba(0,212,255,0.4)]" />
          </button>

          <div className="flex items-start gap-3">
            <div className="p-2 rounded-xl bg-linear-to-br from-[#00d4ff] to-[#7b2ff7] shadow-[0_0_15px_rgba(0,180,255,0.3)] shrink-0">
              <AppWindowMac className="w-4 h-4 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-[#e0f0ff] text-sm font-medium mb-1">添加到主屏幕</h4>
              <p className="text-[rgba(0,212,255,0.4)] text-xs leading-relaxed">
                使用 Safari 浏览器，点击分享按钮
                <span className="block mt-1">
                  ① 分享 <span className="text-[#00d4ff]">→</span> ② 添加到主屏幕
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ─── 已安装或已被屏蔽 ─────────────────────────────
  if (isInstalledPWA()) return null;
  if (!installPrompt || isDismissed || isDismissedRecently()) return null;

  // ─── Chrome 安装提示 ──────────────────────────────
  return (
    <div className="fixed bottom-24 left-4 right-4 md:left-auto md:right-4 md:bottom-28 md:w-80 z-70">
      <div className="relative bg-[rgba(8,25,55,0.97)] backdrop-blur-2xl border border-[rgba(0,180,255,0.2)] rounded-2xl p-4 shadow-[0_0_30px_rgba(0,180,255,0.12)]">
        <button
          onClick={handleDismiss}
          className="absolute top-2 right-2 p-1 rounded-lg hover:bg-[rgba(0,212,255,0.1)] transition-all"
          aria-label="关闭"
        >
          <X className="w-3.5 h-3.5 text-[rgba(0,212,255,0.4)]" />
        </button>

        <div className="flex items-start gap-3">
          <div className="p-2 rounded-xl bg-linear-to-br from-[#00d4ff] to-[#7b2ff7] shadow-[0_0_15px_rgba(0,180,255,0.3)] shrink-0">
            <Download className="w-4 h-4 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="text-[#e0f0ff] text-sm font-medium mb-1">安装 YYC³ Pulse</h4>
            <p className="text-[rgba(0,212,255,0.4)] text-xs leading-relaxed">
              将应用安装到设备，获得更好的离线使用体验
            </p>
          </div>
        </div>

        <button
          onClick={handleInstall}
          className="mt-3 w-full px-4 py-2.5 rounded-xl bg-linear-to-r from-[#00d4ff] to-[#0066ff] text-white text-sm font-medium hover:shadow-[0_0_15px_rgba(0,180,255,0.3)] transition-all active:scale-[0.98]"
        >
          安装应用
        </button>
      </div>
    </div>
  );
}
