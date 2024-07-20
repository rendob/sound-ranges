/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import { InstrumentCategory } from "../../domain/instrument/instrumentCategory";
import { InstrumentGroupItem } from "./instrumentGroupItem";
import { appColor } from "../style/appColor";

const style = css({
  borderRight: `1px solid ${appColor.border}`,
  height: "auto",
  overflowY: "scroll",
});

export const Instruments = () => {
  const categories = Object.values(InstrumentCategory);

  return (
    <div css={style}>
      {categories.map((category) => (
        <InstrumentGroupItem key={category} category={category} />
      ))}
    </div>
  );
};
