import { useTranslation } from "react-i18next";
import { instrumentStore } from "@/_features/instrument/store";
import { ListItem } from "../ListItem";

export const AllItem: React.FC = () => {
  const { t } = useTranslation();
  const allSelectionStatus = instrumentStore.useAllSelectionStatus();

  const handleAllItemClick: React.MouseEventHandler = () => {
    instrumentStore.toggleAllSelection();
  };

  return (
    <ListItem
      label={t("instruments.all")}
      selectionStatus={allSelectionStatus}
      onClick={handleAllItemClick}
    />
  );
};
