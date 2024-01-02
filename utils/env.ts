import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    STAGE: z.enum(["dev", "prod"]),
    API_URL: z.string().min(1),
    CROUS_API_URL: z.string().min(1),
  },
  client: {},
  runtimeEnv: {
    STAGE: process.env.STAGE,
    API_URL:
      process.env.STAGE === "prod"
        ? "https://app.its-tps.fr"
        : "https://app-pprd.its-tps.fr",
    CROUS_API_URL: process.env.CROUS_API_URL,
  },
});
