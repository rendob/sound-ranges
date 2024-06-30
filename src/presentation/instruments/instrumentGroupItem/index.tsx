/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import { InstrumentCategory } from "../../../domain/instrument/instrumentCategory";
import { toggleInstrumentGroupSelection } from "../../../infrastructure/zustand/instruments/action";
import { dispatch } from "../../../infrastructure/zustand/appStore";
import { InstrumentItem } from "../instrumentItem";
import { useInstrumentGroup } from "../../../infrastructure/zustand/instruments/selector";
import { appColor } from "../../style/appColor";
import { Checkbox } from "../../common/checkbox";

const styles = {
  root: css({
    alignItems: "center",
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
  label: css({
    marginLeft: "4px",
  }),
};

type Props = { category: InstrumentCategory };

export const InstrumentGroupItem = ({ category }: Props) => {
  const instrumentGroup = useInstrumentGroup(category);

  const handleClick = () => dispatch(toggleInstrumentGroupSelection(category));

  return (
    <div>
      <div onClick={handleClick} css={styles.root}>
        <Checkbox selectionStatus={instrumentGroup.selectionStatus} />
        <span css={styles.label}>{category}</span>
      </div>

      {instrumentGroup.instrumentIds.map((id) => (
        <InstrumentItem key={id} id={id} />
      ))}
    </div>
  );
};
