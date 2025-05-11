/* eslint-disable @typescript-eslint/no-explicit-any */
import { getSession } from "@/lib/session";
import db from "@/utils/db";
import { redirect } from "next/navigation";
import EditForm from "./editForm";

export default async function EditProfilePage(props: any) {
  const session = await getSession();

  const { username } = props.params;

  const user = await db.user.findUnique({
    where: { id: session.id },
  });

  if (!user || user.username !== username) {
    redirect("/");
  }

  return <EditForm user={user} />;
}
