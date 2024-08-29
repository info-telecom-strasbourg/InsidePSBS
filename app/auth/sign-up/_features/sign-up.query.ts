import * as Crypto from "expo-crypto";
import { type SignUpData } from "./sign-up.schema";

export const signUp = async (data: SignUpData) => {
  const hashedPassword = await Crypto.digestStringAsync(
    Crypto.CryptoDigestAlgorithm.SHA256,
    `${data.password}${data.email}`
  );

  const toSend = {
    ...data,
    password: hashedPassword,
    password_confirmation: hashedPassword,
  };

  console.debug("SignUp data:", toSend);
  const res = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/api/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(toSend),
  });

  if (!res.ok) {
    console.error(res);
  }

  return res.ok;
};
