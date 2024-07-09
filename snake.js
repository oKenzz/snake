class Snake {
  constructor(x, y) {
    this.direction = "RIGHT";
    this.nextDirection = "RIGHT";
    this.body = [];
    this.head = { x, y };
    this.body.push(this.head);
    this.renderSnake();
  }

  setDirection(direction) {
    if (!(this.direction == "UP" && direction == "DOWN" || this.direction == "RIGHT" && direction == "LEFT" || this.direction == "DOWN" && direction == "UP" || this.direction == "LEFT" && direction == "RIGHT")) {
      this.nextDirection = direction;
    }
  }

  grow() {
    const tail = this.body[this.body.length - 1];
    let newTail = { x: tail.x - DIRECTIONS[this.direction].x, y: tail.y - DIRECTIONS[this.direction].y };
    this.body.push(newTail);
  }

  update() {
    this.direction = this.nextDirection;

    let currentHead = this.body[0];
    let newHead = { x: currentHead.x + DIRECTIONS[this.direction].x, y: currentHead.y + DIRECTIONS[this.direction].y };

    const wallCollision = this.checkCollision(newHead);
    const selfCollision = this.checkSelfCollision(newHead);
    if (wallCollision || selfCollision) {
      return true;
    }
    // if (wallCollision || selfCollision) {
    //   throw new Error("Collision Detected, Game Over!")
    // }

    for (let i = this.body.length - 1; i > 0; i--) {
      renderBlank(this.body[i].x, this.body[i].y);
      this.body[i].x = this.body[i - 1].x;
      this.body[i].y = this.body[i - 1].y;
    }

    renderBlank(currentHead.x, currentHead.y);
    currentHead.x = newHead.x;
    currentHead.y = newHead.y;


    this.renderSnake();
    return false;
  }

  checkCollision(newHead) {
    if (newHead.x > 11 || newHead.x < 0 || newHead.y > 11 || newHead.y < 0) {
      return true;
    }
    return false;
  }

  checkSelfCollision(newHead) {
    for (let part of this.body) {
      if (newHead.x == part.x && newHead.y == part.y) {
        return true;
      }
    }
    return false;
  }

  renderSnake() {
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "white";
    for (let part of this.body) {
      ctx.fillRect(part.x * 50 + 1, part.y * 50 + 1, gridSize - 2, gridSize - 2);
    }
  }
}
