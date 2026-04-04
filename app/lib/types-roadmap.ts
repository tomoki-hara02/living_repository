export type Level = "Beginner" | "Standard" | "Advanced";

export const ALL_LEVELS: Level[] = ["Beginner", "Standard", "Advanced"];

export interface NiltoMedia {
  url: string;
  alt?: string;
  width?: number;
  height?: number;
}

export interface RoadmapStep {
  id: string;
  slug: string;
  theme?: string;
  chapterNumber: number;
  title: string;
  summary: string;
  /** NILTO の body フィールド（HTML）を格納 */
  contents: string;
  legalNote: string;
  eyecatch?: NiltoMedia;
  attachment?: NiltoMedia;
  /** NILTO に直接アップロードされた音声ファイル */
  audio?: NiltoMedia;
  /** Podcast / NotebookLM 等の外部ホスティング音声 URL */
  audioUrl?: string;
  /** YouTube 等の外部動画 URL */
  videoUrl?: string;
  /** NILTO スキーマには存在しないが既存 UI との互換のため保持 */
  tools: string[];
  laws: string[];
  level: Level;
  publishedAt?: string;
  createdAt?: string;
  updatedAt?: string;
}

/** NILTO API から返ってくる生データ（フィールドLUIDそのまま） */
export interface NiltoRawRoadmapStep {
  _id: number;
  _title: string;
  _created_at: string;
  _updated_at: string;
  _published_at?: string | null;
  _status: string;
  slug?: string;
  theme?: string;
  chapter_number?: string;
  title?: string;
  summary?: string;
  body?: string;
  legal_note?: string;
  eyecatch?: NiltoMedia;
  attachment?: NiltoMedia;
  audio?: NiltoMedia;
  audio_url?: string;
  video_url?: string;
}

export function normalizeRoadmapStep(raw: NiltoRawRoadmapStep): RoadmapStep {
  return {
    id: String(raw._id),
    slug: raw.slug ?? String(raw._id),
    theme: raw.theme,
    chapterNumber: raw.chapter_number ? Number(raw.chapter_number) : 0,
    title: raw.title ?? raw._title ?? "",
    summary: raw.summary ?? "",
    contents: raw.body ?? "",
    legalNote: raw.legal_note ?? "",
    eyecatch: raw.eyecatch,
    attachment: raw.attachment,
    audio: raw.audio,
    audioUrl: raw.audio_url,
    videoUrl: raw.video_url,
    tools: [],
    laws: [],
    level: "Beginner",
    publishedAt: raw._published_at ?? undefined,
    createdAt: raw._created_at,
    updatedAt: raw._updated_at,
  };
}
