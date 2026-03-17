export interface MicroCMSImage {
  url: string;
  width?: number;
  height?: number;
}

export type Level = "Beginner" | "Standard" | "Advanced";

export const ALL_MODELS = [
  "ChatGPT",
  "Claude",
  "Gemini",
  "Cursor",
  "NotebookLM",
  "Midjourney",
  "ローカルLLM",
] as const;

export const ALL_LAWS = [
  "個人情報保護法",
  "著作権法",
  "不正競争防止法",
  "守秘義務",
  "その他",
] as const;

export const ALL_LEVELS: Level[] = ["Beginner", "Standard", "Advanced"];

export interface Repository {
  id: string;
  title: string;
  comment: string;
  summary: string;
  contents: string;
  published_at: string;
  tags: string[];
  models?: string[];
  laws?: string[];
  level?: Level;
  eyecatch?: MicroCMSImage;
  createdAt?: string;
  updatedAt?: string;
}

export interface MicroCMSResponse<T> {
  contents: T[];
  totalCount: number;
  offset: number;
  limit: number;
}
