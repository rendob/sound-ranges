/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import { InstrumentGroupItem } from "./instrumentGroupItem";
import { appColor } from "../style/appColor";
import { instrumentGroups } from "../../infrastructure/source/instrumentGroup";

const style = css({
  borderRight: `1px solid ${appColor.border}`,
  height: "auto",
  overflowY: "scroll",
});

export const Instruments = () => {
  return (
    <div css={style}>
      {instrumentGroups.map((instrumentGroup) => (
        <InstrumentGroupItem
          key={instrumentGroup.name}
          instrumentGroup={instrumentGroup}
        />
      ))}
    </div>
  );
};
