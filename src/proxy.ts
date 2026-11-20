import { NextResponse, type NextRequest } from "next/server";
import { serviceSlugs } from "@/content/services";

/**
 * Unknown service slugs get a real 404 status. Without this, the route's
 * prerendered shell would answer 200 before the page can call notFound().
 */
export function proxy(request: NextRequest) {
  const slug = request.nextUrl.pathname.split("/")[2];
  if (slug && !serviceSlugs.includes(slug)) {
    return NextResponse.rewrite(new URL("/_missing", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: "/services/:slug",
};
