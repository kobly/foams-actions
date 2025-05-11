"use server";

import { getSession } from "@/lib/session";
import db from "@/utils/db";
import bcrypt from "bcryptjs";
import { PASSWORD_SCHEMA, checkUserPassword } from "@/utils/validator";

type EditProfileState =
  | { error: string; success?: false }
  | { success: true; error?: null };

export async function editUserProfile(
  prevState: EditProfileState,
  formData: FormData
): Promise<EditProfileState> {
  const session = await getSession();
  if (!session.id) return { error: "로그인이 필요합니다." };

  const username = formData.get("username")?.toString() || "";
  const email = formData.get("email")?.toString() || "";
  const bio = formData.get("bio")?.toString() || "";

  const password = formData.get("password")?.toString() || "";
  const passwordConfirm = formData.get("passwordConfirm")?.toString() || "";
  const currentPassword = formData.get("currentPassword")?.toString() || "";

  const updateData: Record<string, string> = { username, email, bio };

  if (password.length > 0) {
    const result = PASSWORD_SCHEMA.safeParse(password);
    if (!result.success) {
      return { error: result.error.issues[0].message };
    }

    if (password !== passwordConfirm) {
      return { error: "새 비밀번호가 일치하지 않습니다." };
    }

    const valid = await checkUserPassword(currentPassword);

    if (!valid) {
      return { error: "현재 비밀번호가 일치하지 않습니다." };
    }

    const hashed = await bcrypt.hash(password, 10);
    updateData.password = hashed;
  }

  await db.user.update({
    where: { id: session.id },
    data: updateData,
  });

  console.log("🎉 사용자 정보 수정 완료");

  return { success: true };
}
