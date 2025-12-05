import type { Meta, StoryObj } from "@storybook/react";
import { asMidiProgramNumber } from "@/_features/instrument/midiProgramNumber";
import { InstrumentItem } from "./index";

const meta = {
  component: InstrumentItem,
  parameters: {
    layout: "centered",
  },
  args: {},
} satisfies Meta<typeof InstrumentItem>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { midiProgramNumber: asMidiProgramNumber(1) },
};
