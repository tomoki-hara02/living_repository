import { NextResponse } from "next/server";

export async function GET() {
  const hasApiKey = !!process.env.MICROCMS_API_KEY;
  const apiKeyLength = process.env.MICROCMS_API_KEY?.length ?? 0;

  let fetchStatus: number | null = null;
  let fetchError: string | null = null;

  if (hasApiKey) {
    try {
      const res = await fetch(
        "https://tail-legal.microcms.io/api/v1/living_repository?limit=1",
        {
          headers: {
            "X-MICROCMS-API-KEY": process.env.MICROCMS_API_KEY!,
          },
          cache: "no-store",
        }
      );
      fetchStatus = res.status;
    } catch (e) {
      fetchError = String(e);
    }
  }

  return NextResponse.json({
    ok: true,
    env: {
      hasApiKey,
      apiKeyLength,
      nodeEnv: process.env.NODE_ENV,
    },
    microcms: {
      fetchStatus,
      fetchError,
    },
  });
}
