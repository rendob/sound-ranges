import { twMerge } from "tailwind-merge";

type Props = React.ComponentProps<"select">;

export const Select: React.FC<Props> = ({ className, children, ...rest }) => {
  return (
    <select
      className={twMerge(
        "cursor-pointer rounded border border-border",
        className,
      )}
      {...rest}
    >
      {children}
    </select>
  );
};
