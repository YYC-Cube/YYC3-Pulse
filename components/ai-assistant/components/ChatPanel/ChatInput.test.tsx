/**
 * @file ChatInput.test.tsx
 * @description AI Assistant — ChatInput 组件测试
 */

import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { ChatInput } from "@/components/ai-assistant/components/ChatPanel/ChatInput";

describe("ChatInput", () => {
  it("should render input and send button", () => {
    render(<ChatInput value="" onChange={() => {}} onSend={() => {}} />);

    const textarea = screen.getByPlaceholderText(/输入指令/);
    expect(textarea).toBeInTheDocument();

    const sendButton = screen.getByRole("button", { name: /发送消息/i });
    expect(sendButton).toBeInTheDocument();
  });

  it("should disable send button when input is empty", () => {
    render(<ChatInput value="" onChange={() => {}} onSend={() => {}} />);

    const sendButton = screen.getByRole("button", { name: /发送消息/i });
    expect(sendButton).toBeDisabled();
  });

  it("should enable send button when input has value", () => {
    render(<ChatInput value="hello" onChange={() => {}} onSend={() => {}} />);

    const sendButton = screen.getByRole("button", { name: /发送消息/i });
    expect(sendButton).not.toBeDisabled();
  });

  it("should call onSend when Enter is pressed", () => {
    const onSend = vi.fn();
    render(<ChatInput value="test" onChange={() => {}} onSend={onSend} />);

    const textarea = screen.getByPlaceholderText(/输入指令/);
    fireEvent.keyDown(textarea, { key: "Enter", shiftKey: false });

    expect(onSend).toHaveBeenCalledTimes(1);
  });

  it("should not call onSend when Shift+Enter is pressed", () => {
    const onSend = vi.fn();
    render(<ChatInput value="test" onChange={() => {}} onSend={onSend} />);

    const textarea = screen.getByPlaceholderText(/输入指令/);
    fireEvent.keyDown(textarea, { key: "Enter", shiftKey: true });

    expect(onSend).not.toHaveBeenCalled();
  });

  it("should call onChange when typing", () => {
    const onChange = vi.fn();
    render(<ChatInput value="" onChange={onChange} onSend={() => {}} />);

    const textarea = screen.getByPlaceholderText(/输入指令/);
    fireEvent.change(textarea, { target: { value: "新消息" } });

    expect(onChange).toHaveBeenCalledWith("新消息");
  });

  it("should be disabled when disabled prop is true", () => {
    render(<ChatInput value="" onChange={() => {}} onSend={() => {}} disabled={true} />);

    const textarea = screen.getByPlaceholderText(/输入指令/);
    expect(textarea).toBeDisabled();
  });
});
