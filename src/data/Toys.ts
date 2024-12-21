import type { ToyData } from "../types";

export const Toys: ToyData[] = [
  {
    name: "abcBlocks",
    shapes: ["square"],
    colors: ["yellow", "red", "blue"],
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
    shapes: ["rectangle", "circle", "wire"],
    colors: ["yellow", "blue", "red", "peach"],
    patterns: [],
    sounds: ["clink"],
    attributes: {
      complexity: .8,
      interactivity: .6,
      symmetry: .1,
      smoothness: .2,
    }
  },
  {
    name: "ball",
    shapes: ["circle"],
    colors: ["white", "red"],
    patterns: ["stripes"],
    sounds: ["squeak"],
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
    shapes: ["rectangle"],
    colors: ["brown", "green", "peach", "white"],
    patterns: [],
    sounds: [],
    attributes: {
      complexity: 0.3,
      interactivity: 0.2,
      symmetry: 0.9,
      luster: 0.2
    }
  },
  {
    name: "ducky",
    shapes: ["circle", "oval"],
    colors: ["yellow", "red"],
    patterns: [],
    sounds: ["squeak"],
    attributes: {
      interactivity: 0.3,
      symmetry: 0.3,
      smoothness: 0.8,
      luster: 0.5
    }
  },
  {
    name: "pyramidStack",
    shapes: ["circle", "triangle"],
    colors: ["white", "red", "green", "yellow", "blue"],
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
    shapes: ["circle", "wire"],
    colors: ["blue", "green", "red"],
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
    colors: ["brown", "peach"],
    patterns: [],
    sounds: [],
    attributes: {
      symmetry: 0.7,
      smoothness: 0.2,
    }
  },
  {
    name: "train",
    shapes: ["square", "circle", "rectangle"],
    colors: ["white", "red", "green", "blue"],
    patterns: ["stripes"],
    sounds: [],
    attributes: {
      complexity: 0.4,
      interactivity: 0.6,
      smoothness: 0.5,
      luster: 0.6
    }
  }
]
