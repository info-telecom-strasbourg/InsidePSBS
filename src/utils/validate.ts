import type { ZodSchema } from "zod";
import { z } from "zod";

export const validate = async <T>(schema: ZodSchema<T>, data: T) => {
  try {
    const parsedData = await schema.parseAsync(data);
    return parsedData;
  } catch (error) {
    if (error instanceof z.ZodError) {
      error = error.issues.map((e) => ({
        path: e.path,
        message: e.message,
      }));

      console.error("Validation error");
      throw error;
    }
  }
};
