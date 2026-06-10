/**
 * @file useChat.test.ts
 * @description AI Assistant — useChat Hook 测试
 */

import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useChat } from "@/components/ai-assistant/hooks/useChat";

describe("useChat", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  it("should initialize with welcome message", () => {
    const { result } = renderHook(() => useChat());

    expect(result.current.messages).toHaveLength(1);
    expect(result.current.messages[0].role).toBe("assistant");
    expect(result.current.messages[0].content).toContain("智能助理");
  });

  it("should send a message and receive response", async () => {
    const { result } = renderHook(() => useChat());

    await act(async () => {
      result.current.sendMessage("查看集群状态");
      vi.advanceTimersByTime(2000);
    });

    // Should have user message + welcome + response
    expect(result.current.messages.length).toBeGreaterThanOrEqual(2);
    expect(result.current.messages[1].role).toBe("user");
    expect(result.current.messages[1].content).toBe("查看集群状态");
  });

  it("should not send empty messages", async () => {
    const { result } = renderHook(() => useChat());

    await act(async () => {
      result.current.sendMessage("  ");
    });

    // Only welcome message remains
    expect(result.current.messages).toHaveLength(1);
  });

  it("should clear chat history", async () => {
    const { result } = renderHook(() => useChat());

    await act(async () => {
      result.current.sendMessage("测试消息");
      vi.advanceTimersByTime(2000);
    });

    expect(result.current.messages.length).toBeGreaterThanOrEqual(2);

    await act(async () => {
      result.current.clearChat();
    });

    expect(result.current.messages).toHaveLength(1);
    expect(result.current.messages[0].content).toContain("已清空");
  });

  it("should apply preset and switch system role", async () => {
    const { result } = renderHook(() => useChat());

    await act(async () => {
      result.current.applyPreset("p1");
    });

    // System message should be added
    const lastMsg = result.current.messages[result.current.messages.length - 1];
    expect(lastMsg.role).toBe("system");
    expect(lastMsg.content).toContain("运维诊断专家");
  });

  it("should copy to clipboard", async () => {
    const writeText = vi.fn(() => Promise.resolve());
    Object.assign(navigator, {
      clipboard: { writeText },
    });

    const { result } = renderHook(() => useChat());

    await act(async () => {
      result.current.copyToClipboard("测试内容", "msg-1");
    });

    expect(writeText).toHaveBeenCalledWith("测试内容");
    expect(result.current.copiedId).toBe("msg-1");
  });
});
