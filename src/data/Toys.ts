import type { ToyProperties } from "../types";

export const toyProperties: ToyProperties[] = [
  {
    shape: "triangle",
    colors: ["red"],
    patterns: [],
    sounds: [],
    attributes: {
      complexity: .5,
      interactivity: .4,
      symmetry: .4,
      smoothness: 0,
      luster: 0,
    }
  },
  {
    shape: "square",
    colors: ["blue"],
    patterns: [],
    sounds: [],
    attributes: {
      complexity: .2,
      interactivity: .3,
      symmetry: 1,
      smoothness: 0,
      luster: 0,
    }
  },
  {
    shape: "circle",
    colors: ["green"],
    patterns: [],
    sounds: [],
    attributes: {
      complexity: 0,
      interactivity: .8,
      symmetry: 1,
      smoothness: 1,
      luster: 0,
    }
  },
]
