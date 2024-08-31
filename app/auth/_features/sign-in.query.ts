import type { SignInData } from "./sign-in.schema";
import * as Crypto from 'expo-crypto';

export const signIn = async (data: SignInData) => {
  const hashedPassword = await Crypto.digestStringAsync(
    Crypto.CryptoDigestAlgorithm.SHA256,
    `${data.password}${data.email}`
  );
  const dataToSend = {
    email: data.email,
    password: hashedPassword,
  } as SignInData;
  
  console.debug("signIn data: ", dataToSend);
  const res = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/api/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dataToSend),
  });

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
