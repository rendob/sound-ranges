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

const styles = {
  root: css({
    borderRight: `1px solid ${appColor.border}`,
    display: "flex",
    flexDirection: "column",
  }),
  instruments: css({
    overflowY: "scroll",
  }),
};

export const Instruments = () => {
  return (
    <div css={styles.root}>
      <AllItem />

      <div css={styles.instruments}>
        {instrumentGroups.map((instrumentGroup) => (
          <InstrumentGroupItem
            key={instrumentGroup.name}
            instrumentGroup={instrumentGroup}
          />
        ))}
      </div>
    </div>
  );
};

const AllItem = () => {
  const selectionStatus = useAllSelectionStatus();

  const handleClick = () => dispatch(toggleAllInstrumentsSelection());

  return (
    <div onClick={handleClick} css={instrumentsStyles.item(asInt(0))}>
      <Checkbox selectionStatus={selectionStatus} />
      <span css={instrumentsStyles.itemLabel}>All</span>
    </div>
  );
};
