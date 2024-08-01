/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import { toggleInstrumentGroupSelection } from "../../../infrastructure/zustand/instruments/action";
import { dispatch } from "../../../infrastructure/zustand/appStore";
import { InstrumentItem } from "../instrumentItem";
import { Checkbox } from "../../common/checkbox";
import { InstrumentGroup } from "../../../domain/instrumentGroup";
import { useInstrumentGroupSelectionStatus } from "../../../infrastructure/zustand/instruments/selector";
import { instrumentsStyles } from "../style";
import { asInt } from "../../../domain/int";

const styles = {
  root: css(instrumentsStyles.item(asInt(1)), {
    position: "sticky",
    top: "0",
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
        <span css={instrumentsStyles.itemLabel}>{instrumentGroup.name}</span>
      </div>

      {instrumentGroup.instrumentIds.map((id) => (
        <InstrumentItem key={id} id={id} />
      ))}
    </div>
  );
};
