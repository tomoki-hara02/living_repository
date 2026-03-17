import type {
  Repository,
  MicroCMSRawRepository,
  MicroCMSResponse,
} from "./types";
import { normalizeRepository } from "./types";
import { dummyRepositories } from "./dummy-data";

const MICROCMS_SERVICE_DOMAIN = "tail-legal";
const MICROCMS_API_BASE =
  `https://${MICROCMS_SERVICE_DOMAIN}.microcms.io/api/v1` as const;
const ENDPOINT = "living_repository";

function getApiKey(): string | null {
  return process.env.MICROCMS_API_KEY ?? null;
}

export async function getRepositories(): Promise<Repository[]> {
  const apiKey = getApiKey();
  if (!apiKey) {
    console.warn("[microcms] MICROCMS_API_KEY is not set — using dummy data");
    return dummyRepositories;
  }

  try {
    const res = await fetch(
      `${MICROCMS_API_BASE}/${ENDPOINT}?limit=100&orders=-published_at`,
      {
        headers: { "X-MICROCMS-API-KEY": apiKey },
        cache: "no-store",
      }
    );

    if (!res.ok) {
      console.error(`[microcms] getRepositories failed: ${res.status} ${res.statusText}`);
      return dummyRepositories;
    }

    const data: MicroCMSResponse<MicroCMSRawRepository> = await res.json();
    return data.contents.map(normalizeRepository);
  } catch (err) {
    console.error("[microcms] getRepositories error:", err);
    return dummyRepositories;
  }
}

export async function getRepositoryById(
  id: string
): Promise<Repository | null> {
  const apiKey = getApiKey();
  if (!apiKey) {
    console.warn("[microcms] MICROCMS_API_KEY is not set — using dummy data");
    return dummyRepositories.find((r) => r.id === id) ?? null;
  }

  try {
    const res = await fetch(`${MICROCMS_API_BASE}/${ENDPOINT}/${id}`, {
      headers: { "X-MICROCMS-API-KEY": apiKey },
      next: {
        revalidate: 10,
        tags: [ENDPOINT, `${ENDPOINT}-${id}`],
      },
    });

    if (!res.ok) {
      console.error(`[microcms] getRepositoryById(${id}) failed: ${res.status} ${res.statusText}`);
      return null;
    }

    const raw: MicroCMSRawRepository = await res.json();
    return normalizeRepository(raw);
  } catch (err) {
    console.error(`[microcms] getRepositoryById(${id}) error:`, err);
    return null;
  }
}
