/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import { toggleInstrumentSelection } from "../../../infrastructure/zustand/instruments/action";
import { InstrumentId } from "../../../domain/instrument/instrumentId";
import { dispatch } from "../../../infrastructure/zustand/appStore";
import { useInstrument } from "../../../infrastructure/zustand/instruments/selector";
import { appColor } from "../../style/appColor";

const style = css({
  cursor: "pointer",
  display: "flex",
  padding: "4px 12px",
  userSelect: "none",
  ":hover": {
    backgroundColor: appColor.hover(appColor.background),
  },
});

type Props = { id: InstrumentId };

export const InstrumentItem = ({ id }: Props) => {
  const instrument = useInstrument(id);
  const elementId = `checkbox-${id}`;

  const handleSelectionChange = () => dispatch(toggleInstrumentSelection(id));

  return (
    <label htmlFor={elementId} css={style}>
      <input
        type="checkbox"
        id={elementId}
        checked={instrument.isSelected}
        onChange={handleSelectionChange}
      />
      {instrument.name}
    </label>
  );
};
