import type { Meta, StoryObj } from "@storybook/react";
import { asNoteNumber } from "@/_features/noteNumber/model";
import { PianoKeyItem } from "./index";

const meta = {
  component: PianoKeyItem,
  parameters: {
    layout: "centered",
  },
  args: {},
} satisfies Meta<typeof PianoKeyItem>;

export default meta;

type Story = StoryObj<typeof meta>;

export const White: Story = {
  args: {
    noteNumber: asNoteNumber(2),
  },
};
export const Black: Story = {
  args: {
    noteNumber: asNoteNumber(1),
  },
};
export const C: Story = {
  args: {
    noteNumber: asNoteNumber(0),
  },
};
