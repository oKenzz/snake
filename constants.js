export const GRID_SIZE = 50;
export const CANVAS = document.getElementById('board');
export const DIRECTIONS = {
  UP: { x: 0, y: -1 },
  RIGHT: { x: 1, y: 0 },
  DOWN: { x: 0, y: 1 },
  LEFT: { x: -1, y: 0 }
};
export const OPPOSITE_DIRECTION = {
  "UP": "DOWN",
  "RIGHT": "LEFT",
  "DOWN": "UP",
  "LEFT": "RIGHT"
};
export const INPUT_DIRECTIONS = {
  "w": "UP",
  "d": "RIGHT",
  "s": "DOWN",
  "a": "LEFT",
  "ArrowUp": "UP",
  "ArrowRight": "RIGHT",
  "ArrowDown": "DOWN",
  "ArrowLeft": "LEFT"
}
export const SPEED = {
  "SLOW": { speed: 160, maxSpeed: 130 },
  "NORMAL": { speed: 140, maxSpeed: 110 },
  "FAST": { speed: 120, maxSpeed: 90 }
}
