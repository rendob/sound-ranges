/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import { appColor } from "../../style/appColor";

const styles = {
  root: css({
    backgroundColor: appColor.background,
    position: "absolute",
    right: 0,
    top: 0,
  }),
};

export const SettingsDialog = () => {
  return <div css={styles.root}>Dialog</div>;
};
