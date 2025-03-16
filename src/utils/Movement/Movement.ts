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

/**
 * Moves from the current position toward the destination by 10 units.
 * @param position The current position { x, y }
 * @param destination The target position { x, y }
 * @returns The new position { x, y }
 */
export const moveTo = (position: { x: number, y: number }, destination: { x: number, y: number }, amount: number = 5): { x: number, y: number } => {
  const dx = destination.x - position.x;
  const dy = destination.y - position.y;
  const distance = Math.sqrt(dx * dx + dy * dy);

  // If the distance is less than or equal to 5 units
  if (distance === 0) {
    return { x: 0, y: 0 };
  }

  if (distance <= amount) {
    return { x: dx, y: dy };
  }

  // Normalize the direction vector and scale by 10 units
  const unitX = dx / distance;
  const unitY = dy / distance;
  const moveX = unitX * amount;
  const moveY = unitY * amount;

  // Calculate the new position
  const newPosition = {
    x: moveX,// position.x + moveX,
    y: moveY, //position.y + moveY
  };

  return newPosition;
};
