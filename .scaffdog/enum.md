---
name: "enum"
description: "Generate an enum-like object literal."
root: "src"
output: "**/*"
ignore: []
questions:
  name: "Please enter a file name."
  members: 'Please enter enum members splitted by ",".'
---

# Variables

- enum_name: `{{ inputs.name | pascal }}`

# `{{ inputs.name | camel }}.ts`

```ts
export const {{ enum_name }} = {
  {{ for v, i in split inputs.members "," }}{{ if i > 0 }}
  {{ end }}{{ v | constant }}: "{{ v }}",{{ end }}
} as const;
export type {{ enum_name }} = (typeof {{ enum_name }})[keyof typeof {{ enum_name }}];

```
