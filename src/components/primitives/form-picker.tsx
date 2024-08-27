import type { useForm } from "@/hooks/useForm";
import { colors } from "@/theme/colors";
import { useTheme } from "@/theme/theme-context";
import { cn } from "@/utils/cn";
import type { PickerProps } from "@react-native-picker/picker";
import { Picker } from "@react-native-picker/picker";
import { View } from "react-native";
import type { TypeOf, ZodSchema } from "zod";
import { Typography } from "./typography";

export type FormPickerProps<Z extends ZodSchema> = PickerProps & {
  form: ReturnType<typeof useForm<Z>>;
  id: keyof TypeOf<Z>;
  label?: string;
  values?: { id: number; value: string }[];
};

export const FormPicker = <Z extends ZodSchema>({
  form,
  id,
  label,
  className,
  values,
  ...props
}: FormPickerProps<Z>) => {
  const { theme } = useTheme();
  const error = form.formError[id];

  return (
    <View className={cn("gap-2 flex-1", className)}>
      {label && (
        <Typography
          size="h3"
          fontWeight="medium"
          className={cn(error && "text-destructive")}
        >
          {label}
        </Typography>
      )}
      <View
        className={cn(
          "flex-1 overflow-hidden rounded-2xl border-2 border-transparent bg-popover h-auto",
          error && "border-destructive"
        )}
      >
        <Picker
          selectedValue={form.values[id] + 1}
          onValueChange={(value, index) => form.updateValue(id, index)}
          style={{
            fontFamily: "SpaceGrotesk-medium",
            flex: 1,
            color: colors[theme].foreground,
          }}
          dropdownIconColor={colors[theme].foreground}
          dropdownIconRippleColor="transparent"
          selectionColor={colors.red}
          {...props}
        >
          {values?.map((item) => (
            <Picker.Item
              key={item.id}
              label={item.value}
              value={item.id}
              style={{ backgroundColor: colors[theme].popover }}
              color={colors[theme].foreground}
            />
          ))}
        </Picker>
      </View>

      {error && (
        <Typography size="p" className="text-destructive">
          {error}
        </Typography>
      )}
    </View>
  );
};
