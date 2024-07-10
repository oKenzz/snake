import Food from "./food.js";
import Snake from "./snake.js";
import { GRID_SIZE, CANVAS } from "./constants.js";

export default class Game {
  constructor() {
    this.setup();
    this.snake = new Snake(1, 5);
    this.food = this.spawnFood();
    this.points = 0;
    this.speed = 105;
    this.currentSpeed = this.speed;
    this.maxSpeed = 90;
    this.lastTime = performance.now();
    this.gameOver = false;
    requestAnimationFrame(() => this.gameLoop())
  }

  checkFoodCollision() {
    if (this.snake.head.x == this.food.x && this.snake.head.y == this.food.y) {
      return true;
    }
    return false;
  }

  generateCoordinates() {
    const rows = CANVAS.height / GRID_SIZE;
    const columns = CANVAS.width / GRID_SIZE;
    const allCoordinates = new Set();
    for (let row = 0; row < rows; row++) {
      for (let column = 0; column < columns; column++) {
        allCoordinates.add(`${row},${column}`);
      }
    }

    for (let part of this.snake.body) {
      const x = part.x;
      const y = part.y;
      allCoordinates.delete(`${x},${y}`);
    }
    return allCoordinates;
  }

  spawnFood() {
    const availableCoordinates = this.generateCoordinates();
    const coordinatesArray = Array.from(availableCoordinates);

    const randomIndex = Math.floor(Math.random() * coordinatesArray.length);

    const [randomX, randomY] = coordinatesArray[randomIndex].split(',').map(Number);
    return new Food(randomX, randomY);
  }

  gameLoop() {
    if (this.gameOver) {
      console.log("You got " + this.points + " points");
      return;
    }
    const currentTime = performance.now();
    const deltaTime = currentTime - this.lastTime;
    if (deltaTime > this.currentSpeed) {
      const collision = this.snake.update();
      const foodCollisionDetected = this.checkFoodCollision();
      if (foodCollisionDetected) {
        this.points += 1;
        console.log(this.points);
        this.snake.grow();
        this.food = this.spawnFood();
        if (this.currentSpeed > this.maxSpeed) {
          this.currentSpeed -= 1;
        }
      }
      if (collision) {
        this.gameOver = true;
      }
      this.lastTime = currentTime;
    }
    requestAnimationFrame(() => this.gameLoop())
  }


  setDirection(e) {
    if (e.key == "w") {
      this.snake.setDirection("UP");
    } else if (e.key == "a") {
      this.snake.setDirection("LEFT");
    } else if (e.key == "s") {
      this.snake.setDirection("DOWN");
    } else if (e.key == "d") {
      this.snake.setDirection("RIGHT");
    }
  }

  setupEventListeners() {
    document.addEventListener("keypress", (e) => this.setDirection(e))
    document.addEventListener("keypress", (e) => this.restart(e))
  }

  restart(e) {
    if (e.code == "Space") {
      this.setupCanvas();
      this.snake = new Snake(1, 5);
      this.food = this.spawnFood();
      this.currentSpeed = this.speed;
      this.points = 0;
      this.gameOver = false;
      requestAnimationFrame(() => this.gameLoop())
    }
  }

  setup() {
    this.setupCanvas();
    this.setupEventListeners();
  }

  setupCanvas() {
    CANVAS.setAttribute("width", "600");
    CANVAS.setAttribute("height", "600");
    const rows = CANVAS.height / GRID_SIZE;
    const columns = CANVAS.width / GRID_SIZE;
    const ctx = CANVAS.getContext("2d");
    ctx.strokeStyle = '#99FF8E';

    for (let row = 0; row < rows; row++) {
      ctx.beginPath();
      ctx.moveTo(0, row * GRID_SIZE);
      ctx.lineTo(CANVAS.width, row * GRID_SIZE);
      ctx.stroke();
    }

    for (let column = 0; column < columns; column++) {
      ctx.beginPath();
      ctx.moveTo(column * GRID_SIZE, 0);
      ctx.lineTo(column * GRID_SIZE, CANVAS.height);
      ctx.stroke();
    }
  }
}
