"use server";

import { Prisma } from "@prisma/client";
import { z } from "zod";
import { redirect } from "next/navigation";
import { revalidatePath, revalidateTag } from "next/cache";

import db from "../utils/db";
import { getSession } from "@/utils/session";

const LIMIT_NUMBER = 2;

export const getInitialTweets = async () => {
  const tweets = db.tweet.findMany({
    include: { user: true },
    take: LIMIT_NUMBER,
    orderBy: { created_at: "desc" },
  });
  return tweets;
};
export type InitialTweets = Prisma.PromiseReturnType<typeof getInitialTweets>;

export async function getTweetsByPage(page: number) {
  return db.tweet.findMany({
    include: { user: true },
    skip: LIMIT_NUMBER * (page - 1),
    take: LIMIT_NUMBER,
    orderBy: { created_at: "desc" },
  });
}
export async function getTweetTotalCount() {
  return db.tweet.count();
}
export async function getPaginatedTweets(page: number) {
  const tweets = await getTweetsByPage(page);
  const TWEETS_TOTAL_COUNT = await getTweetTotalCount();
  const isLastPage = TWEETS_TOTAL_COUNT <= LIMIT_NUMBER * page;
  return { tweets, isLastPage };
}

const tweetSchema = z.object({
  tweet: z.string({ required_error: "Tweet is required." }),
});
export async function uploadTweet(_: unknown, formData: FormData) {
  const result = tweetSchema.safeParse({
    tweet: formData.get("tweet"),
  });

  if (!result.success) {
    return {
      error: result.error.flatten(),
      isSuccess: false,
    };
  }

  const session = await getSession();
  if (session?.id) {
    const tweet = await db.tweet.create({
      data: {
        tweet: result.data.tweet,
        userId: session.id,
      },
    });
    redirect(`/tweets/${tweet.id}`);
  }
}

export const getLikeStatus = async (tweetId: number, userId: number) => {
  const like = await db.like.findUnique({
    where: {
      userId_tweetId: {
        userId,
        tweetId,
      },
    },
  });
  const likeCount = await db.like.count({ where: { tweetId } });
  return {
    isLiked: Boolean(like),
    likeCount,
  };
};

export const likeTweet = async (tweetId: number) => {
  const session = await getSession();
  if (!session?.id) return;

  await db.like.create({
    data: {
      userId: session.id,
      tweetId,
    },
  });

  revalidateTag(`like-status-${tweetId}`);
};

export const dislikeTweet = async (tweetId: number) => {
  const session = await getSession();
  if (!session?.id) return;

  await db.like.delete({
    where: {
      userId_tweetId: {
        userId: session.id,
        tweetId,
      },
    },
  });

  revalidateTag(`like-status-${tweetId}`);
};

const responseSchema = z.object({
  tweetId: z.coerce.number(),
  body: z.string().min(1, "답글을 입력해주세요."),
});

export const postResponse = async (formData: FormData) => {
  const result = responseSchema.safeParse({
    tweetId: formData.get("tweetId"),
    body: formData.get("body"),
  });

  if (!result.success) {
    return { error: "입력이 유효하지 않습니다." };
  }

  const session = await getSession();
  if (!session?.id) {
    return { error: "로그인이 필요합니다." };
  }

  await db.response.create({
    data: {
      tweetId: result.data.tweetId,
      body: result.data.body,
      userId: session.id,
    },
  });

  revalidatePath(`/tweets/${result.data.tweetId}`);
};
