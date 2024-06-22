import { cn } from "@/utils/cn";
import type { VariantProps } from "class-variance-authority";
import { cva } from "class-variance-authority";
import type { PropsWithChildren } from "react";
import type { TouchableOpacityProps } from "react-native";
import { TouchableOpacity } from "react-native";
import { Typography } from "./typography";

export const buttonVariants = cva(
  "flex items-center justify-center rounded-md",
  {
    variants: {
      variant: {
        default: "w-full bg-primary",
        secondary: "w-full bg-secondary",
        outline: "w-full border border-border bg-background",
        link: "",
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
      link: "text-base text-primary",
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
      <Typography className={cn(textButtonVariants({ variant }))}>
        {children}
      </Typography>
    </TouchableOpacity>
  );
};
