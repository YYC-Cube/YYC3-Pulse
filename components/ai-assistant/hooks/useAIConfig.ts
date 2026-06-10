"use client"

/**
 * @file hooks/useAIConfig.ts
 * @description AI 配置状态管理 Hook
 * @author YanYuCloudCube Team
 * @version v1.1.0
 *
 * v1.1.0 — 暴露模型 CRUD 方法，支持本地扫描 + 用户自编辑
 */

import { useCallback, useEffect } from "react";
import type { ModelConfig } from "../types";
import { useSettingsStore } from "./stubs/useSettingsStore";
import { useModelProvider } from "./useModelProvider";

export interface UseAIConfigReturn {
  // API Key
  apiKey: string;
  setApiKey: (value: string) => void;
  showApiKey: boolean;
  setShowApiKey: (value: boolean) => void;

  // 模型选择
  selectedModel: string;
  setSelectedModel: (value: string) => void;

  // 模型列表 & 扫描
  availableModels: ModelConfig[];
  ollamaLoading: boolean;
  scanError: string | null;
  rescan: () => Promise<void>;

  // 模型 CRUD
  addCustomModel: (model: Omit<ModelConfig, "id" | "isUserDefined">) => void;
  updateModel: (id: string, updates: Partial<ModelConfig>) => void;
  deleteModel: (id: string) => void;

  // 推理参数
  temperature: number;
  setTemperature: (value: number) => void;
  topP: number;
  setTopP: (value: number) => void;
  maxTokens: number;
  setMaxTokens: (value: number) => void;
}

export function useAIConfig(): UseAIConfigReturn {
  const {
    availableModels,
    ollamaLoading,
    scanError,
    rescan,
    addCustomModel,
    updateModel,
    deleteModel: deleteModelFn,
  } = useModelProvider();

  const { values: settingsValues, updateValue: updateSettingsValue } = useSettingsStore();

  const apiKey = settingsValues.aiApiKey;
  const setApiKey = useCallback(
    (v: string) => updateSettingsValue("aiApiKey", v),
    [updateSettingsValue]
  );

  const selectedModel = settingsValues.aiModel;
  const setSelectedModel = useCallback(
    (v: string) => updateSettingsValue("aiModel", v),
    [updateSettingsValue]
  );

  const temperature = parseFloat(settingsValues.aiTemperature) || 0.7;
  const setTemperature = useCallback(
    (v: number) => updateSettingsValue("aiTemperature", String(v)),
    [updateSettingsValue]
  );

  const topP = parseFloat(settingsValues.aiTopP) || 0.9;
  const setTopP = useCallback(
    (v: number) => updateSettingsValue("aiTopP", String(v)),
    [updateSettingsValue]
  );

  const maxTokens = parseInt(settingsValues.aiMaxTokens) || 2048;
  const setMaxTokens = useCallback(
    (v: number) => updateSettingsValue("aiMaxTokens", String(v)),
    [updateSettingsValue]
  );

  useEffect(() => {
    if (!selectedModel && availableModels.length > 0) {
      setSelectedModel(availableModels[0].id);
    }
  }, [availableModels, selectedModel, setSelectedModel]);

  return {
    apiKey,
    setApiKey,
    showApiKey: false,
    setShowApiKey: () => { },
    selectedModel,
    setSelectedModel,
    availableModels,
    ollamaLoading,
    scanError,
    rescan,
    addCustomModel,
    updateModel,
    deleteModel: deleteModelFn,
    temperature,
    setTemperature,
    topP,
    setTopP,
    maxTokens,
    setMaxTokens,
  };
}
