import { NextRequest, NextResponse } from "next/server";

const PrivateRoutes = [
    "/playlists",
    "/liked-videos",
    "/watch-history",
    "/community-posts",
    "/dashboard/@me",
    "/profile",
    "profile/settings",
    "/profile/@me",
];

const AuthRoutes = ["/auth/login", "/auth/register"];

export const middleware = (requset: NextRequest) => {
    const { pathname } = requset.nextUrl;

    const isAuthenticated =
        !!requset.cookies.get("accessToken") && !!requset.cookies.get("refreshToken");

    if (isAuthenticated && AuthRoutes.includes(pathname)) {
        return NextResponse.redirect(new URL("/", requset.url));
    }

    if (!isAuthenticated && (PrivateRoutes.includes(pathname) || pathname.startsWith("/channel"))) {
        return NextResponse.redirect(new URL("/auth/login", requset.url));
    }

    return NextResponse.next();
};

const config = {
    // matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
    matcher: [...AuthRoutes, ...PrivateRoutes],
};
