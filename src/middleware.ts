import { NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: any) {
  const url = request.nextUrl.clone();
  const localeCookie = request.cookies.get("NEXT_LOCALE")?.value || "ru";

  if (url.pathname === "/" || url.pathname.match(/^\/(ru|ky)$/)) {
    const locale = url.pathname.split("/")[1] || localeCookie;

    url.pathname = `/${locale}/login`;
    return NextResponse.redirect(url);
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ["/", "/(ky|ru)/:path*"],
};
