"use client"

/**
 * @file hooks/useModelProvider.ts
 * @description AI 模型提供者 Hook — 支持 Ollama 本地扫描 + 用户自定义模型 CRUD
 * @author YanYuCloudCube Team
 * @version v1.1.0
 *
 * v1.1.0 — 替代硬编码 MOCK_MODELS，实现：
 * - 扫描本地 Ollama 服务获取已安装模型
 * - 用户手动添加/编辑/删除自定义模型
 * - localStorage 持久化自定义模型
 * - 合并扫描结果与自定义模型列表
 */

import { useState, useCallback, useEffect, useRef } from "react";
import type { ModelConfig } from "../types";
import {
  scanOllamaModels,
  loadCustomModels,
  addCustomModel as addModel,
  updateCustomModel as updateModel,
  deleteCustomModel as deleteModel,
  mergeModels,
} from "../services/modelService";

export interface ModelProviderReturn {
  /** 合并后的可用模型列表（Ollama 扫描 + 自定义） */
  availableModels: ModelConfig[];
  /** 是否正在加载（Ollama 扫描中） */
  ollamaLoading: boolean;
  /** 最近一次扫描错误信息 */
  scanError: string | null;
  /** 重新扫描 Ollama */
  rescan: () => Promise<void>;
  /** 添加自定义模型 */
  addCustomModel: (model: Omit<ModelConfig, "id" | "isUserDefined">) => void;
  /** 更新模型（ollama 或自定义均可） */
  updateModel: (id: string, updates: Partial<ModelConfig>) => void;
  /** 删除自定义模型 */
  deleteModel: (id: string) => void;
}

export function useModelProvider(): ModelProviderReturn {
  const [ollamaModels, setOllamaModels] = useState<ModelConfig[]>([]);
  const [customModels, setCustomModels] = useState<ModelConfig[]>([]);
  const [ollamaLoading, setOllamaLoading] = useState(true);
  const [scanError, setScanError] = useState<string | null>(null);
  const scannedRef = useRef(false);

  const scan = useCallback(async () => {
    setOllamaLoading(true);
    setScanError(null);
    try {
      const result = await scanOllamaModels();
      setOllamaModels(result);
      if (result.length === 0) {
        // 非阻塞：Ollama 未运行也可接受
      }
    } catch {
      setScanError("无法连接到 Ollama 服务");
      setOllamaModels([]);
    } finally {
      setOllamaLoading(false);
    }
  }, []);

  // 初始扫描
  useEffect(() => {
    if (scannedRef.current) return;
    scannedRef.current = true;
    setCustomModels(loadCustomModels());
    scan();
  }, [scan]);

  // 合并模型
  const availableModels = mergeModels(ollamaModels, customModels);

  const handleAddCustom = useCallback(
    (model: Omit<ModelConfig, "id" | "isUserDefined">) => {
      const updated = addModel(model);
      setCustomModels(updated);
    },
    [],
  );

  const handleUpdateModel = useCallback(
    (id: string, updates: Partial<ModelConfig>) => {
      const target =
        customModels.find((m) => m.id === id) ??
        ollamaModels.find((m) => m.id === id);
      if (!target) return;

      if (target.isUserDefined) {
        // 更新自定义模型
        const updated = updateModel(id, { ...updates, id, isUserDefined: true });
        setCustomModels(updated);
      } else {
        // ollama 模型无法原地编辑，而是创建一个自定义覆盖版本
        const updated = addModel({ ...target, ...updates });
        setCustomModels(updated);
      }
    },
    [customModels, ollamaModels],
  );

  const handleDeleteModel = useCallback(
    (id: string) => {
      const updated = deleteModel(id);
      setCustomModels(updated);
    },
    [],
  );

  return {
    availableModels,
    ollamaLoading,
    scanError,
    rescan: scan,
    addCustomModel: handleAddCustom,
    updateModel: handleUpdateModel,
    deleteModel: handleDeleteModel,
  };
}
