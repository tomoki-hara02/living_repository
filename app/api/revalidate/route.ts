import { NextRequest, NextResponse } from "next/server";
import { revalidateTag, revalidatePath } from "next/cache";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    console.log("[revalidate] incoming payload:", JSON.stringify(body));

    const secret =
      body.secret || request.headers.get("x-webhook-secret");

    if (!secret || secret !== process.env.REVALIDATE_SECRET) {
      console.error("[revalidate] Invalid secret token");
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const tagsToRevalidate: string[] = [];
    const pathsToRevalidate: string[] = [];

    if (body.api === "living_repository") {
      tagsToRevalidate.push("living_repository");
      if (body.id) {
        tagsToRevalidate.push(`living_repository-${body.id}`);
        pathsToRevalidate.push(`/repository/${body.id}`);
      }
      pathsToRevalidate.push("/");
    }

    // NILTO: ロードマップステップ更新
    if (body.api === "roadmap_step" || body.model === "roadmap_step") {
      tagsToRevalidate.push("roadmap_step");
      if (body.slug) {
        tagsToRevalidate.push(`roadmap_step-${body.slug}`);
        pathsToRevalidate.push(`/roadmap/step/${body.slug}`);
      }
      pathsToRevalidate.push("/roadmap");
      pathsToRevalidate.push("/roadmap/ai-general");
      pathsToRevalidate.push("/roadmap/cursor");
      pathsToRevalidate.push("/roadmap/web-marketing");
      pathsToRevalidate.push("/roadmap/accounting");
      pathsToRevalidate.push("/roadmap/sales");
      pathsToRevalidate.push("/roadmap/legal");
    }

    // NILTO: お知らせ更新
    if (body.api === "news" || body.model === "news") {
      tagsToRevalidate.push("news");
      pathsToRevalidate.push("/");
    }

    const uniqueTags = [...new Set(tagsToRevalidate)];
    const uniquePaths = [...new Set(pathsToRevalidate)];

    for (const tag of uniqueTags) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (revalidateTag as unknown as (tag: string) => void)(tag);
    }

    for (const path of uniquePaths) {
      revalidatePath(path);
    }

    console.log("[revalidate] done — tags:", uniqueTags, "paths:", uniquePaths);

    return NextResponse.json({
      revalidated: true,
      tags: uniqueTags,
      paths: uniquePaths,
      now: Date.now(),
    });
  } catch (err) {
    console.error("[revalidate] error:", err);
    return NextResponse.json(
      { message: "Error revalidating" },
      { status: 500 }
    );
  }
}
