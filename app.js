import Game from "./game.js";
import { SPEED } from "./constants.js";

const settingsButton = document.getElementById('settings-button');
settingsButton.addEventListener("click", () => toggleSettigns());

const settingsModal = document.getElementById('settings-modal');
settingsModal.addEventListener("click", () => toggleSettigns());

const settingsContainer = document.getElementById('settings-container');
settingsContainer.addEventListener("click", (e) => e.stopPropagation());

let settingsOn = false;

const toggleSettigns = () => {
  if (!settingsOn) {
    settingsModal.style.display = 'Flex';
    settingsOn = true;
  } else {
    settingsModal.style.display = 'none';
    settingsOn = false;
  }
}

const buttons = document.getElementsByClassName('speed-button');
let speedOption = "NORMAL";
const setSpeedOption = (option) => {
  speedOption = option;
  const selectSpeed = SPEED[speedOption];
  game.changeSpeed(selectSpeed.speed, selectSpeed.maxSpeed)
}

const intializeOptions = () => {
  for (let button of buttons) {
    button.addEventListener("click", () => setSpeedOption(button.value));
  }
}

intializeOptions();
const game = new Game();
