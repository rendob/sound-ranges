import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "storybook/test";
import { SelectionStatus } from "@/_features/instrument/selectionStatus";
import { ListItem } from "./index";

const meta = {
  component: ListItem,
  parameters: {
    layout: "centered",
  },
  args: {
    children: "Item",
    onClick: fn(),
  },
} satisfies Meta<typeof ListItem>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Selected: Story = {
  args: {
    selectionStatus: SelectionStatus.SELECTED,
  },
};

export const Mixed: Story = {
  args: {
    selectionStatus: SelectionStatus.MIXED,
  },
};

export const Unselected: Story = {
  args: {
    selectionStatus: SelectionStatus.UNSELECTED,
  },
};
