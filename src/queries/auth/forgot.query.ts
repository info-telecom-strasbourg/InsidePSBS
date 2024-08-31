import type { ForgotPasswordData } from "./forgot.schema";

export const forgotPassword = async (data: ForgotPasswordData) => {
  const res = await fetch(
    `${process.env.EXPO_PUBLIC_API_URL}/api/forgot-password`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  if (!res.ok) {
    return {
      data: null,
      status: res.status,
      error: await res.json(),
    };
  }

  return {
    data: await res.json(),
    status: res.status,
    error: null,
  };
};
