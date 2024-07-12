import Food from "./food.js";
import Snake from "./snake.js";
import { GRID_SIZE, CANVAS, INPUT_DIRECTIONS } from "./constants.js";

export default class Game {
  constructor(speed = 140, maxSpeed = 110) {
    this.setup();
    this.snake = new Snake(3, 5);
    this.food = this.spawnFood();
    this.points = 0;
    this.speed = speed;
    this.maxSpeed = maxSpeed;
    this.currentSpeed = this.speed;
    this.speedIncrease = 2;
    this.startGame = false;
    this.gameOver = false;
    this.keyBuffer = [];
    this.maxBufferSize = 2;
    this.lastTime = performance.now();
    this.renderGame();
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

  updateScore() {
    const scoreDisplay = document.getElementById('score');
    scoreDisplay.textContent = this.points;
  }

  resetScore() {
    const scoreDisplay = document.getElementById('score');
    scoreDisplay.textContent = 0;
  }

  showGameOver() {
    const container = document.getElementById('game-over-container');
    const gameOver = document.getElementById('game-over');
    const restartText = document.getElementById('restart-text')
    /* background: rgba(0, 0, 0, 0.55); */
    container.style.background = 'rgba(0, 0, 0, 0.55'
    container.classList.add('fade');
    gameOver.classList.remove('hidden');
    restartText.classList.remove('hidden');
  }

  hideGameOver() {
    const container = document.getElementById('game-over-container');
    const gameOver = document.getElementById('game-over');
    const restartText = document.getElementById('restart-text')
    container.style.background = "transparent"
    container.classList.remove('fade');
    gameOver.classList.add('hidden');
    restartText.classList.add('hidden');
  }

  playEatAudio() {
    const audio = document.getElementById('eat-audio');
    audio.volume = 0.2;
    audio.play();
  }

  playCollisionAudio() {
    const audio = document.getElementById('collision-audio');
    audio.volume = 0.2;
    audio.play();
  }

  gameLoop() {
    if (this.gameOver) {
      this.showGameOver();
      return;
    }
    const currentTime = performance.now();
    const deltaTime = currentTime - this.lastTime;
    if (deltaTime > this.currentSpeed) {
      this.resolveBuffer();
      const collision = this.snake.update();
      const foodCollisionDetected = this.checkFoodCollision();
      if (foodCollisionDetected) {
        this.playEatAudio();
        this.points += 1;
        this.updateScore();
        this.snake.grow();
        this.food = this.spawnFood();
        if (this.currentSpeed > this.maxSpeed) {
          this.currentSpeed -= this.speedIncrease;
        }
      }
      if (collision) {
        this.playCollisionAudio();
        this.gameOver = true;
      }
      this.lastTime = currentTime;
      this.renderGame();
    }
    requestAnimationFrame(() => this.gameLoop())
  }

  renderGame() {
    const ctx = CANVAS.getContext('2d');
    ctx.clearRect(0, 0, CANVAS.width, CANVAS.height);
    this.createGrid();
    this.snake.renderSnake();
    this.food.renderFood();
  }

  addToBuffer(e) {
    if (this.startGame && e.key != this.keyBuffer[this.keyBuffer.length - 1]) {
      if (this.keyBuffer.length > this.maxBufferSize) {
        this.keyBuffer.shift(e.key);
      }
      this.keyBuffer.push(e.key);
    }
  }

  start(e) {
    const direction = INPUT_DIRECTIONS[e.key]
    if (!this.startGame && direction != "LEFT" && direction != undefined) {
      this.startGame = true;
      requestAnimationFrame(() => this.gameLoop())
    }
  }


  resolveBuffer() {
    if (this.keyBuffer.length > 0) {
      const key = this.keyBuffer.shift();
      const direction = INPUT_DIRECTIONS[key]
      if (direction) {
        this.snake.setDirection(direction)
      }
    }
  }

  setupEventListeners() {
    document.addEventListener("keydown", (e) => this.start(e));
    document.addEventListener("keydown", (e) => this.addToBuffer(e));
    document.addEventListener("keydown", (e) => this.restart(e));
  }

  restart(e) {
    if (e.code == "Space" && this.gameOver == true) {
      this.createGrid();
      this.snake = new Snake(3, 5);
      this.food = this.spawnFood();
      this.currentSpeed = this.speed;
      this.points = 0;
      this.startGame = false;
      this.gameOver = false;
      this.keyBuffer = [];
      this.resetScore();
      this.hideGameOver();
      this.renderGame();
    }
  }

  setup() {
    this.createGrid();
    this.setupEventListeners();
  }

  createGrid() {
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

  changeSpeed(speed, maxSpeed) {
    this.speed = speed;
    this.maxSpeed = maxSpeed;
    this.gameOver = true;
    this.restart({ code: "Space" });
  }

}
