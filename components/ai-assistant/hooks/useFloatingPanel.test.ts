/**
 * @file useFloatingPanel.test.ts
 * @description AI Assistant — useFloatingPanel Hook 测试
 */

import { useFloatingPanel } from "@/components/ai-assistant/hooks/useFloatingPanel";
import { act, renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";

describe("useFloatingPanel", () => {
  it("should initialize with closed state", () => {
    const { result } = renderHook(() => useFloatingPanel());

    expect(result.current.isOpen).toBe(false);
    expect(result.current.isMaximized).toBe(false);
    expect(result.current.activeTab).toBe("chat");
  });

  it("should open and close the panel", () => {
    const { result } = renderHook(() => useFloatingPanel());

    act(() => {
      result.current.openPanel();
    });
    expect(result.current.isOpen).toBe(true);

    act(() => {
      result.current.closePanel();
    });
    expect(result.current.isOpen).toBe(false);
    expect(result.current.isMaximized).toBe(false);
  });

  it("should toggle maximize state", () => {
    const { result } = renderHook(() => useFloatingPanel({ defaultOpen: true }));

    act(() => {
      result.current.toggleMaximize();
    });
    expect(result.current.isMaximized).toBe(true);

    act(() => {
      result.current.toggleMaximize();
    });
    expect(result.current.isMaximized).toBe(false);
  });

  it("should switch active tab", () => {
    const { result } = renderHook(() => useFloatingPanel());

    act(() => {
      result.current.setActiveTab("commands");
    });
    expect(result.current.activeTab).toBe("commands");

    act(() => {
      result.current.setActiveTab("settings");
    });
    expect(result.current.activeTab).toBe("settings");
  });

  it("should provide mobile panel class", () => {
    const { result } = renderHook(() => useFloatingPanel({ isMobile: true, defaultOpen: true }));

    expect(result.current.panelClass).toContain("inset-x-0");
    expect(result.current.panelClass).toContain("bottom-0");
    expect(result.current.panelClass).not.toContain("top-[10vh]");
    expect(result.current.mobilePanelStyle).toBeDefined();
  });

  it("should provide desktop panel class", () => {
    const { result } = renderHook(() => useFloatingPanel({ defaultOpen: true }));

    expect(result.current.panelClass).toContain("bottom-4");
    expect(result.current.panelClass).toContain("right-4");
  });

  it("should provide maximized panel class", () => {
    const { result } = renderHook(() => useFloatingPanel({ defaultOpen: true }));

    act(() => {
      result.current.toggleMaximize();
    });

    expect(result.current.panelClass).toContain("inset-4");
  });
});
