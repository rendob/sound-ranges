/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import { InstrumentCategory } from "../../../domain/instrument/instrumentCategory";
import { SelectionStatus } from "../../../domain/instrumentGroup";
import { toggleInstrumentGroupSelection } from "../../../infrastructure/zustand/instruments/action";
import { dispatch } from "../../../infrastructure/zustand/appStore";
import { InstrumentItem } from "../instrumentItem";
import { useInstrumentGroup } from "../../../infrastructure/zustand/instruments/selector";
import { appColor } from "../../style/appColor";

const styles = {
  root: css({
    backgroundColor: appColor.background,
    cursor: "pointer",
    display: "flex",
    padding: "4px",
    position: "sticky",
    top: "0",
    userSelect: "none",
    ":hover": {
      backgroundColor: appColor.hover(appColor.background),
    },
  }),
};

type Props = { category: InstrumentCategory };

export const InstrumentGroupItem = ({ category }: Props) => {
  const instrumentGroup = useInstrumentGroup(category);
  const elementId = `checkbox-${category}`;

  const handleSelectionChange = () =>
    dispatch(toggleInstrumentGroupSelection(category));

  return (
    <div>
      <label htmlFor={elementId} css={styles.root}>
        <input
          type="checkbox"
          id={elementId}
          checked={instrumentGroup.selectionStatus === SelectionStatus.SELECTED}
          onChange={handleSelectionChange}
        />
        {instrumentGroup.id} {instrumentGroup.selectionStatus}
      </label>
      {instrumentGroup.instrumentIds.map((id) => (
        <InstrumentItem key={id} id={id} />
      ))}
    </div>
  );
};
