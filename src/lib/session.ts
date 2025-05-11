"use server";

import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { sessionOptions } from "./config";

export async function getSession() {
  const cookieStore = await cookies();
  return await getIronSession<{ id?: number }>(cookieStore, sessionOptions);
}

export async function deleteSession() {
  const cookieStore = await cookies();
  const session = await getIronSession(cookieStore, sessionOptions);
  await session.destroy();
}
