"use server";

import { Prisma } from "@prisma/client";
import { z } from "zod";
import { redirect } from "next/navigation";

import db from "../utils/db";
import { getSession } from "@/utils/session";

const LIMIT_NUMBER = 2;

export const getInitialTweets = async () => {
  const tweets = await db.tweet.findMany({
    include: { user: true },
    take: LIMIT_NUMBER,
    orderBy: {
      created_at: "desc",
    },
  });
  return tweets;
};
export type InitialTweets = Prisma.PromiseReturnType<typeof getInitialTweets>;

const tweetSchema = z.object({
  tweet: z.string({
    required_error: "Tweet is required.",
  }),
});

export async function createTweet(_: unknown, formData: FormData) {
  const data = {
    tweet: formData.get("tweet"),
  };

  const result = tweetSchema.safeParse(data);
  if (!result.success) {
    return {
      error: result.error.flatten(),
      isSuccess: false,
    };
  }
  const session = await getSession();
  if (session.id) {
    const tweet = await db.tweet.create({
      data: {
        tweet: result.data.tweet,
        user: {
          connect: {
            id: session.id,
          },
        },
      },
    });
    redirect(`/tweets/${tweet.id}`);
  }

  return {
    error: null,
    isSuccess: false,
  };
}
