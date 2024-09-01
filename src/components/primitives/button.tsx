import { colors } from "@/theme/colors";
import { useTheme } from "@/theme/theme-context";
import { cn } from "@/utils/cn";
import type { VariantProps } from "class-variance-authority";
import { cva } from "class-variance-authority";
import type { PropsWithChildren } from "react";
import type { TouchableOpacityProps } from "react-native";
import { ActivityIndicator, TouchableOpacity } from "react-native";
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
        destructive: "w-full border border-destructive bg-popover",
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

export const textButtonVariants = cva("flex flex-row gap-2 text-xl", {
  variants: {
    variant: {
      default: "text-primary-foreground",
      secondary: "text-secondary-foreground",
      outline: "text-foreground",
      link: "text-base text-primary",
      destructive: "text-destructive",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export type ButtonProps = PropsWithChildren<
  {
    loading?: boolean;
  } & VariantProps<typeof buttonVariants> &
    TouchableOpacityProps
>;

export const Button = ({
  children,
  variant,
  size,
  loading,
  className,
  ...props
}: ButtonProps) => {
  const { theme } = useTheme();
  return (
    <TouchableOpacity
      className={cn(
        buttonVariants({ variant, size }),
        props.disabled && "opacity-40",
        className
      )}
      {...props}
    >
      <Typography
        className={cn(textButtonVariants({ variant }))}
        fontWeight="bold"
      >
        {loading ? (
          <ActivityIndicator
            animating={loading}
            color={colors[theme].primaryForeground}
          />
        ) : (
          children
        )}
      </Typography>
    </TouchableOpacity>
  );
};
