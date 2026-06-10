/**
 * @file services/modelService.test.ts
 * @description AI 模型扫描服务 — 单元测试
 */

import { beforeEach, describe, expect, it, vi } from "vitest";
import type { ModelConfig } from "../types";
import {
  addCustomModel,
  deleteCustomModel,
  loadCustomModels,
  mergeModels,
  scanOllamaModels,
  updateCustomModel,
} from "./modelService";

const SAMPLE_MODEL: Omit<ModelConfig, "id" | "isUserDefined"> = {
  name: "Test-Model",
  provider: "TestProvider",
  baseUrl: "http://test:11434",
  apiKey: "sk-test",
  modelType: "openai-compatible",
  isLocal: false,
};

describe("modelService — 自定义模型 CRUD", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("should return empty list when no custom models exist", () => {
    expect(loadCustomModels()).toEqual([]);
  });

  it("should add a custom model", () => {
    const list = addCustomModel(SAMPLE_MODEL);
    expect(list).toHaveLength(1);
    expect(list[0].name).toBe("Test-Model");
    expect(list[0].isUserDefined).toBe(true);
    expect(list[0].id).toContain("custom-");
  });

  it("should persist custom models to localStorage", () => {
    addCustomModel(SAMPLE_MODEL);
    const loaded = loadCustomModels();
    expect(loaded).toHaveLength(1);
    expect(loaded[0].name).toBe("Test-Model");
  });

  it("should update a custom model", () => {
    const list = addCustomModel(SAMPLE_MODEL);
    const id = list[0].id;

    const updated = updateCustomModel(id, { name: "Updated-Model", provider: "UpdatedProvider" });
    expect(updated).toHaveLength(1);
    expect(updated[0].name).toBe("Updated-Model");
    expect(updated[0].provider).toBe("UpdatedProvider");
    // unchanged fields preserved
    expect(updated[0].baseUrl).toBe("http://test:11434");
  });

  it("should delete a custom model", () => {
    const list = addCustomModel(SAMPLE_MODEL);
    const id = list[0].id;

    addCustomModel({
      ...SAMPLE_MODEL,
      name: "Second-Model",
    });

    const remaining = deleteCustomModel(id);
    expect(remaining).toHaveLength(1);
    expect(remaining[0].name).toBe("Second-Model");
  });

  it("should handle delete of non-existent id gracefully", () => {
    addCustomModel(SAMPLE_MODEL);
    const result = deleteCustomModel("non-existent-id");
    expect(result).toHaveLength(1);
  });
});

describe("modelService — mergeModels", () => {
  it("should merge ollama models with custom models", () => {
    const ollama: ModelConfig[] = [
      {
        id: "ollama-llama3",
        name: "llama3 (8B)",
        provider: "Ollama · 8B",
        baseUrl: "http://localhost:11434",
        apiKey: "",
        modelType: "ollama",
        isLocal: true,
        isUserDefined: false,
      },
    ];

    const custom: ModelConfig[] = [
      {
        id: "custom-gpt4o",
        name: "GPT-4o",
        provider: "OpenAI",
        baseUrl: "https://api.openai.com/v1",
        apiKey: "sk-xxx",
        modelType: "openai-compatible",
        isLocal: false,
        isUserDefined: true,
      },
    ];

    const merged = mergeModels(ollama, custom);
    expect(merged).toHaveLength(2);
    expect(merged.some((m) => m.id === "ollama-llama3")).toBe(true);
    expect(merged.some((m) => m.id === "custom-gpt4o")).toBe(true);
  });

  it("should handle empty ollama list", () => {
    const custom: ModelConfig[] = [
      {
        id: "custom-only",
        name: "Only Model",
        provider: "Test",
        baseUrl: "",
        apiKey: "",
        modelType: "custom",
        isLocal: false,
        isUserDefined: true,
      },
    ];

    expect(mergeModels([], custom)).toHaveLength(1);
    expect(mergeModels([], [])).toEqual([]);
  });
});

describe("modelService — scanOllamaModels", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("should return empty array when Ollama is unreachable", async () => {
    vi.spyOn(globalThis, "fetch").mockRejectedValue(new Error("Connection refused"));
    const result = await scanOllamaModels();
    expect(result).toEqual([]);
  });

  it("should return empty array on non-200 response", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue({
      ok: false,
      status: 500,
    } as Response);
    const result = await scanOllamaModels();
    expect(result).toEqual([]);
  });

  it("should parse Ollama tags response correctly", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue({
      ok: true,
      json: () =>
        Promise.resolve({
          models: [
            {
              name: "llama3.1:8b",
              modified_at: "2024-01-01T00:00:00Z",
              size: 4700000000,
              digest: "abc123",
              details: {
                format: "gguf",
                family: "llama",
                families: ["llama"],
                parameter_size: "8B",
                quantization_level: "Q4_K_M",
              },
            },
            {
              name: "qwen2.5:72b",
              modified_at: "2024-01-02T00:00:00Z",
              size: 42000000000,
              digest: "def456",
            },
          ],
        }),
    } as Response);

    const result = await scanOllamaModels();
    expect(result).toHaveLength(2);
    expect(result[0].name).toBe("llama3.1:8b (8B)");
    expect(result[0].isLocal).toBe(true);
    expect(result[0].modelType).toBe("ollama");
    expect(result[0].id).toBe("ollama-llama3.1:8b");

    // Without details, falls back to name-based detection
    expect(result[1].name).toBe("qwen2.5:72b (72B)");
    expect(result[1].id).toBe("ollama-qwen2.5:72b");
  });
});
