"use server";

import { Prisma } from "@prisma/client";
import db from "../utils/db";

const LIMIT_NUMBER = 2;

export const getInitialTweets = async () => {
  return db.tweet.findMany({
    include: { user: true },
    take: LIMIT_NUMBER,
    orderBy: { created_at: "desc" },
  });
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
  const total = await getTweetTotalCount();
  const isLastPage = total <= LIMIT_NUMBER * page;
  return { tweets, isLastPage };
}
