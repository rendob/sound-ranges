import { twMerge } from "tailwind-merge";

type Props = React.ComponentProps<"button"> & {
  label: string;
};

export const SvgButton: React.FC<Props> = ({
  label,
  className,
  children,
  ...rest
}) => {
  return (
    <button
      className={twMerge(
        "cursor-pointer p-2 transition-colors hover:bg-base-hover",
        className,
      )}
      type="button"
      {...rest}
    >
      <svg
        className="fill-base-content"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <title>{label}</title>
        {children}
      </svg>
    </button>
  );
};
