"use client"

/**
 * hooks/useFloatingPanel.ts
 * @description 浮窗状态管理 Hook — 移动端 Safe Area 适配
 * @author YanYuCloudCube Team
 * @version v1.2.0
 *
 * v1.2.0 — 适配 env(safe-area-inset-*) 刘海屏安全区域
 */

import { useCallback, useMemo, useState } from "react";
import type { AITab } from "../types";

export interface UseFloatingPanelOptions {
  defaultOpen?: boolean;
  defaultTab?: AITab;
  /** 是否为移动端视图 */
  isMobile?: boolean;
}

export interface UseFloatingPanelReturn {
  isOpen: boolean;
  isMaximized: boolean;
  activeTab: AITab;
  openPanel: () => void;
  closePanel: () => void;
  togglePanel: () => void;
  toggleMaximize: () => void;
  setActiveTab: (tab: AITab) => void;
  panelClass: string;
  /** 移动端面板内联样式（含 Safe Area） */
  mobilePanelStyle: React.CSSProperties;
}

/** 获取 CSS env() 变量的数值兜底 */
function getSafeAreaInset(): { top: number; bottom: number } {
  if (typeof window === "undefined") return { top: 0, bottom: 0 };

  const getEnv = (name: string, fallback: number): number => {
    const test = document.createElement("div");
    test.style.cssText = `position:fixed;${name}:env(${name},${fallback}px)`;
    document.body.appendChild(test);
    const value = parseFloat(getComputedStyle(test).inset ?? String(fallback));
    document.body.removeChild(test);
    return isNaN(value) ? fallback : value;
  };

  return {
    top: getEnv("safe-area-inset-top", 0),
    bottom: getEnv("safe-area-inset-bottom", 0),
  };
}

export function useFloatingPanel(options: UseFloatingPanelOptions = {}): UseFloatingPanelReturn {
  const { defaultOpen = false, defaultTab = "chat", isMobile = false } = options;

  const [isOpen, setIsOpen] = useState(defaultOpen);
  const [isMaximized, setIsMaximized] = useState(false);
  const [activeTab, setActiveTab] = useState<AITab>(defaultTab);
  const [safeArea, setSafeArea] = useState({ top: 0, bottom: 0 });

  // 初始化 Safe Area 检测
  useMemo(() => {
    setSafeArea(getSafeAreaInset());
  }, []);

  const openPanel = useCallback(() => setIsOpen(true), []);
  const closePanel = useCallback(() => {
    setIsOpen(false);
    setIsMaximized(false);
  }, []);

  const togglePanel = useCallback(() => setIsOpen((prev) => !prev), []);
  const toggleMaximize = useCallback(() => setIsMaximized((prev) => !prev), []);

  /** 移动端：全屏底部抽屉（含 Safe Area）；桌面端：可拖拽浮窗或最大化 */
  const panelClass = isMaximized
    ? "fixed inset-4 md:inset-8 z-60"
    : isMobile
      ? "fixed inset-x-0 bottom-0 top-0 z-60 rounded-t-2xl overflow-hidden"
      : "fixed bottom-4 right-4 w-[420px] h-[580px] z-60";

  /** 移动端面板使用 style 注入 Safe Area，避免 CSS env() 兼容性问题 */
  const mobilePanelStyle: React.CSSProperties = isMobile
    ? {
      position: "fixed",
      inset: 0,
      top: `${Math.max(60, 60 + safeArea.top)}px`,
      zIndex: 1000,
      // 键盘弹出时避免溢出
      maxHeight: isMobile ? `calc(100vh - ${Math.max(60, 60 + safeArea.top)}px - ${safeArea.bottom}px)` : undefined,
    }
    : {};

  return {
    isOpen,
    isMaximized,
    activeTab,
    openPanel,
    closePanel,
    togglePanel,
    toggleMaximize,
    setActiveTab,
    panelClass,
    mobilePanelStyle,
  };
}
