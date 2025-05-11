"use server";

import { getSession } from "@/lib/session";
import db from "@/utils/db";

export async function getCurrentUser() {
  const session = await getSession();

  if (!session.id) return null;

  const user = await db.user.findUnique({
    where: { id: session.id },
    select: { username: true },
  });

  return user;
}
