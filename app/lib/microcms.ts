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
    return dummyRepositories;
  }

  const res = await fetch(
    `${MICROCMS_API_BASE}/${ENDPOINT}?limit=100&orders=-published_at`,
    {
      headers: { "X-MICROCMS-API-KEY": apiKey },
      cache: "no-store",
    }
  );

  if (!res.ok) throw new Error("Failed to fetch repositories");

  const data: MicroCMSResponse<MicroCMSRawRepository> = await res.json();
  return data.contents.map(normalizeRepository);
}

export async function getRepositoryById(
  id: string
): Promise<Repository | null> {
  const apiKey = getApiKey();
  if (!apiKey) {
    return dummyRepositories.find((r) => r.id === id) ?? null;
  }

  const res = await fetch(`${MICROCMS_API_BASE}/${ENDPOINT}/${id}`, {
    headers: { "X-MICROCMS-API-KEY": apiKey },
    next: {
      revalidate: 10,
      tags: [ENDPOINT, `${ENDPOINT}-${id}`],
    },
  });

  if (!res.ok) return null;

  const raw: MicroCMSRawRepository = await res.json();
  return normalizeRepository(raw);
}
