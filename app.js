import Game from "./game.js";

const settingsButton = document.getElementById('settings-button');
settingsButton.addEventListener("click", () => toggleSettigns());

const settingsModal = document.getElementById('settings-modal');
settingsModal.addEventListener("click", () => toggleSettigns());

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

new Game();
