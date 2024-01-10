import { api } from "@/convex/_generated/api";
import { ConvexHttpClient } from "convex/browser";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { sign } from "jsonwebtoken";
import { serialize } from "cookie";
import { COOKIE_NAME } from "@/lib/constants";

const MAX_AGE = 30 * 24 * 60 * 60 * 1000; // 30 days

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export async function POST(request: Request) {
  const formData = await request.json();
  console.log(formData);
  const { email, password } = formData;
  const isUser = await convex.query(api.auth.getUser, { email });
  console.log(isUser);

  if (!isUser) {
    console.log("No user found");
    return NextResponse.json({
      success: false,
      message: "Invalid credentials",
    });
  }
  console.log("User found");

  if (await bcrypt.compareSync(password, isUser.password)) {
    const token = sign({ id: isUser.id }, process.env.NEXT_PUBLIC_JWT!, {
      expiresIn: MAX_AGE,
    });
    console.log(token, "TOKEN");
    const serialized = serialize(COOKIE_NAME, token, {
      maxAge: MAX_AGE,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
    });

    console.log(serialized);

    return new Response(
      JSON.stringify({
        success: true,
        message: "Welcome back!",
        user: isUser,
      }),
      {
        headers: {
          "Set-Cookie": serialized,
        },
      }
    );
  } else {
    return NextResponse.json({
      success: false,
      message: "Invalid credentials",
    });
  }
}
