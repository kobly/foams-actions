import { getSession } from "@/lib/session";
import db from "@/utils/db";
import { redirect } from "next/navigation";
import EditForm from "./editForm";

export default async function EditProfilePage(props: {
  params: { username: string };
}) {
  const session = await getSession();

  const user = await db.user.findUnique({
    where: { id: session.id },
  });

  if (!user || user.username !== props.params.username) {
    redirect("/");
  }

  return <EditForm user={user} />;
}

export const dynamic = "force-dynamic";
