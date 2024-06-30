/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import { toggleInstrumentSelection } from "../../../infrastructure/zustand/instruments/action";
import { InstrumentId } from "../../../domain/instrument/instrumentId";
import { dispatch } from "../../../infrastructure/zustand/appStore";
import { useInstrument } from "../../../infrastructure/zustand/instruments/selector";
import { appColor } from "../../style/appColor";
import { SelectionStatus } from "../../../domain/instrumentGroup";
import { Checkbox } from "../../common/checkbox";

const styles = {
  root: css({
    alignItems: "center",
    cursor: "pointer",
    display: "flex",
    padding: "4px 16px",
    userSelect: "none",
    ":hover": {
      backgroundColor: appColor.hover(appColor.background),
    },
  }),
  label: css({
    marginLeft: "4px",
  }),
};

type Props = { id: InstrumentId };

export const InstrumentItem = ({ id }: Props) => {
  const instrument = useInstrument(id);
  const selectionStatus = instrument.isSelected
    ? SelectionStatus.SELECTED
    : SelectionStatus.UNSELECTED;

  const handleClick = () => dispatch(toggleInstrumentSelection(id));

  return (
    <div onClick={handleClick} css={styles.root}>
      <Checkbox selectionStatus={selectionStatus} />
      <span css={styles.label}>{instrument.name}</span>
    </div>
  );
};
