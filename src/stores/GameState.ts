import { writable } from "svelte/store";
import { babyStore } from "./BabyStore";

export enum Scene {
  MainMenu,
  Playing,
  GameOver
}

export type GameState = {
  activeScene: Scene;
  score: number;
  isPaused: boolean;
}

export const gameState = writable<GameState>({
  activeScene: Scene.MainMenu,
  score: 0,
  isPaused: false,
});

/**
 * Helper function for navigating to Main Menu
 */
export const mainMenu = () => {
  gameState.update(state => {
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
  gameState.update(state => {
    state.activeScene = Scene.Playing;
    state.isPaused = false;
    state.score = 0;
    return state
  })

  // reset stores
  babyStore.resetBabyStore();
};

/** 
 * End the simulation if the baby's boredom reaches capacity (100%)
 */
babyStore.subscribe(babyData => {
  if (babyData.boredom >= 100) {
    gameState.update(state => {
      state.activeScene = Scene.GameOver;
      state.isPaused = true;
      return state;
    })
  }
});
