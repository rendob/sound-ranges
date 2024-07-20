export const appColor = {
  primary: "#3949AB",
  onPrimary: "#E0E0E0",
  background: "#212121",
  onBackground: "#E0E0E0",
  border: "#616161",
  selected: (base: string) => `color-mix(in srgb, ${base} 70%, white)`,
  hover: (base: string) => `color-mix(in srgb, ${base}, white)`,
  keyboard: {
    white: (isSelected: boolean) => (isSelected ? "#7097ca" : "#e0e0e0"),
    black: (isSelected: boolean) => (isSelected ? "#37557c" : "#000000"),
  },
} as const;
