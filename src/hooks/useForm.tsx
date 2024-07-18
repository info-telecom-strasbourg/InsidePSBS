import { useState } from "react";
import type { TypeOf, z, ZodSchema } from "zod";

export type UseZodFormProps<Z extends ZodSchema> = {
  schema: Z;
  defaultValues: TypeOf<Z>;
};

export const useForm = <Z extends ZodSchema>({
  schema,
  defaultValues,
}: UseZodFormProps<Z>) => {
  const [values, setValues] = useState<z.infer<typeof schema>>(defaultValues);
  const [formError, setFormError] = useState<Record<string, string>>({});

  const updateValue = (key: string | number | symbol, value: string) => {
    setValues((p) => ({ ...p, [key]: value }));
  };

  const submit = (action: (values: z.infer<typeof schema>) => void) => {
    setFormError({});
    const result = schema.safeParse(values);
    if (!result.success) {
      result.error.errors.forEach((error) => {
        setFormError((p) => ({ ...p, [error.path[0]]: error.message }));
      });
    }

    action(values);
  };

  return { values, updateValue, formError, submit };
};
