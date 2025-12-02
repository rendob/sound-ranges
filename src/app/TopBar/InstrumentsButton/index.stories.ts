import type { Meta, StoryObj } from "@storybook/react";
import { InstrumentsButton } from "./index";

const meta = {
  component: InstrumentsButton,
  parameters: {
    layout: "centered",
  },
  args: {},
} satisfies Meta<typeof InstrumentsButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
