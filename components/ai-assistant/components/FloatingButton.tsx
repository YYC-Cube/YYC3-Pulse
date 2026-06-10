"use client"

/**
 * @file components/FloatingButton.tsx
 * @description AI 助手浮动触发按钮 — 优化移动端触控体验
 * @author YanYuCloudCube Team
 * @version v1.2.0
 *
 * v1.2.0 — 适配 Safe Area、移动端 touch tooltip
 */

import { Sparkles } from "lucide-react";
import { useCallback, useState } from "react";
import { YYC3LogoSvg } from "../assets/YYC3LogoSvg";

export interface FloatingButtonProps {
  onClick: () => void;
  isMobile?: boolean;
  tooltip?: string;
}

export function FloatingButton({
  onClick,
  isMobile = false,
  tooltip = "AI 智能助理 (⌘J)",
}: FloatingButtonProps) {
  const [showTooltip, setShowTooltip] = useState(false);

  const handleClick = useCallback(() => {
    onClick();
    setShowTooltip(false);
  }, [onClick]);

  const handleTouchStart = useCallback(() => {
    setShowTooltip(true);
    setTimeout(() => setShowTooltip(false), 2000);
  }, []);

  return (
    <button
      onClick={handleClick}
      onTouchStart={handleTouchStart}
      className="fixed z-60 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00d4ff] focus-visible:ring-offset-2 focus-visible:ring-offset-black"
      style={{
        bottom: isMobile ? `calc(16px + env(safe-area-inset-bottom, 0px))` : 24,
        right: isMobile ? 16 : 24,
      }}
      aria-label="打开 AI 智能助理"
    >
      <div
        className="relative rounded-2xl bg-linear-to-br from-[#00d4ff] to-[#7b2ff7] flex items-center justify-center shadow-[0_0_30px_rgba(0,180,255,0.4)] hover:shadow-[0_0_40px_rgba(0,180,255,0.6)] transition-all hover:scale-105 active:scale-95"
        style={{ width: isMobile ? 52 : 56, height: isMobile ? 52 : 56 }}
      >
        <YYC3LogoSvg size={isMobile ? 26 : 28} showText={false} className="rounded-md" />
        <div className="absolute inset-0 rounded-2xl bg-linear-to-br from-[#00d4ff] to-[#7b2ff7] animate-ping opacity-20" />
        <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#00ff88] flex items-center justify-center shadow-[0_0_8px_rgba(0,255,136,0.5)]">
          <Sparkles className="w-3 h-3 text-[#060e1f]" />
        </div>
      </div>

      {/* 桌面端: hover tooltip | 移动端: touch tooltip */}
      {(isMobile ? showTooltip : true) && (
        <div
          className={`
            absolute bottom-full right-0 mb-2 px-3 py-1.5 rounded-lg
            bg-[rgba(8,25,55,0.95)] border border-[rgba(0,180,255,0.2)]
            whitespace-nowrap pointer-events-none select-none
            ${isMobile
              ? (showTooltip ? "opacity-100" : "opacity-0")
              : "opacity-0 group-hover:opacity-100"
            }
            transition-opacity duration-200
          `}
        >
          <span className="text-[#00d4ff] text-xs">{tooltip}</span>
        </div>
      )}
    </button>
  );
}
