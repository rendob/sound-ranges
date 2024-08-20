import { css } from "@emotion/react";
import { appDimen } from "../style/appDimen";
import { allNoteNumbers } from "../../domain/noteNumber";
import { SoundRangeTableHeader } from "./soundRangeTableHeader";
import { SoundRangeTableBody } from "./soundRangeTableBody";

const styles = {
  root: css({
    display: "flex",
    flexDirection: "column",
    flex: 1,
    overflowX: "scroll",
  }),
};

export const SoundRangeTable = () => {
  const width = appDimen.keyboardKeyWidth * allNoteNumbers.length;

  return (
    <div css={styles.root}>
      <SoundRangeTableHeader width={width} />
      <SoundRangeTableBody width={width} />
    </div>
  );
};
