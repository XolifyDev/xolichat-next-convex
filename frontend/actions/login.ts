"use server";

import * as z from "zod";
import bcrypt from "bcryptjs";
import { LoginSchema } from "@/schemas";
import { db } from "@/lib/db";
import { getUserByEmail } from "@/data/user";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success)
    return {
      error: "Invalid fields!",
    };

  const { email, password } = validatedFields.data;

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  } catch (err) {
    if (err instanceof AuthError) {
      switch (err.type) {
        case "CredentialsSignin":
          return {
            error: "Invalid email or password",
          };
        default:
          return {
             error: "Something went wrong",
          };
      }
    }

    throw err;
  }
  // const existingUser = await getUserByEmail(email);

  // if (!existingUser)
  //     return {
  //         error: "Email is not in use!",
  //     };

  // const isPasswordValid = await bcrypt.compare(password, existingUser.password || "");

  // if (!isPasswordValid)
  //     return {
  //         error: "Invalid password!",
  //     };

  // return {
  //     success: "Login successful!",
  // };
};
