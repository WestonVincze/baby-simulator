import { writable } from "svelte/store";
import { babyStore } from "./BabyStore";
import { toyStore } from "./ToyStore";

export enum Scene {
  MainMenu,
  Simulation,
  Playing,
  GameOver
}

export type GameState = {
  activeScene: Scene;
  isPaused: boolean;
  score: number;
}

const initialState: GameState = {
  activeScene: Scene.MainMenu,
  isPaused: false,
  score: 0
}

const { subscribe, update } = writable<GameState>({ ...initialState });

/**
 * Helper function for navigating to Main Menu
 */
export const mainMenu = () => {
  update(state => {
    state.activeScene = Scene.MainMenu;
    state.isPaused = true;
    return state;
  })
}

/**
 * Pause or resume game
 */
export const togglePause = () => {
  update(state => {
    state.isPaused = !state.isPaused;
    return state;
  })
}

/**
 * Helper function for starting game or resetting game state
 */
export const startGame = (detailedMode: boolean = false) => {
  // initialize / reset game state
  update(state => {
    state.activeScene = detailedMode ? Scene.Playing : Scene.Simulation;
    state.isPaused = false;
    state.score = 0;
    return state
  })

  // reset stores
  babyStore.resetBabyStore();
  toyStore.resetToys();

  babyStore.initializePreferences(3);
};

/** 
 * End the simulation if the baby's boredom reaches capacity (100%)
 */
babyStore.subscribe(babyData => {
  // check for endless mode and prevent the game over scene (testing purposes)
  const urlParams = new URLSearchParams(window.location.search);
  const isEndlessMode = urlParams.get("endless") === "true";

  if (!isEndlessMode && babyData.boredom >= 1) {
    update(state => {
      state.activeScene = Scene.GameOver;
      state.isPaused = true;
      return state;
    })
  }
});

export const gameStore = {
  subscribe,
  startGame,
  togglePause,
}
