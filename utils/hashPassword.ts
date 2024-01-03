import { CryptoDigestAlgorithm, digestStringAsync } from "expo-crypto";

export const hashPassword = async (password: string, email: string) => {
  return await digestStringAsync(
    CryptoDigestAlgorithm.SHA256,
    password + email,
  );
};
