class Snake {
  constructor(row, col) {
    this.direction = "RIGHT";
    this.body = [];
    this.body.push({ row, col });
    this.renderSnake();
  }

  move() {
    // TODO:
  }

  grow() {
    // TODO:
  }

  update() {

  }

  // TODO: Modify for rendering every part of the snake
  renderSnake() {
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "white"
    for (let part of this.body) {
      ctx.fillRect(part.row * 50 + 1, part.col * 50 + 1, gridSize - 2, gridSize - 2);
    }
  }
}
