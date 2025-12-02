import type { Meta, StoryObj } from "@storybook/react";
import { SettingsButton } from "./index";

const meta = {
  component: SettingsButton,
  parameters: {
    layout: "centered",
  },
  args: {},
} satisfies Meta<typeof SettingsButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
