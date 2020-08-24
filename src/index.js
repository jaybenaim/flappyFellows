import Phaser from "phaser";

import MainMenu from "./scenes/MainMenu.js";
import Game from "./scenes/Game.js";

// Namespace
let InfiniteScroller = InfiniteScroller || {};

let config = {
  type: Phaser.AUTO,
  width: window.innerWidth,
  height: window.innerHeight,
  physics: {
    default: "arcade",
    arcade: {
      debug: true,
      // gravity: { y: 0, x: 0 },
    },
  },

  scene: [MainMenu, Game],
};

InfiniteScroller.game = new Phaser.Game(config);
