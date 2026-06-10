/**
 * @file FloatingButton.test.tsx
 * @description AI Assistant — FloatingButton 组件测试
 */

import { FloatingButton } from "@/components/ai-assistant/components/FloatingButton";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

describe("FloatingButton", () => {
  it("should render and respond to click", () => {
    const onClick = vi.fn();
    render(<FloatingButton onClick={onClick} />);

    const button = screen.getByRole("button", { name: /打开 AI 智能助理/i });
    expect(button).toBeInTheDocument();

    fireEvent.click(button);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("should render with tooltip", () => {
    const onClick = vi.fn();
    render(<FloatingButton onClick={onClick} tooltip="自定义提示" />);

    expect(screen.getByText("自定义提示")).toBeInTheDocument();
  });

  it("should apply mobile styles when isMobile is true", () => {
    const onClick = vi.fn();
    const { container } = render(<FloatingButton onClick={onClick} isMobile={true} />);

    const button = container.firstChild as HTMLElement;
    expect(button.style.bottom).toContain("safe-area-inset-bottom");
    expect(button.style.right).toBe("16px");
  });

  it("should apply desktop styles by default", () => {
    const onClick = vi.fn();
    const { container } = render(<FloatingButton onClick={onClick} />);

    const button = container.firstChild as HTMLElement;
    expect(button.style.bottom).toBe("24px");
    expect(button.style.right).toBe("24px");
  });
});
