"use server";

import { z } from "zod";

const loginSchema = z.object({
  email: z
    .string()
    .email("Invalid email")
    .refine((val) => val.endsWith("@zod.com"), {
      message: '"Only @zod.com" emails are allowed',
    }),
  username: z.string().min(5, "Username should be at laest characters long"),
  password: z
    .string()
    .min(10, "Password should be at least 10 characters long")
    .refine((val) => /\d/.test(val), {
      message: "Password should contain least one number(0123456789).",
    }),
});

export async function loginAction(prevState: any, formData: FormData) {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const validatedFields = loginSchema.safeParse({
    email: formData.get("email"),
    username: formData.get("username"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {
      fieldErrors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { password } = validatedFields.data;

  if (password === "0123456789") {
    return {
      status: "success",
      message: "Welcome back!!",
    };
  } else {
    return {
      status: "error",
      message: "Wrong password",
      fieldErrors: {},
    };
  }
}
