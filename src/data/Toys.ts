import type { ToyProperties } from "../types";

export const Toys: ToyProperties[] = [
  {
    name: "abcBlocks",
    shapes: ["square"],
    colors: [],
    patterns: ["letters"],
    sounds: ["clank"],
    attributes: {
      complexity: .2,
      interactivity: .6,
      symmetry: .5,
      smoothness: .7,
      luster: 0.3,
    }
  },
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
    colors: [],
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
    colors: [],
    patterns: [],
    sounds: [],
    attributes: {
      complexity: 0.3,
      interactivity: 0.2,
      symmetry: 0.9,
      smoothness: 0.1,
      luster: 0.2
    }
  },
  {
    name: "ducky",
    shapes: ["circle"],
    colors: [],
    patterns: [],
    sounds: ["squeak"],
    attributes: {
      complexity: 0.1,
      interactivity: 0.3,
      symmetry: 0.3,
      smoothness: 0.8,
      luster: 0.5
    }
  },
  {
    name: "pyramidStack",
    shapes: ["circle", "triangle"],
    colors: [],
    patterns: [],
    sounds: [],
    attributes: {
      complexity: 0.5,
      interactivity: 0.6,
      symmetry: 0.9,
      smoothness: 0.7,
      luster: 0.6
    }
  },
  {
    name: "rattle",
    shapes: ["circle"],
    colors: [],
    patterns: ["stripes"],
    sounds: ["rattle"],
    attributes: {
      complexity: 0.3,
      interactivity: 0.8,
      symmetry: 0.8,
      smoothness: 0.7,
      luster: 0.4
    }
  },
  {
    name: "teddy",
    shapes: ["circle"],
    colors: [],
    patterns: [],
    sounds: [],
    attributes: {
      complexity: 0.2,
      interactivity: 0.1,
      symmetry: 0.7,
      smoothness: 0.2,
      luster: 0.1
    }
  },
  {
    name: "train",
    shapes: ["square", "circle"],
    colors: [],
    patterns: ["stripes"],
    sounds: [],
    attributes: {
      complexity: 0.4,
      interactivity: 0.6,
      symmetry: 0.1,
      smoothness: 0.5,
      luster: 0.6
    }
  }
]
