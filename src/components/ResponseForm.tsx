"use client";

import { useOptimistic, useTransition } from "react";
import { postResponse } from "@/service/tweetService";

interface Props {
  tweetId: number;
  initialResponses: {
    id: number;
    body: string;
    user: { username: string };
  }[];
}

export default function ResponseForm({ tweetId, initialResponses }: Props) {
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useOptimistic("");
  const [responses, addOptimisticResponse] = useOptimistic(
    initialResponses,
    (state, newBody: string) => [
      {
        id: Date.now(), // optimistic ID
        body: newBody,
        user: { username: "당신" },
      },
      ...state,
    ]
  );

  const handleSubmit = (formData: FormData) => {
    const body = formData.get("body")?.toString();
    if (!body) return;

    addOptimisticResponse(body);
    setMessage("");
    startTransition(() => postResponse(formData));
  };

  return (
    <form
      action={handleSubmit}
      className="flex flex-col gap-2 border-t border-neutral-300 p-4 mt-4"
    >
      <input type="hidden" name="tweetId" value={tweetId} />
      <textarea
        name="body"
        rows={3}
        placeholder="답글을 입력하세요..."
        required
        className="border p-2 rounded"
      />
      <button
        type="submit"
        disabled={isPending}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        {isPending ? "등록 중..." : "답글 작성"}
      </button>

      <div className="mt-4">
        <h4 className="text-sm font-semibold mb-2">답글</h4>
        {responses.map((res) => (
          <div key={res.id} className="text-sm mb-2">
            <strong>{res.user.username}:</strong> {res.body}
          </div>
        ))}
      </div>
    </form>
  );
}
