/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import { toggleInstrumentGroupSelection } from "../../../infrastructure/zustand/instruments/action";
import { dispatch } from "../../../infrastructure/zustand/appStore";
import { InstrumentItem } from "../instrumentItem";
import { appColor } from "../../style/appColor";
import { Checkbox } from "../../common/checkbox";
import { InstrumentGroup } from "../../../domain/instrumentGroup";
import { useInstrumentGroupSelectionStatus } from "../../../infrastructure/zustand/instruments/selector";

const styles = {
  root: css({
    alignItems: "center",
    backgroundColor: appColor.background,
    cursor: "pointer",
    display: "flex",
    padding: "4px",
    position: "sticky",
    top: "0",
    ":hover": {
      backgroundColor: appColor.hover(appColor.background),
    },
  }),
  label: css({
    marginLeft: "4px",
  }),
};

type Props = { instrumentGroup: InstrumentGroup };

export const InstrumentGroupItem = ({ instrumentGroup }: Props) => {
  const selectionStatus = useInstrumentGroupSelectionStatus(instrumentGroup);

  const handleClick = () =>
    dispatch(toggleInstrumentGroupSelection(instrumentGroup));

  return (
    <div>
      <div onClick={handleClick} css={styles.root}>
        <Checkbox selectionStatus={selectionStatus} />
        <span css={styles.label}>{instrumentGroup.name}</span>
      </div>

      {instrumentGroup.instrumentIds.map((id) => (
        <InstrumentItem key={id} id={id} />
      ))}
    </div>
  );
};
