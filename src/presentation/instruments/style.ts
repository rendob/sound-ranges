import { css } from "@emotion/react";
import { appColor } from "../style/appColor";
import { Int } from "../../domain/int";
import { appStyle } from "../style/appStyle";

export const instrumentsStyles = {
  item: (indentLevel: Int) =>
    css({
      alignItems: "center",
      backgroundColor: appColor.background,
      cursor: "pointer",
      display: "flex",
      padding: `4px`,
      paddingLeft: `${4 + indentLevel * 12}px`,
      transition: `background-color ${appStyle.hoverAnimationDuration}`,
      ":hover": {
        backgroundColor: appColor.hover(appColor.background),
      },
    }),
  itemLabel: css({
    marginLeft: "4px",
  }),
} as const;
