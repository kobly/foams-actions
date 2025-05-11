"use server";

import { deleteSession } from "@/lib/session";
import { redirect } from "next/navigation";

export async function logOut() {
  await deleteSession();
  redirect("/log-in");
}
