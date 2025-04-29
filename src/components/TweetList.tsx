"use client";
import { useEffect, useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import ListTweet from "./ListTweet";
import { getPaginatedTweets, InitialTweets } from "@/service/userService";

export default function TweetList({
  initialTweets,
}: {
  initialTweets: InitialTweets;
}) {
  const [tweets, setTweets] = useState(initialTweets);
  const [page, setPage] = useState(1);
  const [isLastPage, setIsLastPage] = useState(false);

  useEffect(() => {
    const fetchMoreTweet = async () => {
      const { tweets, isLastPage } = await getPaginatedTweets(page);
      setTweets(tweets);
      setIsLastPage(isLastPage);
    };
    fetchMoreTweet();
  }, [page]);

  return (
    <div>
      <div className="p-5 flex flex-col gap-5">
        {tweets.map((tweet) => (
          <ListTweet key={tweet.id} {...tweet} />
        ))}
      </div>
      <div className="w-full flex bottom-32 fixed gap-10 justify-center">
        <button disabled={page === 1} onClick={() => setPage((p) => p - 1)}>
          <ChevronLeftIcon width={20} height={20} />
        </button>
        <span>{page}</span>
        <button disabled={isLastPage} onClick={() => setPage((p) => p + 1)}>
          <ChevronRightIcon width={20} height={20} />
        </button>
      </div>
    </div>
  );
}
