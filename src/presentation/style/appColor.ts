export const appColor = {
  primary: "#3F51b5",
  onPrimary: "#E6E0E9",
  background: "#141218",
  onBackground: "#E6E0E9",
  selected: (base: string) => `color-mix(in srgb, ${base} 70%, white)`,
  hover: (base: string) => `color-mix(in srgb, ${base}, white)`,
  keyboard: {
    white: (isSelected: boolean) => (isSelected ? "#7097ca" : "#d9d9da"),
    black: (isSelected: boolean) => (isSelected ? "#37557c" : "#232323"),
  },
} as const;
