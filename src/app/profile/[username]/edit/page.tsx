import { getSession } from "@/lib/session";
import db from "@/utils/db";
import { redirect } from "next/navigation";
import EditForm from "./editForm";
import { useParams } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function EditProfilePage() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const params = useParams();
  const username = (params?.username || "") as string;

  const session = await getSession();
  const user = await db.user.findUnique({
    where: { id: session.id },
  });

  if (!user || user.username !== username) {
    redirect("/");
  }

  return <EditForm user={user} />;
}
