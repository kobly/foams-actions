/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { searchTweets } from "./action";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const keyword = searchParams.get("q") || "";
  const [tweets, setTweets] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTweets = async () => {
      if (!keyword || keyword.length < 1) {
        setError("검색어는 1자 이상이어야 합니다.");
        setTweets([]);
        return;
      }

      setLoading(true);
      setError(null);

      const data = await searchTweets(keyword);
      setTweets(data);
      setLoading(false);
    };

    fetchTweets();
  }, [keyword]);

  return (
    <div className="max-w-2xl mx-auto px-6 py-10">
      <h1 className="text-2xl font-bold mb-6 text-center">🔍 검색 결과</h1>

      {error && <p className="text-red-500 text-center">{error}</p>}
      {loading ? (
        <p className="text-center text-gray-600">로딩 중...</p>
      ) : (
        <div className="space-y-4">
          {tweets.length === 0 ? (
            <p className="text-center text-gray-500">검색 결과가 없습니다.</p>
          ) : (
            tweets.map((tweet) => (
              <div
                key={tweet.id}
                className="bg-white border border-gray-200 rounded-lg shadow-sm p-5"
              >
                <p className="text-gray-800 mb-2">{tweet.tweet}</p>
                <p className="text-sm text-gray-500">
                  작성자:{" "}
                  <span className="font-medium">@{tweet.user.username}</span>
                </p>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
