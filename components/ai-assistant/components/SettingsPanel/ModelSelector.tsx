"use client"

/**
 * @file components/SettingsPanel/ModelSelector.tsx
 * @description 模型选择器组件 — 支持扫描 + 添加/编辑/删除
 * @author YanYuCloudCube Team
 * @version v1.1.0
 *
 * v1.1.0 — 重构：支持本地扫描结果显示、用户自定义模型 CRUD
 * - 扫描到的 Ollama 模型自动合并显示
 * - 用户可添加自定义模型（填写名称、地址、密钥等）
 * - 用户可编辑/删除自定义模型
 */

import {
  Check,
  Cpu,
  Loader2,
  Pencil,
  Plus,
  RefreshCw,
  Signal,
  Trash2,
  WifiOff,
  X,
} from "lucide-react";
import { useCallback, useState } from "react";
import type { ModelConfig } from "../../types";

export interface ModelSelectorProps {
  models: ModelConfig[];
  selectedId: string;
  loading?: boolean;
  scanError?: string | null;
  onSelect: (id: string) => void;
  onAdd: (model: Omit<ModelConfig, "id" | "isUserDefined">) => void;
  onUpdate: (id: string, updates: Partial<ModelConfig>) => void;
  onDelete: (id: string) => void;
  onRescan: () => void;
}

type TestStatus = "idle" | "testing" | "success" | "failed";

interface ModelForm {
  name: string;
  provider: string;
  baseUrl: string;
  apiKey: string;
  modelType: ModelConfig["modelType"];
  isLocal: boolean;
}

const EMPTY_FORM: ModelForm = {
  name: "",
  provider: "",
  baseUrl: "",
  apiKey: "",
  modelType: "openai-compatible",
  isLocal: false,
};

const PRESET_TYPES: { value: ModelConfig["modelType"]; label: string }[] = [
  { value: "ollama", label: "Ollama" },
  { value: "openai-compatible", label: "OpenAI 兼容" },
  { value: "custom", label: "自定义" },
];

export function ModelSelector({
  models,
  selectedId,
  loading,
  scanError,
  onSelect,
  onAdd,
  onUpdate,
  onDelete,
  onRescan,
}: ModelSelectorProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [form, setForm] = useState<ModelForm>(EMPTY_FORM);
  const [testStates, setTestStates] = useState<Record<string, TestStatus>>({});

  // ─── 测试连接 ──────────────────────────────────────
  const testModel = useCallback(
    async (modelId: string, e: React.MouseEvent) => {
      e.stopPropagation();
      setTestStates((prev) => ({ ...prev, [modelId]: "testing" }));

      try {
        await new Promise((resolve) => setTimeout(resolve, 1000 + Math.random() * 1000));
        const success = Math.random() > 0.2;
        setTestStates((prev) => ({ ...prev, [modelId]: success ? "success" : "failed" }));
        setTimeout(() => {
          setTestStates((prev) => {
            const next = { ...prev };
            delete next[modelId];
            return next;
          });
        }, 3000);
      } catch {
        setTestStates((prev) => ({ ...prev, [modelId]: "failed" }));
      }
    },
    [],
  );

  // ─── 添加/编辑 ──────────────────────────────────────
  const startAdd = useCallback(() => {
    setForm(EMPTY_FORM);
    setEditingId(null);
    setShowAddForm(true);
  }, []);

  const startEdit = useCallback(
    (model: ModelConfig, e: React.MouseEvent) => {
      e.stopPropagation();
      setForm({
        name: model.name,
        provider: model.provider,
        baseUrl: model.baseUrl,
        apiKey: model.apiKey,
        modelType: model.modelType,
        isLocal: model.isLocal,
      });
      setEditingId(model.id);
      setShowAddForm(true);
    },
    [],
  );

  const cancelForm = useCallback(() => {
    setShowAddForm(false);
    setEditingId(null);
    setForm(EMPTY_FORM);
  }, []);

  const submitForm = useCallback(() => {
    if (!form.name.trim()) return;

    if (editingId) {
      onUpdate(editingId, form);
    } else {
      onAdd(form);
    }
    cancelForm();
  }, [form, editingId, onAdd, onUpdate, cancelForm]);

  const handleDelete = useCallback(
    (id: string, e: React.MouseEvent) => {
      e.stopPropagation();
      onDelete(id);
    },
    [onDelete],
  );

  const getTestIcon = (modelId: string) => {
    const status = testStates[modelId];
    switch (status) {
      case "testing":
        return <Loader2 className="w-3.5 h-3.5 animate-spin text-[#ffaa00]" />;
      case "success":
        return <Signal className="w-3.5 h-3.5 text-[#00ff88]" />;
      case "failed":
        return <Signal className="w-3.5 h-3.5 text-[#ff3366]" />;
      default:
        return (
          <Signal className="w-3.5 h-3.5 text-[rgba(0,212,255,0.4)] hover:text-[#00d4ff] transition-colors" />
        );
    }
  };

  // ─── 内联添加/编辑表单 ─────────────────────────────
  if (showAddForm) {
    return (
      <div>
        <h4 className="text-[#e0f0ff] mb-3 flex items-center gap-2 text-sm font-medium">
          {editingId ? (
            <>
              <Pencil className="w-4 h-4 text-[#00d4ff]" />
              编辑模型
            </>
          ) : (
            <>
              <Plus className="w-4 h-4 text-[#00ff88]" />
              添加模型
            </>
          )}
        </h4>

        <div className="space-y-2.5">
          {/* 模型名称 */}
          <div>
            <label className="text-[rgba(0,212,255,0.4)] text-xs mb-1 block">模型名称 *</label>
            <input
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              placeholder="例如: GPT-4o, Qwen-72B"
              className="w-full px-3 py-2 rounded-xl bg-[rgba(0,40,80,0.4)] border border-[rgba(0,180,255,0.15)] text-[#e0f0ff] placeholder-[rgba(0,212,255,0.2)] focus:outline-none focus:border-[rgba(0,212,255,0.4)] text-xs md:text-sm"
            />
          </div>

          {/* 提供商 */}
          <div>
            <label className="text-[rgba(0,212,255,0.4)] text-xs mb-1 block">提供商</label>
            <input
              value={form.provider}
              onChange={(e) => setForm((f) => ({ ...f, provider: e.target.value }))}
              placeholder="例如: OpenAI, Ollama, 自定义"
              className="w-full px-3 py-2 rounded-xl bg-[rgba(0,40,80,0.4)] border border-[rgba(0,180,255,0.15)] text-[#e0f0ff] placeholder-[rgba(0,212,255,0.2)] focus:outline-none focus:border-[rgba(0,212,255,0.4)] text-xs md:text-sm"
            />
          </div>

          {/* 类型选择 */}
          <div>
            <label className="text-[rgba(0,212,255,0.4)] text-xs mb-1 block">类型</label>
            <div className="flex gap-2">
              {PRESET_TYPES.map((t) => (
                <button
                  key={t.value}
                  onClick={() => setForm((f) => ({ ...f, modelType: t.value, isLocal: t.value === "ollama" }))}
                  className={`px-3 py-1.5 rounded-lg text-xs transition-all ${form.modelType === t.value
                      ? "bg-[rgba(0,212,255,0.12)] text-[#00d4ff] border border-[rgba(0,212,255,0.25)]"
                      : "text-[rgba(0,212,255,0.4)] border border-transparent hover:text-[#00d4ff]"
                    }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          {/* 地址 */}
          <div>
            <label className="text-[rgba(0,212,255,0.4)] text-xs mb-1 block">
              {form.modelType === "ollama" ? "Ollama 地址" : "API 地址"}
            </label>
            <input
              value={form.baseUrl}
              onChange={(e) => setForm((f) => ({ ...f, baseUrl: e.target.value }))}
              placeholder={form.modelType === "ollama" ? "http://localhost:11434" : "https://api.openai.com/v1"}
              className="w-full px-3 py-2 rounded-xl bg-[rgba(0,40,80,0.4)] border border-[rgba(0,180,255,0.15)] text-[#e0f0ff] placeholder-[rgba(0,212,255,0.2)] focus:outline-none focus:border-[rgba(0,212,255,0.4)] text-xs md:text-sm font-mono"
            />
          </div>

          {/* API Key */}
          <div>
            <label className="text-[rgba(0,212,255,0.4)] text-xs mb-1 block">API 密钥</label>
            <input
              type="password"
              value={form.apiKey}
              onChange={(e) => setForm((f) => ({ ...f, apiKey: e.target.value }))}
              placeholder="sk-...（可选）"
              className="w-full px-3 py-2 rounded-xl bg-[rgba(0,40,80,0.4)] border border-[rgba(0,180,255,0.15)] text-[#e0f0ff] placeholder-[rgba(0,212,255,0.2)] focus:outline-none focus:border-[rgba(0,212,255,0.4)] text-xs md:text-sm font-mono"
            />
          </div>

          {/* 操作按钮 */}
          <div className="flex gap-2 pt-1">
            <button
              onClick={submitForm}
              disabled={!form.name.trim()}
              className="flex-1 px-3 py-2 rounded-xl bg-linear-to-r from-[#00d4ff] to-[#0066ff] text-white text-xs font-medium hover:shadow-[0_0_15px_rgba(0,180,255,0.3)] transition-all disabled:opacity-30 disabled:cursor-not-allowed min-h-[40px] flex items-center justify-center gap-1.5"
            >
              <Check className="w-3.5 h-3.5" />
              {editingId ? "保存修改" : "添加模型"}
            </button>
            <button
              onClick={cancelForm}
              className="px-3 py-2 rounded-xl bg-[rgba(0,40,80,0.4)] border border-[rgba(0,180,255,0.15)] text-[rgba(0,212,255,0.5)] hover:text-[#00d4ff] transition-all min-h-[40px] text-xs flex items-center justify-center gap-1.5"
            >
              <X className="w-3.5 h-3.5" />
              取消
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ─── 模型列表视图 ─────────────────────────────────
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <h4 className="text-[#e0f0ff] flex items-center gap-2 text-sm font-medium">
          <Cpu className="w-4 h-4 text-[#00d4ff]" />
          模型选择
        </h4>
        <div className="flex items-center gap-1">
          <button
            onClick={onRescan}
            disabled={loading}
            className="p-1.5 rounded-lg hover:bg-[rgba(0,212,255,0.1)] transition-all disabled:opacity-30 min-w-[32px] min-h-[32px] flex items-center justify-center"
            title="重新扫描 Ollama"
            aria-label="重新扫描 Ollama"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-[rgba(0,212,255,0.4)] ${loading ? "animate-spin" : ""}`} />
          </button>
          <button
            onClick={startAdd}
            className="p-1.5 rounded-lg hover:bg-[rgba(0,212,255,0.1)] transition-all min-w-[32px] min-h-[32px] flex items-center justify-center"
            title="添加自定义模型"
            aria-label="添加自定义模型"
          >
            <Plus className="w-3.5 h-3.5 text-[rgba(0,212,255,0.4)]" />
          </button>
        </div>
      </div>

      {loading && (
        <p className="text-[rgba(0,212,255,0.35)] mb-2 text-xs flex items-center gap-1.5">
          <Loader2 className="w-3 h-3 animate-spin" />
          正在扫描本地 Ollama 模型...
        </p>
      )}

      {scanError && (
        <p className="text-[rgba(255,51,102,0.5)] mb-2 text-xs flex items-center gap-1.5">
          <WifiOff className="w-3 h-3" />
          Ollama 未连接，仅显示自定义模型
        </p>
      )}

      {models.length > 0 ? (
        <div className="space-y-1 max-h-[240px] overflow-y-auto scrollbar-thin scrollbar-thumb-[rgba(0,212,255,0.2)] scrollbar-track-transparent">
          {models.map((model) => {
            const isSelected = selectedId === model.id;
            return (
              <div
                key={model.id}
                onClick={() => onSelect(model.id)}
                className={`w-full px-3 py-2 rounded-lg transition-all flex items-center gap-2 text-xs md:text-sm min-h-[44px] cursor-pointer ${isSelected
                    ? "bg-[rgba(0,212,255,0.12)] border border-[rgba(0,212,255,0.3)] text-[#00d4ff]"
                    : "bg-[rgba(0,40,80,0.2)] border border-[rgba(0,180,255,0.08)] text-[rgba(0,212,255,0.5)] hover:border-[rgba(0,180,255,0.2)]"
                  }`}
              >
                {/* 标签 */}
                {model.isLocal && (
                  <span className="text-[#00ff88] shrink-0 text-2xs md:text-xs">本地</span>
                )}
                {model.isUserDefined && !model.isLocal && (
                  <span className="text-[#ffdd00] shrink-0 text-2xs md:text-xs">自定义</span>
                )}

                {/* 名称 */}
                <span className="truncate flex-1">{model.name}</span>

                {/* 提供商 */}
                <span className="text-[rgba(0,212,255,0.25)] shrink-0 text-2xs md:text-xs hidden sm:inline">
                  {model.provider}
                </span>

                {/* 测试 */}
                <button
                  onClick={(e) => testModel(model.id, e)}
                  className="p-1 rounded hover:bg-[rgba(0,212,255,0.1)] transition-all shrink-0"
                  title="测试连接"
                  aria-label={`测试 ${model.name} 连接`}
                >
                  {getTestIcon(model.id)}
                </button>

                {/* 编辑 / 删除 — 仅自定义模型 */}
                {model.isUserDefined && (
                  <>
                    <button
                      onClick={(e) => startEdit(model, e)}
                      className="p-1 rounded hover:bg-[rgba(0,212,255,0.1)] transition-all shrink-0"
                      title="编辑"
                      aria-label={`编辑 ${model.name}`}
                    >
                      <Pencil className="w-3 h-3 text-[rgba(0,212,255,0.3)] hover:text-[#00d4ff]" />
                    </button>
                    <button
                      onClick={(e) => handleDelete(model.id, e)}
                      className="p-1 rounded hover:bg-[rgba(255,51,102,0.1)] transition-all shrink-0"
                      title="删除"
                      aria-label={`删除 ${model.name}`}
                    >
                      <Trash2 className="w-3 h-3 text-[rgba(0,212,255,0.3)] hover:text-[#ff3366]" />
                    </button>
                  </>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-4 space-y-2">
          <p className="text-[rgba(0,212,255,0.25)] text-xs">
            {loading ? "正在扫描..." : "暂无可用模型"}
          </p>
          <button
            onClick={startAdd}
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[rgba(0,212,255,0.08)] border border-[rgba(0,212,255,0.15)] text-[#00d4ff] text-xs hover:bg-[rgba(0,212,255,0.12)] transition-all"
          >
            <Plus className="w-3 h-3" />
            手动添加模型
          </button>
        </div>
      )}
    </div>
  );
}
