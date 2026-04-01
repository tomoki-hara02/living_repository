import type { MicroCMSImage, Level } from "./types";

export type { Level };

export interface RoadmapStep {
  id: string;
  theme?: string[];
  chapterNumber: number;
  title: string;
  summary: string;
  contents: string;
  level: Level;
  tools: string[];
  laws: string[];
  legalNote: string;
  eyecatch?: MicroCMSImage;
  publishedAt?: string;
  createdAt?: string;
  updatedAt?: string;
}

/** microCMS から返ってくる生データ（フィールドIDそのまま） */
export interface MicroCMSRawRoadmapStep {
  id: string;
  theme?: string[];
  chapterNumber: number;
  title: string;
  summary?: string;
  contents?: string;
  /** MicroCMS のセレクト型は配列で返るため string[] も許容する */
  level?: Level | string[];
  tools?: string[];
  laws?: string[];
  legalNote?: string;
  eyecatch?: MicroCMSImage;
  publishedAt?: string;
  createdAt?: string;
  updatedAt?: string;
}

/** MicroCMS のセレクト型は配列で返ることがあるため先頭要素を取り出す */
function resolveLevel(raw: Level | string[] | undefined): Level {
  if (!raw) return "Beginner";
  if (Array.isArray(raw)) {
    const first = raw[0] as string;
    if (first === "Standard" || first === "Advanced") return first;
    return "Beginner";
  }
  return raw;
}

export function normalizeRoadmapStep(raw: MicroCMSRawRoadmapStep): RoadmapStep {
  return {
    id: raw.id,
    theme: raw.theme,
    chapterNumber: raw.chapterNumber,
    title: raw.title,
    summary: raw.summary ?? "",
    contents: raw.contents ?? "",
    level: resolveLevel(raw.level),
    tools: raw.tools ?? [],
    laws: raw.laws ?? [],
    legalNote: raw.legalNote ?? "",
    eyecatch: raw.eyecatch,
    publishedAt: raw.publishedAt,
    createdAt: raw.createdAt,
    updatedAt: raw.updatedAt,
  };
}
