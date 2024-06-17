import { cn } from "@/utils/cn";
import type { VariantProps } from "class-variance-authority";
import { cva } from "class-variance-authority";
import type { PropsWithChildren } from "react";
import { Text, type TextProps } from "react-native";

export const typographyVariants = cva("text-foreground", {
  variants: {
    size: {
      h1: "text-4xl",
      h2: "text-3xl",
      h3: "text-2xl",
      h4: "text-xl",
      h5: "text-base",
      p: "text-sm",
    },
  },
  defaultVariants: {
    size: "p",
  },
});

export type TypographyProps = PropsWithChildren<
  {
    fontWeight?:
      | "extralight"
      | "thin"
      | "light"
      | "regular"
      | "medium"
      | "semibold"
      | "bold"
      | "extrabold"
      | "black";
    fontStyle?: "italic" | "normal";
    fontFamily?: string;
  } & TextProps
> &
  VariantProps<typeof typographyVariants>;

export const Typography = ({
  size,
  children,
  className,
  fontWeight = "regular",
  fontStyle = "normal",
  fontFamily = "Inter",
  ...props
}: TypographyProps) => {
  const font = `${fontFamily}-${fontWeight}${
    fontStyle === "italic" ? "Italic" : ""
  }`;

  return (
    <Text
      className={cn(typographyVariants({ size }), className)}
      style={{ fontFamily: font }}
      {...props}
    >
      {children}
    </Text>
  );
};
