import type { Meta, StoryObj } from "@storybook/react";
import { asMidiProgramNumber } from "@/_features/instrument/midiProgramNumber";
import { SoundRangeItem } from "./index";

const meta = {
  component: SoundRangeItem,
  parameters: {
    layout: "centered",
  },
  args: {},
} satisfies Meta<typeof SoundRangeItem>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    midiProgramNumber: asMidiProgramNumber(1),
  },
};
