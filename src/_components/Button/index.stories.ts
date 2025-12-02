import type { Meta, StoryObj } from "@storybook/react";
import { Button, ButtonVariant } from ".";

const meta = {
  component: Button,
  parameters: {
    layout: "centered",
  },
  args: { type: "button", children: "Button", disabled: false },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Filled: Story = {
  args: {
    variant: ButtonVariant.FILLED,
  },
};

export const Outlined: Story = {
  args: {
    variant: ButtonVariant.OUTLINED,
  },
};

export const Destructive: Story = {
  args: {
    variant: ButtonVariant.DESTRUCTIVE,
  },
};

export const Disabled: Story = {
  args: {
    variant: ButtonVariant.FILLED,
    disabled: true,
  },
};
