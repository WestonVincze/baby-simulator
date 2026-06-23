export const Shapes = [
  "triangle",
  "circle",
  "square",
  "oval",
  "rectangle",
  "wire",
] as const;

export const Colors = [
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

export const Patterns = [
  "dots",
  "letters",
  "stars",
  "stripes",
] as const;

export const Sounds = [
  "squeak",
  "rattle",
  "clank",
  "clink",
  "ding",
  "beep",
  "pop",
] as const

export const OtherAttributes = [
  "complexity",
  "interactivity",
  "symmetry",
  "smoothness",
  "luster",
] as const;


export const AllAttributes = [...Sounds, ...Shapes, ...Colors, ...Patterns, ...OtherAttributes] as const;
