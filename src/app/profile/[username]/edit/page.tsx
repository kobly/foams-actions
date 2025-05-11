import { getSession } from "@/lib/session";
import db from "@/utils/db";
import { redirect } from "next/navigation";
import EditForm from "./editForm";

interface PageProps {
  params: {
    username: string;
  };
}

export default async function EditProfilePage({ params }: PageProps) {
  const session = await getSession();
  const user = await db.user.findUnique({
    where: { id: session.id },
  });

  if (!user || user.username !== params.username) {
    redirect("/");
  }

  return <EditForm user={user} />;
}
