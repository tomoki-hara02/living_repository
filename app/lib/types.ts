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
  "民法/商法",
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
  models: string[];
  laws: string[];
  level: Level | null;
  eyecatch?: MicroCMSImage;
  createdAt?: string;
  updatedAt?: string;
}

export interface MicroCMSRawRepository {
  id: string;
  title: string;
  comment?: string;
  summary: string;
  contents: string;
  publishedAt?: string;
  tags?: string[];
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

export function parseTags(rawTags: string[]): {
  models: string[];
  laws: string[];
  level: Level | null;
} {
  const models: string[] = [];
  const laws: string[] = [];
  let level: Level | null = null;

  for (const tag of rawTags) {
    if (tag.startsWith("model:")) {
      const name = tag.replace("model:", "");
      models.push(name);
    } else if (tag.startsWith("law:")) {
      const name = tag.replace("law:", "");
      laws.push(name);
    } else if (tag.startsWith("level:")) {
      const raw = tag.replace("level:", "");
      if (raw.startsWith("Beginner")) level = "Beginner";
      else if (raw.startsWith("Standard")) level = "Standard";
      else if (raw.startsWith("Advanced")) level = "Advanced";
    }
  }

  return { models, laws, level };
}

export function normalizeRepository(raw: MicroCMSRawRepository): Repository {
  const parsed = parseTags(raw.tags ?? []);
  return {
    ...raw,
    comment: raw.comment ?? "",
    published_at: raw.publishedAt ?? raw.createdAt ?? "",
    tags: raw.tags ?? [],
    models: parsed.models,
    laws: parsed.laws,
    level: parsed.level,
  };
}

export function stripHtml(html: string): string {
  return html
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/<[^>]*>/g, "")
    .trim();
}
