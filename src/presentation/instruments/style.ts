/** @jsxRuntime classic */
import { css } from "@emotion/react";
import { appColor } from "../style/appColor";
import { Int } from "../../domain/int";

export const instrumentsStyles = {
  item: (indentLevel: Int) =>
    css({
      alignItems: "center",
      backgroundColor: appColor.background,
      cursor: "pointer",
      display: "flex",
      padding: `4px`,
      paddingLeft: `${4 + indentLevel * 12}px`,
      ":hover": {
        backgroundColor: appColor.hover(appColor.background),
      },
    }),
  itemLabel: css({
    marginLeft: "4px",
  }),
} as const;
