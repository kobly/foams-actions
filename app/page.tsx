"use client";

import { useFormState } from "react-dom";
import { loginAction } from "./actions";
import { SubmitButton } from "@/components/SubmitButton";

const initialState = {
  status: null,
  message: null,
  fieldErrors: {},
};

export default function Home() {
  const [state, dispatch] = useFormState(loginAction, initialState);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#faf9f6]">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-sm">
        <div className="mb-6  flex justify-center">
          <div className="w-16 h-16 flex justify-center items-center">
            <svg
              data-slot="icon"
              fill="red"
              stroke-width="1.5"
              stroke="white"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047 8.287 8.287 0 0 0 9 9.601a8.983 8.983 0 0 1 3.361-6.867 8.21 8.21 0 0 0 3 2.48Z"
              ></path>
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 18a3.75 3.75 0 0 0 .495-7.468 5.99 5.99 0 0 0-1.925 3.547 5.975 5.975 0 0 1-2.133-1.001A3.75 3.75 0 0 0 12 18Z"
              ></path>
            </svg>
          </div>
        </div>

        <form action={dispatch} className="space-y-5">
          <div>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
              </span>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="Email"
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-full placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#ff6b6b] focus:border-transparent bg-[#faf9f6] text-gray-700"
                required
              />
            </div>
            {state?.fieldErrors?.email && (
              <p className="mt-1 text-sm text-red-600">
                {state.fieldErrors.email}
              </p>
            )}
          </div>

          <div>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
              <input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                required
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-full placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Username"
              />
            </div>
            {state?.fieldErrors?.username && (
              <p className="mt-1 text-sm text-red-600">
                {state.fieldErrors.username}
              </p>
            )}
          </div>

          <div>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-full placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Password"
              />
            </div>
            {state?.fieldErrors?.password && (
              <p className="mt-1 text-sm text-red-600">
                {state.fieldErrors.password}
              </p>
            )}
          </div>

          {state?.status === "success" ? (
            <div className="p-3 bg-green-100 border border-green-300 rounded-md text-center">
              <p className="text-sm text-green-700">{state.message}</p>
            </div>
          ) : state?.status === "error" && state.message ? (
            <div className="p-3 bg-red-100 border border-red-300 rounded-md text-center">
              <p className="text-sm text-red-700">{state.message}</p>
            </div>
          ) : null}

          <div>
            <SubmitButton />
          </div>
        </form>
      </div>
    </div>
  );
}
