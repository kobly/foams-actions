/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { useActionState } from "react";
import { editUserProfile } from "./action";

type State = {
  error: string | null;
  success?: boolean;
};

const initialState: State = { error: null };

export default function EditForm({ user }: { user: any }) {
  const [state, formAction] = useActionState(editUserProfile, initialState);

  return (
    <form
      action={formAction}
      className="space-y-6 max-w-xl w-full mx-auto bg-white p-8 rounded-xl shadow-md"
    >
      <h2 className="text-2xl font-semibold text-gray-800 mb-2">프로필 수정</h2>

      {state.error && (
        <p className="text-red-500 bg-red-50 border border-red-300 p-3 rounded-md">
          ⚠️ {state.error}
        </p>
      )}
      {state.success && (
        <p className="text-green-600 bg-green-50 border border-green-300 p-3 rounded-md">
          ✅ 수정이 완료되었습니다!
        </p>
      )}

      <div className="space-y-1">
        <label htmlFor="username" className="text-sm text-gray-600">
          사용자 이름
        </label>
        <input
          id="username"
          name="username"
          defaultValue={user.username}
          className="border border-gray-300 p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="space-y-1">
        <label htmlFor="email" className="text-sm text-gray-600">
          이메일
        </label>
        <input
          id="email"
          name="email"
          type="email"
          defaultValue={user.email}
          className="border border-gray-300 p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="space-y-1">
        <label htmlFor="bio" className="text-sm text-gray-600">
          자기소개
        </label>
        <textarea
          id="bio"
          name="bio"
          defaultValue={user.bio || ""}
          className="border border-gray-300 p-2 w-full rounded-md resize-none h-24 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="space-y-1">
        <label htmlFor="currentPassword" className="text-sm text-gray-600">
          현재 비밀번호 (비밀번호 변경 시 필수)
        </label>
        <input
          id="currentPassword"
          name="currentPassword"
          type="password"
          placeholder="현재 비밀번호"
          className="border border-gray-300 p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="space-y-1">
        <label htmlFor="password" className="text-sm text-gray-600">
          새 비밀번호
        </label>
        <input
          id="password"
          name="password"
          type="password"
          placeholder="새 비밀번호 (선택)"
          className="border border-gray-300 p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="space-y-1">
        <label htmlFor="passwordConfirm" className="text-sm text-gray-600">
          비밀번호 확인
        </label>
        <input
          id="passwordConfirm"
          name="passwordConfirm"
          type="password"
          placeholder="비밀번호 확인"
          className="border border-gray-300 p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="pt-2">
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition"
        >
          저장하기
        </button>
      </div>
    </form>
  );
}
