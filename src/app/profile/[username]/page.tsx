import { notFound } from "next/navigation";
import db from "@/utils/db";
import { getSession } from "@/lib/session";
import Link from "next/link";
import LogoutButton from "@/components/Logout";

interface Props {
  params: { username: string };
}

export default async function UserProfilePage({ params }: Props) {
  const session = await getSession();

  const user = await db.user.findUnique({
    where: { username: params.username },
    include: {
      tweets: {
        orderBy: { created_at: "desc" },
        include: {},
      },
    },
  });

  if (!user) return notFound();

  const isOwner = user.id === session.id;

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-2xl w-full mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-blue-700">@{user.username}</h1>
          {isOwner && <LogoutButton />}
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md space-y-4">
          <p className="text-gray-600">
            ✉️ <span className="font-medium">{user.email}</span>
          </p>
          <p className="text-gray-700 italic">
            {user.bio || "📝 자기소개가 아직 없습니다."}
          </p>

          {isOwner && (
            <Link
              href={`/profile/${user.username}/edit`}
              className="inline-block mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              ✏️ 내 정보 수정
            </Link>
          )}
        </div>

        <h2 className="mt-10 text-xl font-semibold text-gray-800">
          📝 트윗 목록
        </h2>
        <div className="mt-4 space-y-4">
          {user.tweets.length === 0 ? (
            <p className="text-gray-500 italic">아직 작성한 트윗이 없습니다.</p>
          ) : (
            user.tweets.map((tweet) => (
              <div
                key={tweet.id}
                className="border border-gray-200 p-4 rounded-lg bg-white shadow-sm"
              >
                <p className="text-gray-900">{tweet.tweet}</p>
                <div className="text-xs text-gray-400 mt-2">
                  {new Date(tweet.created_at).toLocaleString()}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
