"use client";

import { logOut } from "@/app/log-out/action";

export default function LogoutButton() {
  return (
    <form action={logOut}>
      <button type="submit" className="text-red-600 underline">
        로그아웃
      </button>
    </form>
  );
}
