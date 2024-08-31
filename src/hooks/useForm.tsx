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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] =
    useState<Record<keyof z.infer<typeof schema>, string>>(defaultError);

  const updateValue = async <K extends keyof z.infer<typeof schema>>(
    key: K,
    value: z.infer<typeof schema>[K]
  ) => {
    let new_value;
    setValues((p) => {
      new_value = { ...p, [key]: value };
      return new_value;
    });

    if (formError[key] !== "") {
      await checkError(new_value);
    }
  };

  const checkError = async (values: z.infer<typeof schema>) => {
    setFormError(defaultError);
    const result = await schema.safeParseAsync(values);

    if (!result.success) {
      result.error.errors.forEach((error) => {
        setFormError((p) => ({ ...p, [error.path[0]]: error.message }));
      });
      return false;
    }
    return true;
  };

  const submit = async (
    action: (values: z.infer<typeof schema>) => Promise<void>
  ) => {
    setIsSubmitting(true);
    const is_ok = await checkError(values);

    try {
      if (is_ok) await action(values);
      setIsSubmitting(false);
      return is_ok;
    } catch (e) {
      console.error(e);
      setIsSubmitting(false);
      return false;
    }
  };

  return { values, updateValue, isSubmitting, formError, submit };
};
