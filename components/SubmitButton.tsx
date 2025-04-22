"use client";

import { useFormStatus } from "react-dom";

export function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full py-2 px-4 bg-gray-100 rounded-4xl text-gray-800 font-semibold hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-opacity-75 disabled:bg-gray-100 disabled:opacity-70 disabled:cursor-not-allowed transition-colors"
    >
      {pending ? "Loging..." : "Log in"}
    </button>
  );
}
