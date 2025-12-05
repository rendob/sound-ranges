import { LanguageSelect } from "./LanguageSelect";
import { PitchTypeSelect } from "./PitchTypeSelect";

export const settingDialogId = "settings-dialog";

export const SettingsDialog: React.FC = () => {
  // dialog closedby=any は Safari 未対応のため不採用

  return (
    <div
      className="m-auto mt-1 mr-1 space-y-2 border border-border bg-base p-2 text-base-content opacity-0 transition-[display,opacity] transition-discrete open:opacity-100 starting:open:opacity-0"
      id={settingDialogId}
      popover="auto"
    >
      <PitchTypeSelect />

      <LanguageSelect />
    </div>
  );
};
