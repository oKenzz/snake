class Snake {
  constructor(x, y) {
    this.direction = "RIGHT";
    this.body = [];
    this.head = { x, y };
    this.body.push(this.head);
    this.renderSnake();
  }

  move() {
    // TODO:
  }

  setDirection(direction) {
    this.direction = direction;
  }

  grow() {
    // TODO:
  }

  update() {
    let currentHead = this.head;
    let newHead = { x: currentHead.x + DIRECTIONS[this.direction].x, y: currentHead.y + DIRECTIONS[this.direction].y };

    const collisionDetected = this.checkCollision(newHead);
    if (collisionDetected) {
      throw new Error("Collision Detected, Game Over!")
    }

    // Add the new head to the beginning of the snake
    renderBlank(currentHead.x, currentHead.y);
    this.body.unshift(newHead);

    // Remove the tail segment
    this.body.pop();
    this.head = newHead;

    this.renderSnake();
  }

  checkCollision(newHead) {
    if (newHead.x > 11 || newHead.x < 0 || newHead.y > 11 || newHead.y < 0) {
      return true;
    }
    return false;
  }

  // TODO: Modify for rendering every part of the snake
  renderSnake() {
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "white"
    for (let part of this.body) {
      ctx.fillRect(part.x * 50 + 1, part.y * 50 + 1, gridSize - 2, gridSize - 2);
    }
  }
}
