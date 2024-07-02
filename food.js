class Food {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.spawn();
  }

  spawn() {
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "red"
    ctx.fillRect(this.x * 50 + 1, this.y * 50 + 1, gridSize - 2, gridSize - 2);
  }

  deSpawn() {
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "black"
    ctx.clearRect(this.x * 50 + 1, this.y * 50 + 1, gridSize - 2, gridSize - 2);
  }
}
