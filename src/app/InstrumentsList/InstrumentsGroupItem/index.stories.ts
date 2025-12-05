import type { Meta, StoryObj } from "@storybook/react";
import { instrumentGroups } from "@/_features/instrumentGroup/data";
import { InstrumentsGroupItem } from "./index";

const meta = {
  component: InstrumentsGroupItem,
  parameters: {
    layout: "centered",
  },
  args: {},
} satisfies Meta<typeof InstrumentsGroupItem>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { instrumentGroup: instrumentGroups[0] },
};
