import { api } from "@/convex/_generated/api";
import { ConvexHttpClient } from "convex/browser";
import { NextResponse } from "next/server";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export async function POST(request: Request) {
  const formData = await request.json();
  console.log(formData);
  const { email, password } = formData;
  const isUser = await convex.query(api.auth.getUser, { email });
  console.log(isUser);

  if(!isUser) {
    return NextResponse.json({
        success: false,
        message: "Invalid credentials"
    })
  }

  return NextResponse.json({
    success: true,
    message: "Login successful",
    user: isUser
  });
}
