import { twMerge } from "tailwind-merge";
import { tv } from "tailwind-variants";

export const ButtonVariant = {
  FILLED: "filled",
  OUTLINED: "outlined",
  DESTRUCTIVE: "destructive",
} as const;
export type ButtonVariant = (typeof ButtonVariant)[keyof typeof ButtonVariant];

const buttonStyle = tv({
  base: "cursor-pointer rounded-md px-4 py-2 text-center text-sm disabled:bg-gray-400",
  variants: {
    variant: {
      filled: "bg-green-700 text-white hover:bg-green-600",
      outlined: "border border-gray-400 border-solid hover:bg-gray-700",
      destructive: "bg-red-700 text-white hover:bg-red-600",
    } satisfies Record<ButtonVariant, string>,
  },
});

type Props = React.ComponentProps<"button"> & {
  variant: ButtonVariant;
};

export const Button: React.FC<Props> = ({
  className,
  variant,
  children,
  ...rest
}) => {
  return (
    <button className={twMerge(buttonStyle({ variant }), className)} {...rest}>
      {children}
    </button>
  );
};
