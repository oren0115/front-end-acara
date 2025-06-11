import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { JWTExtended } from "./types/Auth";
import { getToken } from "next-auth/jwt";
import environment from "./config/environment";

export async function middleware(request: NextRequest){
    const token : JWTExtended | null = await getToken({
        req: request,
        secret: environment.AUTH_SECRET,
    })
    const {pathname} = request.nextUrl;
    
    // If user is logged in and tries to access auth pages, redirect to home
    if(pathname === "/auth/login" || pathname === "/auth/register" || pathname === "/auth/activation" || pathname.startsWith("/auth/")){
        if(token) {
            return NextResponse.redirect(new URL("/", request.url))
        }
    }
    
    // If user is not logged in and tries to access protected routes, redirect to login
    if(pathname.startsWith("/admin")) {
        if(!token){
            const url = new URL("/auth/login", request.url);
            url.searchParams.set("callbackUrl", encodeURI(request.url));
            return NextResponse.redirect(url);
        }

        if(token?.user?.role !== "admin"){
            return NextResponse.redirect(new URL("/", request.url));
        }

        if(pathname === "/admin"){
            return NextResponse.redirect(new URL("/admin/dashboard", request.url));
        }
    }

    if(pathname.startsWith("/member")){
        if(!token) {
            const url = new URL("/auth/login", request.url);
            url.searchParams.set("callbackUrl", encodeURI(request.url));
            return NextResponse.redirect(url);
        }

        if(pathname === "/member"){
            return NextResponse.redirect(new URL("/member/dashboard", request.url));
        }
    }
    
    return NextResponse.next();
};

export const config = {
    matcher: [
        "/auth/:path*",
        "/admin/:path*", 
        "/member/:path*"
    ],
}