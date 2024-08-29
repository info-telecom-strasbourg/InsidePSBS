import { type SignUpData } from "./sign-up.schema";

export const signUp = async (data: SignUpData) => {
  const res = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/api/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    console.error(res);
  }

  return res.ok;
};
