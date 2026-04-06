import { NextRequest, NextResponse } from "next/server";

const NILTO_API_BASE = "https://cms-api.nilto.com/v1" as const;

export async function GET(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get("secret");
  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const slug = request.nextUrl.searchParams.get("slug") ?? "";
  const apiKey = process.env.NILTO_API_KEY ?? null;

  if (!apiKey) {
    return NextResponse.json({ error: "NILTO_API_KEY is not set" }, { status: 500 });
  }

  const params = new URLSearchParams({
    model: "roadmap_step",
    "slug[eq]": slug,
    limit: "1",
  });

  const res = await fetch(`${NILTO_API_BASE}/contents?${params}`, {
    headers: { "X-NILTO-API-KEY": apiKey },
    cache: "no-store",
  });

  const raw = await res.json();

  return NextResponse.json({
    status: res.status,
    api_key_set: true,
    slug,
    raw,
  });
}
