import type { ToyProperties } from "../types";

export const Toys: ToyProperties[] = [
  {
    name: "abacus",
    shapes: ["square", "circle"],
    colors: [],
    patterns: [],
    sounds: [],
    attributes: {
      complexity: .8,
      interactivity: .6,
      symmetry: .1,
      smoothness: .2,
      luster: 0,
    }
  },
  {
    name: "ball",
    shapes: ["circle"],
    colors: ["red", "white"],
    patterns: ["stripes"],
    sounds: [],
    attributes: {
      complexity: 0.1,
      interactivity: 0.5,
      symmetry: 1,
      smoothness: 1,
      luster: 0.6
    }
  },
  {
    name: "castle",
    shapes: ["square"],
    colors: ["brown", "green"],
    patterns: [],
    sounds: [],
    attributes: {
      complexity: 0.3,
      interactivity: 0.2,
      symmetry: 0.9,
      smoothness: 0.1,
      luster: 0.2
    }
  }
  /*
  {
    name: "triangle",
    shapes: ["triangle"],
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
    name: "square",
    shapes: ["square"],
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
    name: "circle",
    shapes: ["circle"],
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
  */
]
