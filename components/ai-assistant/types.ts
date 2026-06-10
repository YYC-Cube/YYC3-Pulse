/**
 * @file types.ts
 * @description AI 助手类型定义
 * @author YanYuCloudCube Team
 * @version v1.0.0
 */

/** AI 助理聊天消息 */
export interface ChatMessage {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  timestamp: number;
}

/** AI 助理系统命令类别 */
export type CommandCategory = "cluster" | "model" | "data" | "security" | "monitor";

export type AITab = "chat" | "commands" | "prompts" | "settings";

export interface FloatingPanelState {
  isOpen: boolean;
  isMaximized: boolean;
  activeTab: AITab;
}

export interface ChatState {
  messages: ChatMessage[];
  inputValue: string;
  isTyping: boolean;
  systemPrompt: string;
}

export interface AIConfigState {
  apiKey: string;
  selectedModel: string;
  temperature: number;
  topP: number;
  maxTokens: number;
}

export interface AIAssistantProps {
  isMobile?: boolean;
}

/** 模型配置 — 支持用户自编辑 */
export interface ModelConfig {
  id: string;
  name: string;
  provider: string;
  baseUrl: string;
  apiKey: string;
  modelType: "ollama" | "openai-compatible" | "custom";
  isLocal: boolean;
  /** 是否由用户手动添加 */
  isUserDefined: boolean;
}

/** Ollama API /api/tags 响应 */
export interface OllamaTagsResponse {
  models: Array<{
    name: string;
    modified_at: string;
    size: number;
    digest: string;
    details?: {
      format: string;
      family: string;
      families: string[];
      parameter_size: string;
      quantization_level: string;
    };
  }>;
}
