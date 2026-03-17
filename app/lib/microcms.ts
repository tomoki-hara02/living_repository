import type { Repository, MicroCMSResponse } from "./types";
import { dummyRepositories } from "./dummy-data";

const serviceDomain = process.env.MICROCMS_SERVICE_DOMAIN;
const apiKey = process.env.MICROCMS_API_KEY;

const useDummy = !serviceDomain || !apiKey;

const BASE_URL = `https://${serviceDomain}.microcms.io/api/v1`;
const ENDPOINT = "living_repository";

export async function getRepositories(): Promise<Repository[]> {
  if (useDummy) {
    return dummyRepositories;
  }

  const res = await fetch(`${BASE_URL}/${ENDPOINT}?limit=100`, {
    headers: { "X-MICROCMS-API-KEY": apiKey! },
    next: { revalidate: 60 },
  });

  if (!res.ok) throw new Error("Failed to fetch repositories");

  const data: MicroCMSResponse<Repository> = await res.json();
  return data.contents;
}

export async function getRepositoryById(
  id: string
): Promise<Repository | null> {
  if (useDummy) {
    return dummyRepositories.find((r) => r.id === id) ?? null;
  }

  const res = await fetch(`${BASE_URL}/${ENDPOINT}/${id}`, {
    headers: { "X-MICROCMS-API-KEY": apiKey! },
    next: { revalidate: 60 },
  });

  if (!res.ok) return null;

  return res.json();
}

export async function getAllTags(): Promise<string[]> {
  const repos = await getRepositories();
  const tagSet = new Set<string>();
  repos.forEach((r) => r.tags?.forEach((t) => tagSet.add(t)));
  return Array.from(tagSet);
}
