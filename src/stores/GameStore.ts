import { writable } from "svelte/store";
import { babyStore } from "./BabyStore";
import { toyStore } from "./ToyStore";

export enum Scene {
  MainMenu,
  Playing,
  GameOver
}

export type GameStore = {
  activeScene: Scene;
  score: number;
  isPaused: boolean;
}

export const gameStore = writable<GameStore>({
  activeScene: Scene.MainMenu,
  score: 0,
  isPaused: false,
});

/**
 * Helper function for navigating to Main Menu
 */
export const mainMenu = () => {
  gameStore.update(state => {
    state.activeScene = Scene.MainMenu;
    state.isPaused = true;
    return state;
  })
}

/**
 * Helper function for starting game or resetting game state
 */
export const startGame = () => {
  // initialize / reset game state
  gameStore.update(state => {
    state.activeScene = Scene.Playing;
    state.isPaused = false;
    state.score = 0;
    return state
  })

  // reset stores
  babyStore.resetBabyStore();
  toyStore.resetToys();
};

/** 
 * End the simulation if the baby's boredom reaches capacity (100%)
 */
babyStore.subscribe(babyData => {
  if (babyData.boredom >= 1) {
    gameStore.update(state => {
      state.activeScene = Scene.GameOver;
      state.isPaused = true;
      return state;
    })
  }
});
