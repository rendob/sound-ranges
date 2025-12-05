import type { Meta, StoryObj } from "@storybook/react";
import { TopBar } from "./index";

const meta = {
  component: TopBar,
  parameters: {
    layout: "fullscreen",
  },
  args: {},
} satisfies Meta<typeof TopBar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
