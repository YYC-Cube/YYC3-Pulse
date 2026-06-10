"use client"

/**
 * @file hooks/stubs/useSettingsStore.ts
 * @description useSettingsStore — 本地存储持久化实现
 * @author YanYuCloudCube Team
 * @version v1.1.0
 *
 * v1.1.0 — 新增 customModels 字段，支持用户自定义模型持久化
 */

import { useCallback, useState } from "react";

export interface SettingsValues {
  aiApiKey: string;
  aiModel: string;
  aiTemperature: string;
  aiTopP: string;
  aiMaxTokens: string;
  aiBaseUrl: string;
}

const DEFAULT_VALUES: SettingsValues = {
  aiApiKey: "",
  aiModel: "",
  aiTemperature: "0.7",
  aiTopP: "0.9",
  aiMaxTokens: "2048",
  aiBaseUrl: "",
};

export function useSettingsStore() {
  const [values, setValues] = useState<SettingsValues>(() => {
    try {
      const stored = localStorage.getItem("yyc3_settings");
      return stored ? { ...DEFAULT_VALUES, ...JSON.parse(stored) } : DEFAULT_VALUES;
    } catch {
      return DEFAULT_VALUES;
    }
  });

  const updateValue = useCallback((key: keyof SettingsValues, value: string) => {
    setValues((prev) => {
      const next = { ...prev, [key]: value };
      try {
        localStorage.setItem("yyc3_settings", JSON.stringify(next));
      } catch { /* ignore */ }
      return next;
    });
  }, []);

  return { values, updateValue };
}
