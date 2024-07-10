import Food from "./food.js";
import Snake from "./snake.js";
import { GRID_SIZE, CANVAS } from "./constants.js";

let snake;
let food;
let points = 0;

let timer;

const setupCanvas = () => {
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
};

const setupEventListeners = () => {
  document.addEventListener("keypress", (e) => setDirection(e))
  document.addEventListener("keypress", (e) => restart(e))
}

const setDirection = (e) => {
  if (e.key == "w") {
    snake.setDirection("UP");
  } else if (e.key == "a") {
    snake.setDirection("LEFT");
  } else if (e.key == "s") {
    snake.setDirection("DOWN");
  } else if (e.key == "d") {
    snake.setDirection("RIGHT");
  }
}

const initializeEntities = () => {
  snake = new Snake(1, 5);
  food = new Food(7, 5);
}

const checkFoodCollision = () => {
  if (snake.head.x == food.x && snake.head.y == food.y) {
    return true;
  }
  return false;
}

const generateCoordinates = () => {
  const rows = CANVAS.height / GRID_SIZE;
  const columns = CANVAS.width / GRID_SIZE;
  const allCoordinates = new Set();
  for (let row = 0; row < rows; row++) {
    for (let column = 0; column < columns; column++) {
      allCoordinates.add(`${row},${column}`);
    }
  }

  for (let part of snake.body) {
    const x = part.x;
    const y = part.y;
    allCoordinates.delete(`${x},${y}`);
  }
  return allCoordinates;
}

const spawnFood = () => {
  const availableCoordinates = generateCoordinates();
  const coordinatesArray = Array.from(availableCoordinates);

  const randomIndex = Math.floor(Math.random() * coordinatesArray.length);

  const [randomX, randomY] = coordinatesArray[randomIndex].split(',').map(Number);
  food = new Food(randomX, randomY);
}

const gameLoop = () => {
  const collision = snake.update();
  const foodCollisionDetected = checkFoodCollision();
  if (foodCollisionDetected) {
    points += 1;
    console.log(points);
    snake.grow();
    spawnFood();
  }
  if (collision) {
    clearInterval(timer);
    console.log("You got " + points + " points");
  }
}

const start = () => {
  points = 0;
  setupCanvas();
  initializeEntities();
  setupEventListeners();
  timer = setInterval(gameLoop, 115);
}

const restart = (e) => {
  if (e.code == "Space") {
    clearInterval(timer);
    start();
  }
}

start();
