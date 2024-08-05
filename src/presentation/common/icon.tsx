import { css } from "@emotion/react";
import { appColor } from "../style/appColor";
import React from "react";

const styles = {
  root: css({
    cursor: "pointer",
    padding: "8px",
    ":hover": {
      backgroundColor: appColor.hover(appColor.background),
    },
  }),
};

type Props = {
  onClick: (e: React.MouseEvent) => void;
  className?: string;
  children: React.ReactNode;
};

export const Icon = ({ onClick, className, children }: Props) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onClick={onClick}
      className={className}
      css={styles.root}
    >
      {children}
    </svg>
  );
};
