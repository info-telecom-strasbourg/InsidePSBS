import { env } from "./env";

const debug = (message: string) => {
  if (env.STAGE === "prod") return;
  try {
    throw new Error();
  } catch (error) {
    const stack = error.stack.split("\n");

    const filename = stack[2].trim().split(" ")[1] || "?";
    const line = "?";
    console.log(`[${filename}:${line}] ${message}`);
  }
};

export default debug;
