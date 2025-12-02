import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "storybook/test";
import { SvgButton } from "./index";

const meta = {
  component: SvgButton,
  parameters: {
    layout: "centered",
  },
  args: {
    label: "button",
    onClick: fn(),
    children: <circle cx={12} cy={12} r={10} />,
  },
} satisfies Meta<typeof SvgButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
