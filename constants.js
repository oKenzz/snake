export const GRID_SIZE = 50;
export const CANVAS = document.getElementById('board');
export const DIRECTIONS = {
  UP: { x: 0, y: -1 },
  RIGHT: { x: 1, y: 0 },
  DOWN: { x: 0, y: 1 },
  LEFT: { x: -1, y: 0 }
}

// TODO: Create a oppositeDirection map for simpler code in snake.js
