import { GRID_SIZE, CANVAS } from "./constants.js";

export default class Food {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.renderFood();
  }

  renderFood() {
    const ctx = CANVAS.getContext("2d");
    ctx.fillStyle = "red"
    ctx.fillRect(this.x * 50 + 1, this.y * 50 + 1, GRID_SIZE - 2, GRID_SIZE - 2);
  }
}

