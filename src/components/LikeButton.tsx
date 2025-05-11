"use client";

import { useOptimistic, startTransition } from "react";
import { useRouter } from "next/navigation";
import { HandThumbUpIcon } from "@heroicons/react/24/solid";
import { HandThumbUpIcon as OutlineHandThumbUpIcon } from "@heroicons/react/24/outline";

import { dislikeTweet, likeTweet } from "@/service/likeService";

export default function LikeButton({
  isLiked,
  likeCount,
  tweetId,
}: {
  isLiked: boolean;
  likeCount: number;
  tweetId: number;
}) {
  const router = useRouter();
  const [state, toggle] = useOptimistic({ isLiked, likeCount }, (prev) => ({
    isLiked: !prev.isLiked,
    likeCount: prev.isLiked ? prev.likeCount - 1 : prev.likeCount + 1,
  }));

  const handleClick = () => {
    startTransition(async () => {
      toggle(null);
      if (state.isLiked) {
        await dislikeTweet(tweetId);
      } else {
        await likeTweet(tweetId);
      }
      router.refresh();
    });
  };

  return (
    <button
      onClick={handleClick}
      className={`flex items-center gap-2 text-sm border rounded-full px-3 py-1 transition-colors ${
        state.isLiked
          ? "bg-rose-500 text-white border-rose-500"
          : "text-stone-500 border-stone-300 hover:bg-stone-200"
      }`}
    >
      {state.isLiked ? (
        <HandThumbUpIcon className="w-5 h-5" />
      ) : (
        <OutlineHandThumbUpIcon className="w-5 h-5" />
      )}
      <span>
        {state.isLiked ? state.likeCount : `공감하기 (${state.likeCount})`}
      </span>
    </button>
  );
}
