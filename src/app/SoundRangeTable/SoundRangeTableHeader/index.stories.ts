import type { Meta, StoryObj } from "@storybook/react";
import { SoundRangeTableHeader } from "./index";

const meta = {
  component: SoundRangeTableHeader,
  parameters: {
    layout: "centered",
  },
  args: {},
} satisfies Meta<typeof SoundRangeTableHeader>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
