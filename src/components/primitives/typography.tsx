import { cn } from "@/utils/cn";
import type { VariantProps } from "class-variance-authority";
import { cva } from "class-variance-authority";
import type { PropsWithChildren } from "react";
import { Text, type TextProps } from "react-native";

export const typographyVariants = cva("text-foreground", {
  variants: {
    size: {
      h1: "text-5xl",
      h2: "text-4xl",
      h3: "text-3xl",
      h4: "text-2xl",
      h5: "text-xl",
      p: "text-base",
    },
  },
  defaultVariants: {
    size: "p",
  },
});

export type TypographyProps = PropsWithChildren<
  {
    fontWeight?:
      | "light"
      | "regular"
      | "medium"
      | "semibold"
      | "bold"
      | "extrabold";
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
  fontFamily = "OpenSans",
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
