import { getSession } from "@/lib/session";
import db from "@/utils/db";
import { redirect } from "next/navigation";
import EditForm from "./editForm";

type PageParams = Promise<{ username: string }>;

const EditProfilePage = async ({ params }: { params: PageParams }) => {
  const { username } = await params;

  const session = await getSession();
  const user = await db.user.findUnique({
    where: { id: session.id },
  });

  if (!user || user.username !== username) {
    redirect("/");
  }

  return <EditForm user={user} />;
};

export default EditProfilePage;
