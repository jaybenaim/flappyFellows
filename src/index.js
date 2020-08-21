import Phaser from "phaser";

import MainMenu from "./scenes/MainMenu.js";
import Game from "./scenes/Game.js";

var config = {
  type: Phaser.AUTO,
  width: 400,
  height: 700,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0, x: 0 },
    },
    debug: true,
  },
  scene: [MainMenu, Game],
};

var game = new Phaser.Game(config);
