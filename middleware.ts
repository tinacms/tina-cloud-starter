// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { isAuthorized } from "@tinacms/auth";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  // return NextResponse.next();

  const mockedReq = {
    query: { clientID: process.env.NEXT_PUBLIC_TINA_CLIENT_ID },
    headers: request.headers,
  };
  if (!(await isAuthorized(mockedReq as any))) {
    return NextResponse.next();
  }

  const dest = request.headers.get("sec-fetch-dest");

  const pathName = new URL(request.url).pathname;
  // console.log("url", dest, pathName, request.headers.values());

  if (dest == "iframe") {
    console.log("iframe rewrite", pathName, request.url);
    return NextResponse.rewrite(new URL(pathName, request.url));
  }
  if (dest == "document") {
    console.log(
      `document rewrite\nfrom: ${pathName} to ${
        new URL("/admin#/~" + pathName, request.url).href
      }`
    );
    return NextResponse.rewrite(new URL("/admin", request.url));
    //return NextResponse.rewrite(new URL("/admin#/~" + pathName, request.url));
  }
  return NextResponse.next();

  // console.log("foo", new URL("/admin#/~" + pathName, request.url).href);
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/((?!api|uploads|_next/static|favicon.ico).*)",
};
