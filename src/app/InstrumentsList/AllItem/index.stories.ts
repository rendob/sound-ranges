import type { Meta, StoryObj } from "@storybook/react";
import { AllItem } from "./index";

const meta = {
  component: AllItem,
  parameters: {
    layout: "centered",
  },
  args: {},
} satisfies Meta<typeof AllItem>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
