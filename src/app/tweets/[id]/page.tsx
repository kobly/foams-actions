import { notFound } from "next/navigation";
import db from "@/utils/db";

async function getTweet(id: number) {
  return db.tweet.findUnique({
    where: { id },
    include: { user: { select: { username: true } } },
  });
}

export default async function TweetDetail({
  params,
}: {
  params: { id: string };
}) {
  const id = Number(params.id);
  if (isNaN(id)) return notFound();
  const tweet = await getTweet(id);
  if (!tweet) return notFound();

  return (
    <div className="p-5">
      <h3 className="font-bold">{tweet.user.username}</h3>
      <p>{tweet.tweet}</p>
    </div>
  );
}
