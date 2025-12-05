import type { Meta, StoryObj } from "@storybook/react";
import { Select } from "./index";

const meta = {
  component: Select,
  parameters: {
    layout: "centered",
  },
  args: {},
} satisfies Meta<typeof Select>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
