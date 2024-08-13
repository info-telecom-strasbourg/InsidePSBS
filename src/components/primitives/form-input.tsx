import type { useForm } from "@/hooks/useForm";
import { colors } from "@/theme/colors";
import { useTheme } from "@/theme/theme-context";
import { cn } from "@/utils/cn";
import type { TextInputProps } from "react-native";
import { TextInput } from "react-native";
import type { TypeOf, ZodSchema } from "zod";
import { Typography } from "./typography";

export const FormTextInput = <Z extends ZodSchema>({
  form,
  id,
  label,
  ...props
}: TextInputProps & {
  form: ReturnType<typeof useForm<Z>>;
  id: keyof TypeOf<Z>;
  label?: string;
}) => {
  const { theme } = useTheme();
  return (
    <>
      {label && (
        <Typography size="h2" fontWeight="medium" className="mb-3">
          {label}
        </Typography>
      )}
      <TextInput
        {...props}
        value={form.values[id]}
        onChangeText={(value) => form.updateValue(id, value)}
        className={cn(
          "mb-3 items-center rounded-2xl border-2 bg-popover p-4 text-foreground",
          form.formError[id] ? "border-destructive" : ""
        )}
        placeholderTextColor={colors[theme].mutedForeground}
        style={{ fontFamily: "SpaceGrotesk-medium" }}
      />
      {form.formError[id] && (
        <Typography size="p" className="text-destructive">
          {form.formError[id]}
        </Typography>
      )}
    </>
  );
};
