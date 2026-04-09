import type { NiltoMedia } from "./types-roadmap";

export type LegalCategory =
  | "legal_explanation"
  | "contract_clause"
  | "internal_policy";

export const LEGAL_CATEGORY_LABELS: Record<LegalCategory, string> = {
  legal_explanation: "法務解説",
  contract_clause: "契約条項例",
  internal_policy: "社内規程・ポリシー",
};

export const LEGAL_CATEGORY_ICONS: Record<LegalCategory, string> = {
  legal_explanation: "📖",
  contract_clause: "📝",
  internal_policy: "🏢",
};

export const LEGAL_CATEGORY_COLORS: Record<LegalCategory, string> = {
  legal_explanation: "from-indigo-50 to-violet-50",
  contract_clause:  "from-emerald-50 to-teal-50",
  internal_policy:  "from-blue-50 to-cyan-50",
};

export const LEGAL_CATEGORY_ACCENTS: Record<LegalCategory, string> = {
  legal_explanation: "text-indigo-600",
  contract_clause:  "text-emerald-600",
  internal_policy:  "text-blue-600",
};

export const LEGAL_CATEGORY_ORDER: LegalCategory[] = [
  "legal_explanation",
  "contract_clause",
  "internal_policy",
];

export interface LegalContent {
  id: string;
  slug: string;
  title: string;
  summary: string;
  body?: string;
  category: LegalCategory;
  /** NILTO のメディアフィールド。url, alt（ファイル名代わり）を利用 */
  file?: NiltoMedia;
  publishedAt: string;
}

/** NILTO API から返ってくる生データ */
export interface NiltoRawLegalContent {
  _id: number | string;
  _title: string;
  _status: string;
  _created_at: string;
  _updated_at: string;
  _published_at?: string | null;
  slug?: string;
  title?: string;
  summary?: string;
  /** Nilto スキーマ上のフィールド名（flexible_text_1）*/
  flexible_text_1?: string;
  body?: string;
  category?: LegalCategory;
  file?: NiltoMedia;
  published_at?: string;
}

export function normalizeLegalContent(raw: NiltoRawLegalContent): LegalContent {
  return {
    id: String(raw._id),
    slug: raw.slug ?? String(raw._id),
    title: raw.title ?? raw._title ?? "",
    summary: raw.summary ?? "",
    body: raw.flexible_text_1 ?? raw.body,
    category: raw.category ?? "internal_policy",
    file: raw.file,
    publishedAt: raw.published_at ?? raw._published_at ?? raw._created_at,
  };
}
