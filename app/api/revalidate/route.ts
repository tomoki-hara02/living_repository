import { NextRequest, NextResponse } from "next/server";
import { revalidateTag, revalidatePath } from "next/cache";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const secret =
      body.secret || request.headers.get("x-webhook-secret");

    if (!secret || secret !== process.env.REVALIDATE_SECRET) {
      console.error("Invalid secret token");
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

    const uniqueTags = [...new Set(tagsToRevalidate)];
    const uniquePaths = [...new Set(pathsToRevalidate)];

    for (const tag of uniqueTags) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (revalidateTag as unknown as (tag: string) => void)(tag);
    }

    for (const path of uniquePaths) {
      revalidatePath(path);
    }

    return NextResponse.json({
      revalidated: true,
      tags: uniqueTags,
      paths: uniquePaths,
      now: Date.now(),
    });
  } catch {
    return NextResponse.json(
      { message: "Error revalidating" },
      { status: 500 }
    );
  }
}
