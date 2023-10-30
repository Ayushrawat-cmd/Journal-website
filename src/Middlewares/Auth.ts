import {
  NextFetchEvent,
  NextMiddleware,
  NextRequest,
  NextResponse,
} from "next/server";

export function Auth(middleware: NextMiddleware) {
  return async (request: NextRequest, event: NextFetchEvent) => {
    const path = request.nextUrl.pathname;
    const isPublicPath = path === "/login" || path === "/signup";
    const token = request.cookies.get("token")?.value || "";
    console.log(request.nextUrl.origin);
    if (isPublicPath && token) {
      // const url = request.nextUrl.clone()
      // url.pathname = '/profile'
    //   return NextResponse.redirect(new URL("/", request.nextUrl));
        return middleware(request, event);
    }
    if (!isPublicPath && !token)
      return NextResponse.redirect(new URL("/login", request.nextUrl));

  };
}
