/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import TweetList from "@/components/TweetList";
import AddTweet from "@/components/AddTweet";
import { getInitialTweets } from "../service/tweetService";
import { getCurrentUser } from "./action";

export default function MainPage() {
  const [keyword, setKeyword] = useState("");
  const [tweets, setTweets] = useState<any[]>([]);
  const [username, setUsername] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    getInitialTweets().then(setTweets);
    getCurrentUser().then((user) => {
      if (user) setUsername(user.username);
    });
  }, []);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (keyword.trim().length > 0) {
      router.push(`/search?q=${encodeURIComponent(keyword.trim())}`);
    }
  };

  const goToProfile = () => {
    if (username) router.push(`/profile/${username}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-2xl mx-auto space-y-8">
        {username && (
          <div className="flex justify-end">
            <button
              onClick={goToProfile}
              className="text-sm text-blue-600 hover:underline"
            >
              → 내 프로필 (@{username})
            </button>
          </div>
        )}

        <form
          onSubmit={handleSearch}
          className="flex items-center gap-3 bg-white p-4 rounded-xl shadow-md"
        >
          <input
            type="text"
            placeholder="트윗 검색하기..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className="flex-1 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
          >
            검색
          </button>
        </form>

        <div className="bg-white p-4 rounded-xl shadow-md">
          <AddTweet />
        </div>

        <div className="space-y-4">
          <TweetList initialTweets={tweets} />
        </div>
      </div>
    </div>
  );
}
