import { NextRequest, NextResponse } from "next/server";

const SESSION_COOKIE = "admin_session";
const SESSION_VALUE = "pawtrust_admin_ok";

export async function POST(request: NextRequest) {
    const body = await request.json().catch(() => ({})) as { password?: string };
    const adminPassword = process.env.ADMIN_PASSWORD || "pawtrust2024";

    if (body.password === adminPassword) {
        const res = NextResponse.json({ success: true });
        res.cookies.set(SESSION_COOKIE, SESSION_VALUE, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 60 * 60 * 24 * 7, // 7 days
            path: "/",
        });
        return res;
    }

    return NextResponse.json({ success: false, error: "Invalid password" }, { status: 401 });
}

export async function DELETE() {
    const res = NextResponse.json({ success: true });
    res.cookies.delete(SESSION_COOKIE);
    return res;
}
