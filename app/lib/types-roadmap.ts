import type { MicroCMSImage, Level } from "./types";

export type { Level };

export interface RoadmapStep {
  id: string;
  theme?: string;
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
  theme?: string;
  chapterNumber: number;
  title: string;
  summary?: string;
  contents?: string;
  level?: Level;
  tools?: string[];
  laws?: string[];
  legalNote?: string;
  eyecatch?: MicroCMSImage;
  publishedAt?: string;
  createdAt?: string;
  updatedAt?: string;
}

export function normalizeRoadmapStep(raw: MicroCMSRawRoadmapStep): RoadmapStep {
  return {
    id: raw.id,
    theme: raw.theme,
    chapterNumber: raw.chapterNumber,
    title: raw.title,
    summary: raw.summary ?? "",
    contents: raw.contents ?? "",
    level: raw.level ?? "Beginner",
    tools: raw.tools ?? [],
    laws: raw.laws ?? [],
    legalNote: raw.legalNote ?? "",
    eyecatch: raw.eyecatch,
    publishedAt: raw.publishedAt,
    createdAt: raw.createdAt,
    updatedAt: raw.updatedAt,
  };
}
