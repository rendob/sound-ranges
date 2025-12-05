import { SelectionStatus } from "@/_features/instrument/selectionStatus";

type Props = { selectionStatus: SelectionStatus };

export const Checkbox: React.FC<Props> = ({ selectionStatus }) => {
  const content = (() => {
    switch (selectionStatus) {
      case SelectionStatus.SELECTED:
        return <SelectedCheckbox />;
      case SelectionStatus.MIXED:
        return <MixedCheckbox />;
      case SelectionStatus.UNSELECTED:
        return <UnselectedCheckbox />;
    }
  })();

  return (
    <svg
      className="shrink-0"
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>Checkbox</title>

      {content}
    </svg>
  );
};

const SelectedCheckbox = () => (
  <>
    <rect className="fill-primary" width="18" height="18" rx="2" />
    <path
      className="fill-primary-content"
      d="M7 13.4L3 9.4L4.4 8L7 10.6L13.6 4L15 5.4L7 13.4Z"
    />
  </>
);

const MixedCheckbox = () => (
  <>
    <rect className="fill-primary" width="18" height="18" rx="2" />
    <path className="fill-primary-content" d="M4 10V8H14V10H4Z" />
  </>
);

const UnselectedCheckbox = () => (
  <rect
    className="stroke-base-content"
    x="1"
    y="1"
    width="16"
    height="16"
    rx="1"
    strokeWidth="2"
  />
);
