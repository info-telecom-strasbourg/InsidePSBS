import { z } from "zod";

const envSchema = z.object({
  STAGE: z.enum(["dev", "prod"]),
  API_URL: z.string().min(1),
  CROUS_API_URL: z.string().min(1),
});

const getEnv = () => {
  try {
    console.log(process.env.EXPO_PUBLIC_API_URL);
    return envSchema.parse({
      STAGE: process.env.EXPO_PUBLIC_STAGE,
      API_URL: process.env.EXPO_PUBLIC_API_URL,
      CROUS_API_URL: process.env.EXPO_PUBLIC_CROUS_API_URL,
    });
  } catch (e) {
    console.error("Error while parsing env variables:\n", e.message);
  }
};

export const env = getEnv();
