import { LanguageSelect } from "./LanguageSelect";
import { PitchTypeSelect } from "./PitchTypeSelect";

type Props = {
  ref?: React.RefObject<HTMLDialogElement | null>;
};

export const SettingsDialog: React.FC<Props> = ({ ref }) => {
  return (
    <dialog
      className="m-auto mt-1 mr-1 border border-border bg-base p-1 text-base-content opacity-0 transition-[display,opacity] transition-discrete backdrop:hidden backdrop:bg-transparent open:opacity-100 starting:open:opacity-0"
      ref={ref}
      closedby="any"
    >
      <PitchTypeSelect />

      <LanguageSelect />
    </dialog>
  );
};
