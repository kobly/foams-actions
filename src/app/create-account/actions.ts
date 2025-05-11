"use server";

import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { z, typeToFlattenedError } from "zod";

import db from "@/utils/db";
import { isEmailExist, isUsernameExist } from "@/service/userService";
import { getSession } from "@/lib/session";

const createAccountSchema = z
  .object({
    email: z
      .string({ required_error: "Email is required." })
      .trim()
      .email("Please enter a valid email address.")
      .refine(
        (email) => email.includes("@zod.com"),
        "Only @zod.com email addresses are allowed."
      ),

    username: z
      .string({ required_error: "Username is required." })
      .trim()
      .min(5, "Username should be at least 5 characters long."),

    password: z
      .string({ required_error: "Password is required." })
      .min(10, "Password must be at least 10 characters long.")
      .regex(/[0-9]/, "Password must include a number.")
      .regex(/[A-Z]/, "Password must include an uppercase letter."),

    confirmPassword: z.string({ required_error: "Confirm your password." }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  })
  .superRefine(async ({ username }, ctx) => {
    const user = await isUsernameExist(username);
    if (user) {
      ctx.addIssue({
        code: "custom",
        message: "This username is already taken",
        path: ["username"],
        fatal: true,
      });
      return z.NEVER;
    }
  })
  .superRefine(async ({ email }, ctx) => {
    const user = await isEmailExist(email);
    if (user) {
      ctx.addIssue({
        code: "custom",
        message: "This email is already taken",
        path: ["email"],
        fatal: true,
      });
      return z.NEVER;
    }
  });

interface FormState {
  isSuccess: boolean;
  error: typeToFlattenedError<
    {
      email: string;
      username: string;
      password: string;
      confirmPassword: string;
    },
    string
  > | null;
}

export async function handleForm(
  _: unknown,
  formData: FormData
): Promise<FormState> {
  const data = {
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  };

  const result = await createAccountSchema.spa(data);
  if (!result.success) {
    return {
      error: result.error.flatten(),
      isSuccess: false,
    };
  }

  const hashedPassword = await bcrypt.hash(result.data.password, 12);
  const user = await db.user.create({
    data: {
      email: result.data.email,
      username: result.data.username,
      password: hashedPassword,
    },
    select: { id: true },
  });

  const session = await getSession();
  session.id = user.id;
  await session.save();

  redirect("/");
}
