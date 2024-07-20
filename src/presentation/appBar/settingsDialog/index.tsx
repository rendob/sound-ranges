/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import { appColor } from "../../style/appColor";
import { PitchType } from "../../../domain/noteNumber/pitchType";
import { asNoteNumber, getNoteNames } from "../../../domain/noteNumber";
import React from "react";
import { dispatch } from "../../../infrastructure/zustand/appStore";
import { setPitchType } from "../../../infrastructure/zustand/config/action";
import { assertExists } from "../../../util/exists";
import { usePitchType } from "../../../infrastructure/zustand/config/selector";

const styles = {
  root: css({
    backgroundColor: appColor.background,
    border: `1px solid ${appColor.border}`,
    padding: "8px",
    position: "absolute",
    right: "4px",
    top: "4px",
  }),
  row: css({
    display: "flex",
    alignItems: "center",
  }),
  label: css({
    marginRight: "8px",
  }),
  selector: css({
    cursor: "pointer",
  }),
};

export const SettingsDialog = () => {
  const currentPitchType = usePitchType();
  const pitchTypeId = "pitch-type";
  const pitchTypes = Object.values(PitchType);
  const middleC = asNoteNumber(60);
  const getPitchTypeLabel = (pitchType: PitchType) =>
    `${getNoteNames(middleC, pitchType)[0]} (${pitchType.name})`;

  const onClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const handlePitchTypeChange: React.ChangeEventHandler<HTMLSelectElement> = (
    e,
  ) => {
    const pitchType = pitchTypes.find((item) => item.name === e.target.value);
    assertExists(pitchType);
    dispatch(setPitchType(pitchType));
  };

  return (
    <div css={styles.root} onClick={onClick}>
      <div css={styles.row}>
        <span css={styles.label}>Display middle C as:</span>
        <select
          id={pitchTypeId}
          value={currentPitchType.name}
          onChange={handlePitchTypeChange}
          css={styles.selector}
        >
          {pitchTypes.map((pitchType) => (
            <option key={pitchType.name} value={pitchType.name}>
              {getPitchTypeLabel(pitchType)}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
