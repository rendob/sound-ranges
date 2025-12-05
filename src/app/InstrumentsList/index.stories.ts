import type { Meta, StoryObj } from "@storybook/react";
import { InstrumentsList } from "./index";

const meta = {
  component: InstrumentsList,
  parameters: {
    layout: "centered",
  },
  args: {
    isOpen: true,
  },
} satisfies Meta<typeof InstrumentsList>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
