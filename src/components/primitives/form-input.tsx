import type { useForm } from "@/hooks/useForm";
import { colors } from "@/theme/colors";
import { useTheme } from "@/theme/theme-context";
import { cn } from "@/utils/cn";
import { Eye, EyeOff } from "lucide-react-native";
import { useState } from "react";
import type { TextInputProps } from "react-native";
import { TextInput, TouchableOpacity, View } from "react-native";
import type { TypeOf, ZodSchema } from "zod";
import { Typography } from "./typography";

export type FormTextInputProps<Z extends ZodSchema> = TextInputProps & {
  form: ReturnType<typeof useForm<Z>>;
  id: keyof TypeOf<Z>;
  label?: string;
  password?: boolean;
};

export const FormTextInput = <Z extends ZodSchema>({
  form,
  id,
  label,
  password,
  className,
  ...props
}: FormTextInputProps<Z>) => {
  const { theme } = useTheme();
  const error = form.formError[id];
  const [show, setShow] = useState(false);
  return (
    <View className={cn("gap-2", className)}>
      {label && (
        <Typography
          size="h3"
          fontWeight="medium"
          className={cn(error && "text-destructive")}
        >
          {label}
        </Typography>
      )}
      <View className="relative">
        <TextInput
          value={`${form.values[id]}`}
          onChangeText={(value: string) => form.updateValue(id, value)}
          className={cn(
            "items-center rounded-2xl bg-popover border-2 border-transparent focus:border-border p-4 text-foreground ",
            error && "border-destructive"
          )}
          placeholderTextColor={colors[theme].mutedForeground}
          style={{ fontFamily: "SpaceGrotesk-medium" }}
          secureTextEntry={password && !show}
          {...props}
        />
        {password && (
          <TouchableOpacity
            onPress={() => setShow((prev) => !prev)}
            className="absolute right-4 h-full justify-center"
          >
            {show ? (
              <Eye color={colors[theme].foreground} />
            ) : (
              <EyeOff color={colors[theme].foreground} />
            )}
          </TouchableOpacity>
        )}
      </View>
      {error && (
        <Typography size="p" className="text-destructive">
          {error}
        </Typography>
      )}
    </View>
  );
};
