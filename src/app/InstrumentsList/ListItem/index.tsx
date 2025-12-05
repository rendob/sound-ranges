import { twMerge } from "tailwind-merge";
import type { SelectionStatus } from "@/_features/instrument/selectionStatus";
import { Checkbox } from "./Checkbox";

type Props = {
  className?: string;
  selectionStatus: SelectionStatus;
  children: React.ReactNode;
  onClick: React.MouseEventHandler;
};

export const ListItem: React.FC<Props> = ({
  className,
  selectionStatus,
  children,
  onClick,
}) => {
  return (
    <button
      className={twMerge(
        "flex w-full cursor-pointer items-center gap-1 bg-base p-1",
        "transition-colors hover:bg-base-hover",
        className,
      )}
      type="button"
      onClick={onClick}
    >
      <Checkbox selectionStatus={selectionStatus} />

      <span className="text-start">{children}</span>
    </button>
  );
};
