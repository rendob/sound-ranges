import { useTranslation } from "react-i18next";
import { Select } from "@/_components/Select";
import { getLabelForMiddleC, PitchType } from "@/_features/pitchType/model";
import { pitchTypeStore } from "@/_features/pitchType/store";
import { asExists } from "@/_lib/utils/exists";

export const PitchTypeSelect: React.FC = () => {
  const { t } = useTranslation();
  const pitchType = pitchTypeStore.usePitchType();
  const allPitchTypes = Object.values(PitchType);

  const handleChange: React.ChangeEventHandler<HTMLSelectElement> = (e) => {
    const newPitchType = asExists(
      allPitchTypes.find((pitchType) => pitchType.name === e.target.value),
    );
    pitchTypeStore.changePitchType(newPitchType);
  };

  return (
    <div className="flex items-center justify-between gap-2 p-1">
      <span>{t("settings.pitchTypeLabel")}:</span>

      <Select value={pitchType.name} onChange={handleChange}>
        {allPitchTypes.map((pitchType) => (
          <option key={pitchType.name} value={pitchType.name}>
            {getLabelForMiddleC(pitchType)}
          </option>
        ))}
      </Select>
    </div>
  );
};
