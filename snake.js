import { GRID_SIZE, CANVAS, DIRECTIONS } from "./constants.js";
import { renderBlank } from "./helper.js";

export default class Snake {
  constructor(x, y) {
    this.direction = "RIGHT";
    this.nextDirection = "RIGHT";
    this.body = [];
    this.head = { x, y };
    this.body.push(this.head);
    this.body.push({ x: 2, y: 5 });
    this.body.push({ x: 1, y: 5 });
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

  // TODO: Separate gameLoop/logic and rendering
  update() {
    this.direction = this.nextDirection;

    let currentHead = this.head;
    let newHead = { x: currentHead.x + DIRECTIONS[this.direction].x, y: currentHead.y + DIRECTIONS[this.direction].y };

    const wallCollision = this.checkCollision(newHead);
    const selfCollision = this.checkSelfCollision(newHead);
    if (wallCollision || selfCollision) {
      return true;
    }

    for (let i = this.body.length - 1; i > 0; i--) {
      this.body[i].x = this.body[i - 1].x;
      this.body[i].y = this.body[i - 1].y;
    }

    currentHead.x = newHead.x;
    currentHead.y = newHead.y;

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
    const ctx = CANVAS.getContext("2d");
    ctx.fillStyle = "white";
    for (let part of this.body) {
      ctx.fillRect(part.x * 50 + 1, part.y * 50 + 1, GRID_SIZE - 2, GRID_SIZE - 2);
    }
  }
}
