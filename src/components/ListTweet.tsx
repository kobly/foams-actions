import Link from "next/link";
import { formatToTimeAgo } from "../utils/utils";
import { User } from "@prisma/client";

export default function ListTweet({
  tweet,
  created_at,
  id,
  user,
}: {
  tweet: string;
  created_at: Date;
  id: number;
  user: User;
}) {
  return (
    <Link
      href={`/tweets/${id}`}
      className="p-10 rounded-2xl hover:bg-stone-200"
    >
      <div className="flex justify-between">
        <span className="font-bold">{user.username}</span>
        <span className="text-sm text-stone-400">
          {formatToTimeAgo(created_at.toString())}
        </span>
      </div>
      <p>{tweet.slice(0, 20)}...</p>
    </Link>
  );
}
