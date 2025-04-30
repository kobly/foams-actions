"use client";

import { useFormState } from "react-dom";
import { createTweet } from "@/service/tweetService";
import Button from "./Button";

type FormState = {
  error?: {
    formErrors: string[];
    fieldErrors: {
      tweet?: string[];
    };
  } | null;
  isSuccess: boolean;
};

const initialState: FormState = {
  error: null,
  isSuccess: false,
};

export default function AddTweet() {
  const [state, formAction] = useFormState(createTweet, initialState);

  return (
    <div className="border border-gray-200 p-4 rounded-lg mb-5 bg-white">
      <h2 className="text-xl font-bold mb-4">새 트윗 작성하기</h2>

      <form action={formAction} className="flex flex-col gap-2">
        <div>
          <textarea
            name="tweet"
            rows={3}
            className="w-full border border-gray-300 p-2 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="내용을 입력해주세요."
          />

          <div className="flex justify-between text-sm text-gray-500">
            <div>
              {state.error?.fieldErrors?.tweet?.map((error, i) => (
                <p key={i} className="text-red-500 mt-1">
                  {error}
                </p>
              ))}
              {state.error?.formErrors?.map((error, i) => (
                <p key={i} className="text-red-500 mt-1">
                  {error}
                </p>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <Button text="트윗 작성하기" />
        </div>
      </form>
    </div>
  );
}
