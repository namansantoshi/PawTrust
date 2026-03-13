import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const ADMIN_SESSION_VALUE = "pawtrust_admin_ok";
const PUBLIC_ADMIN_PATH = "/admin/login";

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    if (pathname.startsWith("/admin") && !pathname.startsWith(PUBLIC_ADMIN_PATH)) {
        const session = request.cookies.get("admin_session")?.value;
        if (session !== ADMIN_SESSION_VALUE) {
            const loginUrl = new URL(PUBLIC_ADMIN_PATH, request.url);
            loginUrl.searchParams.set("from", pathname);
            return NextResponse.redirect(loginUrl);
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/admin/:path*"],
};
