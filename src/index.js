import Phaser from "phaser";

import MainMenu from "./scenes/MainMenu.js";
import Game from "./scenes/Game.js";

var config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0, x: 0 },
    },
  },
  scene: [MainMenu, Game],
};

var game = new Phaser.Game(config);
