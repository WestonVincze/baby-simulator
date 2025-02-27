const Shapes = [
  "triangle",
  "circle",
  "square",
  "oval",
  "rectangle",
  "wire",
] as const;

const Colors = [
  "white",
  "red",
  "orange",
  "yellow",
  "brown",
  "green",
  "blue",
  "indigo",
  "peach",
  "violet",
  "black",
] as const;

const Patterns = [
  "dots",
  "letters",
  "stars",
  "stripes",
] as const;

const OtherAttributes = [
  "complexity",
  "interactivity",
  "symmetry",
  "smoothness",
  "luster",
] as const;

const Sounds = [
  "squeak",
  "rattle",
  "clank",
  "clink",
  "ding",
  "beep",
  "pop",
] as const

export const AllAttributes = [...Sounds, ...Shapes, ...Colors, ...Patterns, ...OtherAttributes] as const;
