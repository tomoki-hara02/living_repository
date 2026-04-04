import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const OLD_HOST = "living-repository.tail-legal.jp";
const NEW_HOST = "tail-members.tail-legal.jp";

export function middleware(request: NextRequest) {
  const host = request.headers.get("host")?.split(":")[0];
  if (host === OLD_HOST) {
    const url = request.nextUrl.clone();
    url.host = NEW_HOST;
    url.port = "";
    return NextResponse.redirect(url, 301);
  }
}
