class Food {
  constructor() {
    this.x;
    this.y;
    this.spawnFood();
  }

  spawnFood() {
    this.x = Math.floor(Math.random() * 11) + 1;
    this.y = Math.floor(Math.random() * 11) + 1;
    this.renderFood();
  }

  renderFood() {
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "red"
    ctx.fillRect(this.x * 50 + 1, this.y * 50 + 1, gridSize - 2, gridSize - 2);
  }
}
