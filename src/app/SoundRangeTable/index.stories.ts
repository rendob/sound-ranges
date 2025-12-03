import type { Meta, StoryObj } from "@storybook/react";
import { SoundRangeTable } from "./index";

const meta = {
  component: SoundRangeTable,
  parameters: {
    layout: "centered",
  },
  args: {},
} satisfies Meta<typeof SoundRangeTable>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
