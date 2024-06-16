import { cn } from "@/utils/cn";
import type { VariantProps } from "class-variance-authority";
import { cva } from "class-variance-authority";
import type { PropsWithChildren } from "react";
import type { TouchableOpacityProps } from "react-native";
import { Text, TouchableOpacity } from "react-native";

export const buttonVariants = cva(
  "flex w-full items-center justify-center rounded-md",
  {
    variants: {
      variant: {
        default: "bg-primary",
        secondary: "bg-secondary",
        outline: "border border-border bg-background",
      },
      size: {
        default: "px-5 py-3",
        sm: "px-3 py-2",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export const textButtonVariants = cva("text-xl font-bold", {
  variants: {
    variant: {
      default: "text-primary-foreground",
      secondary: "text-secondary-foreground",
      outline: "text-foreground",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export type ButtonProps = PropsWithChildren<
  {} & VariantProps<typeof buttonVariants> & TouchableOpacityProps
>;

export const Button = ({
  children,
  variant,
  size,
  className,
  ...props
}: ButtonProps) => {
  return (
    <TouchableOpacity
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    >
      <Text className={cn(textButtonVariants({ variant }))}>{children}</Text>
    </TouchableOpacity>
  );
};
