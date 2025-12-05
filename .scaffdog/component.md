---
name: "component"
description: "Generate a React component and a story file."
root: "src"
output: "**/*"
ignore: []
questions:
  name: "Please enter a component name."
---

# Variables

- component_name: `{{ inputs.name | pascal }}`

# `{{ component_name }}/index.tsx`

```tsx
type Props = {};

export const {{ component_name }}: React.FC<Props> = ({}) => {
  return <></>;
};

```

# `{{ component_name }}/index.stories.ts`

```ts
import type { Meta, StoryObj } from "@storybook/react";
import { {{ component_name }} } from "./index";

const meta = {
  component: {{ component_name }},
  parameters: {
    layout: "centered",
  },
  args: {},
} satisfies Meta<typeof {{ component_name }}>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

```
