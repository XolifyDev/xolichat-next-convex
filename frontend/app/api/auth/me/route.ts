import { api } from "@/convex/_generated/api";
import { COOKIE_NAME } from "@/lib/constants";
import { ConvexHttpClient } from "convex/browser";
import { verify, decode } from "jsonwebtoken";
import { NextApiRequest } from "next";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export const GET = async (req: NextApiRequest) => {
    console.log('AUTH ME')
    const cookieStore = cookies();
    const token = cookieStore.get(COOKIE_NAME);
    if (!token) {
        console.log('No Token')
        return NextResponse.json({
            isAuthenticated: false,
            user: null,
            message: "Unauthorized",
        });
    }

    const value = token.value;
    try {
        const tokenDecoded = verify(value, process.env.NEXT_PUBLIC_JWT!)
        console.log(tokenDecoded, "TOKEN")
    } catch (
        error: any
    ) {
        console.log(error)
        console.log('error')
        return NextResponse.json({
            isAuthenticated: false,
            user: null,
            message: error.message,
        });
    }
}