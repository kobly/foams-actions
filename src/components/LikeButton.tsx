"use client";

import { useTransition, useOptimistic } from "react";
import { likeTweet, dislikeTweet } from "@/service/tweetService";

interface Props {
  tweetId: number;
  initialIsLiked: boolean;
  initialLikeCount: number;
}

export default function LikeButton({
  tweetId,
  initialIsLiked,
  initialLikeCount,
}: Props) {
  const [isPending, startTransition] = useTransition();
  const [optimisticState, updateOptimisticState] = useOptimistic(
    {
      isLiked: initialIsLiked,
      likeCount: initialLikeCount,
    },
    (state, action: "like" | "dislike") => {
      if (action === "like") {
        return {
          isLiked: true,
          likeCount: state.likeCount + 1,
        };
      } else {
        return {
          isLiked: false,
          likeCount: state.likeCount - 1,
        };
      }
    }
  );

  const handleClick = () => {
    if (optimisticState.isLiked) {
      updateOptimisticState("dislike");
      startTransition(() => dislikeTweet(tweetId));
    } else {
      updateOptimisticState("like");
      startTransition(() => likeTweet(tweetId));
    }
  };

  return (
    <button
      className="text-sm text-neutral-600 px-4 py-2 border rounded-lg mt-3"
      onClick={handleClick}
      disabled={isPending}
    >
      {optimisticState.isLiked ? "❤️" : "🤍"} {optimisticState.likeCount}
    </button>
  );
}
