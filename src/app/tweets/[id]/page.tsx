import { notFound } from "next/navigation";
import db from "@/utils/db";
import { ResponseForm } from "@/components/ResponseForm";
import LikeButton from "@/components/LikeButton";
import { getSession } from "@/utils/session";

async function getTweet(id: number) {
  const tweet = await db.tweet.findUnique({
    where: { id },
    include: {
      user: { select: { username: true } },
      responses: {
        include: {
          user: { select: { username: true } },
        },
        orderBy: { createdAt: "desc" },
      },
      likes: true,
    },
  });
  return tweet;
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

  const session = await getSession();
  const alreadyLiked = tweet.likes.some((like) => like.userId === session.id);

  return (
    <div className="pb-36">
      <h3 className="p-5 flex items-center gap-3 border-b border-neutral-500">
        {tweet.user.username}
      </h3>
      <p className="p-5">{tweet.tweet}</p>

      <LikeButton
        tweetId={tweet.id}
        initialIsLiked={alreadyLiked}
        initialLikeCount={tweet.likes.length}
      />

      <ResponseForm tweetId={tweet.id} initialResponses={tweet.responses} />
    </div>
  );
}
