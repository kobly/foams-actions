"use server";

import db from "@/utils/db";
import { searchSchema } from "@/utils/validator";

export async function searchTweets(keyword: string) {
  const result = searchSchema.safeParse({ keyword });
  if (!result.success) return [];

  const tweets = await db.tweet.findMany({
    where: {
      tweet: {
        contains: keyword,
      },
    },
    include: {
      user: { select: { username: true } },
    },
    orderBy: {
      created_at: "desc",
    },
  });

  return tweets;
}
