const colors = {
  red: "#f01a1a",
  blue: "#6f94e9",
  sky: "#c3d4fc",
  white: "#fff",
  gray: "#6f7070",
  lightgray: "#bfbfbf",
  darkgray: "#909090",
  black: "#2b2b2b",
} as const;

const theme = { colors };

export type Theme = typeof theme;

export default theme;
