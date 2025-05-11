import { notFound } from "next/navigation";

import { getTweetDetail } from "@/service/tweetService";
import { getLikeStatus } from "@/service/likeService";
import { getInitialResponse } from "@/service/responseService";
import { getSession } from "@/lib/session";

import Responses from "@/components/ResponseForm";
import LikeButton from "@/components/LikeButton";

export default async function TweetDetail(props: { params: { id: string } }) {
  const { params } = await props;
  const id = Number(params.id);
  if (isNaN(id)) return notFound();

  const tweet = await getTweetDetail(id);
  if (!tweet) return notFound();

  const session = await getSession();
  const { isLiked, likeCount } = await getLikeStatus(id, session.id!);
  const responses = await getInitialResponse(id);

  return (
    <div className="max-w-xl mx-auto px-5 py-10 space-y-6">
      <div className="flex items-center gap-3 border-b pb-4">
        <div className="bg-blue-500 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold uppercase">
          {tweet.user.username[0]}
        </div>
        <h3 className="text-lg font-semibold">@{tweet.user.username}</h3>
      </div>

      <div className="bg-white border border-gray-200 rounded-md shadow-sm p-5">
        <p className="text-gray-800 text-base">{tweet.tweet}</p>
      </div>

      <LikeButton isLiked={isLiked} likeCount={likeCount} tweetId={id} />

      <div className="space-y-4">
        <Responses
          initialResponses={responses}
          tweetId={id}
          username={tweet.user.username}
        />
      </div>
    </div>
  );
}
