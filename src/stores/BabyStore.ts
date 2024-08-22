import { writable } from "svelte/store";
import type { ToyData } from "../types";

type BabyData = {
  boredom: number,
  currentToy: ToyData | null,
  interestMap: Record<ToyProperty, Record<string, number>>,
  favorites: Partial<Record<ToyProperty, Record<string, number>>>,
}

const Baby: BabyData = {
  boredom: 0,
  currentToy: null,
  interestMap: {
    color: {},
    shape: {},
    type: {},
  },
  favorites: {}
}

type ToyProperty = 
  | "color"
  | "shape"
  | "type"

/**
 * BABY DATA
 * * boredom
 * * current toy (and data)
 * * property interest map => how interested in each property the baby is
 * * recent toys (last 3?)
 * * favorite property bias => preference of toys with favorite properties
 * * * color
 * * * shape
 * * * sound
 * * personality => factors that alter perceived value in a toy
 * * * curiosity => enjoys complex toys and values new toys more
 * * * mobility => prefers toys that move or force baby to move
 * * * attachment => maintains interest in the same types of toys for longer
 * 
 * TOY DATA
 * * toy properties
 * * * color
 * * * * primary
 * * * * secondary 
 * * * * number of colors 
 * * * shape (is shape too generic?)
 * * * * number of sides
 * * * * symmetry
 * * * * consistency (ex: a square is )
 * * * * variance (thick vs thin, )
 * * * luster
 * * * smoothness
 * * * complexity
 * * * sound
 * * * interactivity
 * * * patterns
 * * distance to baby
 * * time since last move
 * 
 */