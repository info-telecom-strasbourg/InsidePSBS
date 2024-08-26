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
  const defaultError = Object.keys(defaultValues).reduce((acc, key) => {
    return { ...acc, [key]: "" };
  }, {} as Record<keyof typeof defaultValues, string>);

  const [values, setValues] = useState<z.infer<typeof schema>>(defaultValues);
  const [formError, setFormError] =
    useState<Record<keyof z.infer<typeof schema>, string>>(defaultError);

  const updateValue = <K extends keyof z.infer<typeof schema>>(
    key: K,
    value: z.infer<typeof schema>[K]
  ) => {
    let new_value;
    setValues((p) => {
      new_value = { ...p, [key]: value };
      return new_value;
    });

    if (formError[key] !== "") {
      checkError(new_value);
    }
  };

  const checkError = (values: z.infer<typeof schema>) => {
    setFormError(defaultError);
    const result = schema.safeParse(values);
    if (!result.success) {
      result.error.errors.forEach((error) => {
        setFormError((p) => ({ ...p, [error.path[0]]: error.message }));
      });
      return false;
    }
    return true;
  };

  const submit = (action: (values: z.infer<typeof schema>) => void) => {
    if (!checkError(values)) return;
    action(values);
  };

  return { values, updateValue, formError, submit };
};
