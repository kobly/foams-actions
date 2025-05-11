import { getSession } from "@/lib/session";
import db from "@/utils/db";
import { redirect } from "next/navigation";
import EditForm from "./editForm";
import { JSX } from "react";

export default async function EditProfilePage({
  params,
}: {
  params: { username: string };
}): Promise<JSX.Element> {
  const session = await getSession();

  const user = await db.user.findUnique({
    where: { id: session.id },
  });

  if (!user || user.username !== params.username) {
    redirect("/");
  }

  return <EditForm user={user} />;
}
