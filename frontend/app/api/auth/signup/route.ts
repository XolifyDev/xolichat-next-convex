import { api } from "@/convex/_generated/api";
import { ConvexHttpClient } from "convex/browser";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export async function POST(request: Request) {
  const formData = await request.json();
  console.log(formData);
  const { email, password, username } = formData;
  
  if(!username || !email ||!password) {
    return NextResponse.json({
        success: false,
        message: "Please fill in all fields!"
    })
  }

  const isUser = await convex.query(api.auth.getUser, { email });
  console.log(isUser);

  if(isUser) {
    return NextResponse.json({
        success: false,
        message: "Email is already in use!"
    })
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const user = await convex.mutation(api.auth.createUser, {
    email,
    password: passwordHash,
    username
  });

  return NextResponse.json({
    success: true,
    message: "Thank you for becoming apart of the Xolichat Family!",
    user
  });
}
