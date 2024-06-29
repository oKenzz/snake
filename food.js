class Food {
  constructor(row, col) {
    this.row = row;
    this.col = col;
    this.spawn();
  }

  spawn() {
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "red"
    ctx.fillRect(this.row * 50 + 1, this.col * 50 + 1, gridSize - 2, gridSize - 2);
  }

  deSpawn() {
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "black"
    ctx.clearRect(this.row * 50 + 1, this.col * 50 + 1, gridSize - 2, gridSize - 2);
  }
}
