import { z } from "zod";

export const validate = async <T>(
  schema: z.AnyZodObject | z.ZodOptional<z.AnyZodObject>,
  data: T
) => {
  try {
    await schema.parseAsync(data);
    return;
  } catch (error) {
    if (error instanceof z.ZodError) {
      error = error.issues.map((e) => ({
        path: e.path,
        message: e.message,
      }));

      throw error;
    }
  }
};
