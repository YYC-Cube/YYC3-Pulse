/**
 * @file ModelSelector.test.tsx
 * @description AI ModelSelector 组件测试（v1.1.0 含编辑/删除/添加）
 */

import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import type { ModelConfig } from "../../types";
import { ModelSelector, type ModelSelectorProps } from "./ModelSelector";

const MOCK_MODELS: ModelConfig[] = [
  {
    id: "ollama-llama3",
    name: "llama3 (8B)",
    provider: "Ollama",
    baseUrl: "http://localhost:11434",
    apiKey: "",
    modelType: "ollama",
    isLocal: true,
    isUserDefined: false,
  },
  {
    id: "custom-gpt4o",
    name: "GPT-4o",
    provider: "OpenAI",
    baseUrl: "https://api.openai.com/v1",
    apiKey: "sk-test",
    modelType: "openai-compatible",
    isLocal: false,
    isUserDefined: true,
  },
];

const defaultProps: ModelSelectorProps = {
  models: MOCK_MODELS,
  selectedId: "ollama-llama3",
  loading: false,
  scanError: null,
  onSelect: vi.fn(),
  onAdd: vi.fn(),
  onUpdate: vi.fn(),
  onDelete: vi.fn(),
  onRescan: vi.fn(),
};

describe("ModelSelector", () => {
  it("should render model list", () => {
    render(<ModelSelector {...defaultProps} />);

    expect(screen.getByText("llama3 (8B)")).toBeInTheDocument();
    expect(screen.getByText("GPT-4o")).toBeInTheDocument();
  });

  it("should display '本地' tag for local models", () => {
    render(<ModelSelector {...defaultProps} />);

    const localTags = screen.getAllByText("本地");
    expect(localTags).toHaveLength(1);
  });

  it("should display '自定义' tag for user-defined models", () => {
    render(<ModelSelector {...defaultProps} />);

    const customTags = screen.getAllByText("自定义");
    expect(customTags).toHaveLength(1);
  });

  it("should call onSelect when a model is clicked", () => {
    const onSelect = vi.fn();
    render(<ModelSelector {...defaultProps} onSelect={onSelect} />);

    fireEvent.click(screen.getByText("GPT-4o"));
    expect(onSelect).toHaveBeenCalledWith("custom-gpt4o");
  });

  it("should show loading indicator", () => {
    render(<ModelSelector {...defaultProps} loading={true} />);

    expect(screen.getByText(/正在扫描本地 Ollama/)).toBeInTheDocument();
  });

  it("should show scan error message", () => {
    render(<ModelSelector {...defaultProps} scanError="Connection failed" />);

    expect(screen.getByText(/Ollama 未连接/)).toBeInTheDocument();
  });

  it("should call onRescan when refresh button is clicked", () => {
    const onRescan = vi.fn();
    render(<ModelSelector {...defaultProps} onRescan={onRescan} />);

    fireEvent.click(screen.getByLabelText("重新扫描 Ollama"));
    expect(onRescan).toHaveBeenCalledTimes(1);
  });

  it("should show empty state when no models", () => {
    render(<ModelSelector {...defaultProps} models={[]} />);

    expect(screen.getByText("暂无可用模型")).toBeInTheDocument();
    expect(screen.getByText("手动添加模型")).toBeInTheDocument();
  });

  it("should open add form when '+' button is clicked", () => {
    render(<ModelSelector {...defaultProps} />);

    fireEvent.click(screen.getByLabelText("添加自定义模型"));
    expect(screen.getByRole("heading", { name: /添加模型/ })).toBeInTheDocument();
    expect(screen.getByPlaceholderText("例如: GPT-4o, Qwen-72B")).toBeInTheDocument();
  });

  it("should show edit/delete buttons only for user-defined models", () => {
    render(<ModelSelector {...defaultProps} />);

    // GPT-4o is user-defined — should have edit + delete
    const editBtn = screen.getByLabelText("编辑 GPT-4o");
    expect(editBtn).toBeInTheDocument();

    const deleteBtn = screen.getByLabelText("删除 GPT-4o");
    expect(deleteBtn).toBeInTheDocument();

    // llama3 is not user-defined — should NOT have edit/delete
    expect(screen.queryByLabelText("编辑 llama3 (8B)")).not.toBeInTheDocument();
    expect(screen.queryByLabelText("删除 llama3 (8B)")).not.toBeInTheDocument();
  });

  it("should call onDelete when delete button is clicked", () => {
    const onDelete = vi.fn();
    render(<ModelSelector {...defaultProps} onDelete={onDelete} />);

    const deleteBtn = screen.getByLabelText("删除 GPT-4o");
    fireEvent.click(deleteBtn);
    expect(onDelete).toHaveBeenCalledWith("custom-gpt4o");
  });

  it("should open edit form with pre-filled data when edit button is clicked", () => {
    render(<ModelSelector {...defaultProps} />);

    const editBtn = screen.getByLabelText("编辑 GPT-4o");
    fireEvent.click(editBtn);

    // Should see the edit form with pre-filled values
    expect(screen.getByRole("heading", { name: /编辑模型/ })).toBeInTheDocument();

    const nameInput = screen.getByDisplayValue("GPT-4o");
    expect(nameInput).toBeInTheDocument();

    const urlInput = screen.getByDisplayValue("https://api.openai.com/v1");
    expect(urlInput).toBeInTheDocument();
  });

  it("should call onAdd when add form is submitted", () => {
    const onAdd = vi.fn();
    render(<ModelSelector {...defaultProps} onAdd={onAdd} />);

    // Open add form
    fireEvent.click(screen.getByLabelText("添加自定义模型"));

    // Fill form
    const nameInput = screen.getByPlaceholderText("例如: GPT-4o, Qwen-72B");
    fireEvent.change(nameInput, { target: { value: "New-Model" } });

    // Submit
    const submitBtn = screen.getByRole("button", { name: /添加/ });
    fireEvent.click(submitBtn);

    expect(onAdd).toHaveBeenCalledWith(
      expect.objectContaining({ name: "New-Model" }),
    );
  });
});
