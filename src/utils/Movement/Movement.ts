import { babyStore } from "$stores";

const pressedKeys = new Set<string>();

const handleKeydown = (event: KeyboardEvent) => {
  pressedKeys.add(event.key.toLowerCase());
  updatePosition();
};

const handleKeyup = (event: KeyboardEvent) => {
  pressedKeys.delete(event.key.toLowerCase());
};

const updatePosition = () => {
  let x = 0, y = 0;

  if (pressedKeys.has("w")) {
    y -= 10;
  }
  if (pressedKeys.has("a")) {
    x -= 10;
  }
  if (pressedKeys.has("s")) {
    y += 10;
  }
  if (pressedKeys.has("d")) {
    x += 10;
  }

  console.log(`moving x: ${x} and y: ${y}`);
  babyStore.updatePosition({ x, y });
};

export const initializeMovement = () => {
  window.addEventListener("keydown", handleKeydown);
  window.addEventListener("keyup", handleKeyup);
};

export const cleanupMovement = () => {
  window.removeEventListener("keydown", handleKeydown);
  window.removeEventListener("keyup", handleKeyup);
};