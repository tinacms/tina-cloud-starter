// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  if (!request.cookies.get("tina_auth")) {
    return NextResponse.next();
  }

  const dest = request.headers.get("sec-fetch-dest");

  const pathName = new URL(request.url).pathname;

  //This rewrite doesn't seem to work
  // if (dest == "iframe") {
  //   console.log("iframe rewrite", pathName, request.url);
  //   return NextResponse.rewrite(new URL(pathName, request.url));
  // }
  if (dest == "document") {
    console.log(
      `document rewrite\nfrom: ${pathName} to ${
        new URL("/admin#/~" + pathName, request.url).href
      }`
    );
    return NextResponse.rewrite(new URL("/admin", request.url));
  }
  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/((?!api|uploads|_next/static|favicon.ico).*)",
};
