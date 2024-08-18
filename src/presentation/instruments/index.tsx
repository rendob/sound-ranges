import { css } from "@emotion/react";
import { InstrumentGroupItem } from "./instrumentGroupItem";
import { appColor } from "../style/appColor";
import { instrumentGroups } from "../../infrastructure/source/instrumentGroup";
import { useAllSelectionStatus } from "../../infrastructure/zustand/instruments/selector";
import { dispatch } from "../../infrastructure/zustand/appStore";
import { toggleAllInstrumentsSelection } from "../../infrastructure/zustand/instruments/action";
import { Checkbox } from "../common/checkbox";
import { instrumentsStyles } from "./style";
import { asInt } from "../../domain/int";
import { useShouldShowInstruments } from "../../infrastructure/zustand/uiState/selector";
import { useTranslation } from "react-i18next";

const styles = {
  root: (shouldShowInstruments: boolean) =>
    css({
      borderRight: `1px solid ${appColor.border}`,
      display: shouldShowInstruments ? "flex" : "none",
      flexDirection: "column",
      height: "100%",
      position: "absolute",
      transform: `translateX(${shouldShowInstruments ? 0 : "-100%"})`,
      transitionBehavior: "allow-discrete",
      transitionDuration: "0.2s",
      transitionProperty: "display,transform",
      zIndex: 2,

      "@starting-style": {
        transform: "translateX(-100%)",
      },
    }),
  instruments: css({
    overflowY: "scroll",
  }),
};

export const Instruments = () => {
  const shouldShowInstruments = useShouldShowInstruments();

  return (
    <div css={styles.root(shouldShowInstruments)}>
      <AllItem />

      <div css={styles.instruments}>
        {instrumentGroups.map((instrumentGroup) => (
          <InstrumentGroupItem
            key={instrumentGroup.name.en}
            instrumentGroup={instrumentGroup}
          />
        ))}
      </div>
    </div>
  );
};

const AllItem = () => {
  const { t } = useTranslation();
  const selectionStatus = useAllSelectionStatus();

  const handleClick = () => dispatch(toggleAllInstrumentsSelection());

  return (
    <div onClick={handleClick} css={instrumentsStyles.item(asInt(0))}>
      <Checkbox selectionStatus={selectionStatus} />
      <span css={instrumentsStyles.itemLabel}>{t("instruments.all")}</span>
    </div>
  );
};
