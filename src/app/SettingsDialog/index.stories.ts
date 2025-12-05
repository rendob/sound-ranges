import type { Meta, StoryObj } from "@storybook/react";
import { SettingsDialog } from "./index";

const meta = {
  component: SettingsDialog,
  parameters: {
    layout: "centered",
  },
  args: {},
} satisfies Meta<typeof SettingsDialog>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
