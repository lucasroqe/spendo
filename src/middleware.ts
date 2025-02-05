import { betterFetch } from "@better-fetch/fetch";
import type { auth } from "@/lib/auth";
import { NextResponse, type NextRequest } from "next/server";
 
type Session = typeof auth.$Infer.Session;
 
export default async function authMiddleware(request: NextRequest) {
	const { data: session } = await betterFetch<Session>(
		"/api/auth/get-session",
		{
			baseURL: request.nextUrl.origin,
			headers: {
				cookie: request.headers.get("cookie") || "",
			},
		},
	);
 
	// if (!session) {
	// 	return NextResponse.redirect(new URL("/sign-in", request.url));
	// }
	return NextResponse.next();
}
 
export const config = {
	matcher: ["/dashboard"],
};