import { twMerge } from "tailwind-merge";

type Props = {
  label: string;
  onClick: React.MouseEventHandler;
  className?: string;
  children: React.ReactNode;
};

export const SvgButton: React.FC<Props> = ({
  label,
  onClick,
  className,
  children,
}) => {
  return (
    <button
      className={twMerge(
        "cursor-pointer p-2 transition-colors hover:bg-white/50",
        className,
      )}
      type="button"
      onClick={onClick}
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
