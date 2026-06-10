/**
 * @file services/modelService.ts
 * @description AI 模型扫描服务 — 支持 Ollama 本地扫描 + 用户自定义模型 CRUD
 * @author YanYuCloudCube Team
 * @version v1.0.0
 */

import type { ModelConfig, OllamaTagsResponse } from "../types";

/** localStorage key */
const CUSTOM_MODELS_KEY = "yyc3_custom_models";

// ─── Ollama 扫描 ─────────────────────────────────────────

const DEFAULT_OLLAMA_URL = "http://localhost:11434";

/**
 * 扫描本地 Ollama 服务，获取已安装的模型列表
 * @param baseUrl Ollama 服务地址，默认 localhost:11434
 */
export async function scanOllamaModels(baseUrl = DEFAULT_OLLAMA_URL): Promise<ModelConfig[]> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);

    const res = await fetch(`${baseUrl}/api/tags`, {
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    if (!res.ok) return [];

    const data: OllamaTagsResponse = await res.json();

    if (!data?.models || !Array.isArray(data.models)) return [];

    return data.models.map((m) => {
      const name = m.name.replace(/:latest$/, "");
      const paramSize =
        m.details?.parameter_size ?? (m.name.toLowerCase().includes("72b") ? "72B" : "");

      return {
        id: `ollama-${name}`,
        name: paramSize ? `${name} (${paramSize})` : name,
        provider: `Ollama${paramSize ? ` · ${paramSize}` : ""}`,
        baseUrl,
        apiKey: "",
        modelType: "ollama" as const,
        isLocal: true,
        isUserDefined: false,
      };
    });
  } catch {
    // Ollama 未运行或不可达，静默失败
    return [];
  }
}

// ─── 用户自定义模型 CRUD ─────────────────────────────────

/** 读取 localStorage 中的自定义模型 */
export function loadCustomModels(): ModelConfig[] {
  try {
    const raw = localStorage.getItem(CUSTOM_MODELS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

/** 保存自定义模型列表到 localStorage */
function saveCustomModels(models: ModelConfig[]): void {
  try {
    localStorage.setItem(CUSTOM_MODELS_KEY, JSON.stringify(models));
  } catch { /* ignore */ }
}

/** 添加自定义模型 */
export function addCustomModel(model: Omit<ModelConfig, "id" | "isUserDefined">): ModelConfig[] {
  const models = loadCustomModels();
  const newModel: ModelConfig = {
    ...model,
    id: `custom-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    isUserDefined: true,
  };
  models.push(newModel);
  saveCustomModels(models);
  return models;
}

/** 更新自定义模型 */
export function updateCustomModel(id: string, updates: Partial<ModelConfig>): ModelConfig[] {
  const models = loadCustomModels();
  const idx = models.findIndex((m) => m.id === id);
  if (idx === -1) return models;
  models[idx] = { ...models[idx], ...updates };
  saveCustomModels(models);
  return models;
}

/** 删除自定义模型 */
export function deleteCustomModel(id: string): ModelConfig[] {
  const models = loadCustomModels().filter((m) => m.id !== id);
  saveCustomModels(models);
  return models;
}

/** 合并 Ollama 扫描结果与自定义模型（自定义模型去重覆盖） */
export function mergeModels(ollamaModels: ModelConfig[], customModels: ModelConfig[]): ModelConfig[] {
  const ollamaIds = new Set(ollamaModels.map((m) => m.id));
  // 排除已被用户自定义模型覆盖的 ollama 模型 ID
  const customOllamaOverrides = customModels
    .filter((m) => m.modelType === "ollama")
    .map((m) => m.id.replace(/^custom-/, "ollama-"));
  const filteredOllama = ollamaModels.filter((m) => !customOllamaOverrides.includes(m.id));
  return [...filteredOllama, ...customModels];
}
