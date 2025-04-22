"use server";

export async function loginAction(prevState: any, formData: FormData) {
  await new Promise((resolve) => setTimeout(resolve, 500));

  const password = formData.get("password");

  if (!password || typeof password !== "string" || password.length < 1) {
    return {
      status: "error",
      message: "비밀번호를 입력해주세요",
      fieldErrors: { password: "비밀번호를 입력해주세요" },
    };
  }

  if (password === "12345") {
    return {
      status: "success",
      message: "Welcome back!!",
    };
  } else {
    return {
      status: "error",
      message: "Wrong password",
      fieldErrors: {},
    };
  }
}
