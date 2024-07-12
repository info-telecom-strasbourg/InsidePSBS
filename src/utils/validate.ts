import { z } from "zod";

export const validate = async <T>(
  schema: z.AnyZodObject | z.ZodOptional<z.AnyZodObject>,
  data: T
) => {
  try {
    const parsedData = await schema.safeParseAsync(data);
    return parsedData.data;
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
