"use client";

import {
  EnvelopeIcon,
  UserIcon,
  KeyIcon,
  FireIcon,
} from "@heroicons/react/24/solid";

import { useActionState } from "react";
import Link from "next/link";

import { handleForm } from "./actions";
import Input from "@/components/input";
import Button from "@/components/button";
import SuccessMessage from "@/components/SuccessMessage";

export default function Home() {
  const [state, action] = useActionState(handleForm, null);

  return (
    <main className="max-w-xl mx-auto flex flex-col gap-10 items-center justify-center">
      <h1 className="text-center text-6xl">
        <FireIcon className="size-20 text-red-400" />
      </h1>
      <form action={action} className="w-full flex flex-col gap-5">
        <Input
          name="email"
          type="email"
          placeholder="Email"
          required
          errors={state?.error?.fieldErrors.email}
          labelIcon={<EnvelopeIcon />}
        />
        <Input
          name="username"
          placeholder="Username"
          required
          errors={state?.error?.fieldErrors.username}
          labelIcon={<UserIcon />}
        />
        <Input
          name="password"
          type="password"
          placeholder="Password"
          required
          errors={state?.error?.fieldErrors.password}
          labelIcon={<KeyIcon />}
        />
        <Input
          name="confirmPassword"
          type="password"
          placeholder="Confirm Password"
          required
          errors={state?.error?.fieldErrors.confirmPassword}
          labelIcon={<KeyIcon />}
        />
        <Button text="Create Account" />
        {state?.isSuccess && <SuccessMessage />}
      </form>
      <div className="flex gap-2">
        <span>이미 계정이 있나요?</span>
        <Link
          href="/log-in"
          className="text-stone-600 hover:underline hover:text-stone-400"
        >
          Log in
        </Link>
      </div>
    </main>
  );
}
