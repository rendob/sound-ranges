import type { Meta, StoryObj } from "@storybook/react";
import { SoundRangeTableBody } from "./index";

const meta = {
  component: SoundRangeTableBody,
  parameters: {
    layout: "centered",
  },
  args: {},
} satisfies Meta<typeof SoundRangeTableBody>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
