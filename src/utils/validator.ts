import bcrypt from "bcryptjs";
import { getSession } from "@/lib/session";
import {
  getUserAuthInfo,
  getUserByEmail,
  getUserByUsername,
} from "../service/userService";
import { z } from "zod";

export const PASSWORD_SCHEMA = z
  .string()
  .min(10, "비밀번호는 최소 10자 이상이어야 합니다.")
  .regex(/[A-Z]/, "비밀번호에는 최소 하나의 대문자가 포함되어야 합니다.");

export const checkEmailAvailability = async (email: string) => {
  const session = await getSession();
  const user = await getUserByEmail(email);
  if (session.id === user?.id) return Boolean(user);
  return !Boolean(user);
};

export const checkUsernameAvailability = async (username: string) => {
  const session = await getSession();
  const user = await getUserByUsername(username);
  if (session.id === user?.id) return Boolean(user);
  return !Boolean(user);
};

export const checkUserPassword = async (password: string) => {
  const user = await getUserAuthInfo();
  const isValidPassword = await bcrypt.compare(
    password,
    user!.password ?? "소셜로그인"
  );
  return isValidPassword;
};

export const searchSchema = z.object({
  keyword: z.string().min(1, "검색어는 1자 이상이어야 합니다."),
});
