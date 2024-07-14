import { SelectionStatus } from "../../domain/instrument/selectionStatus";
import { appColor } from "../style/appColor";
import { Fragment } from "react";

type Props = { selectionStatus: SelectionStatus };

export const Checkbox = ({ selectionStatus }: Props) => {
  const content = (() => {
    switch (selectionStatus) {
      case "Selected":
        return <SelectedCheckbox />;
      case "Mixed":
        return <MixedCheckbox />;
      case "Unselected":
        return <UnselectedCheckbox />;
    }
  })();

  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {content}
    </svg>
  );
};

const SelectedCheckbox = () => (
  <Fragment>
    <rect width="18" height="18" rx="2" fill={appColor.primary} />
    <path
      d="M7 13.4L3 9.4L4.4 8L7 10.6L13.6 4L15 5.4L7 13.4Z"
      fill={appColor.onPrimary}
    />
  </Fragment>
);

const MixedCheckbox = () => (
  <Fragment>
    <rect width="18" height="18" rx="2" fill={appColor.primary} />
    <path d="M4 10V8H14V10H4Z" fill={appColor.onPrimary} />
  </Fragment>
);

const UnselectedCheckbox = () => (
  <rect
    x="1"
    y="1"
    width="16"
    height="16"
    rx="1"
    stroke={appColor.onBackground}
    strokeWidth="2"
  />
);
