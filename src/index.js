import Phaser from "phaser";

import MainMenu from "./scenes/MainMenu.js";
import Game from "./scenes/Game.js";
import Level5 from "./scenes/Level5.js";

// Namespace
let InfiniteScroller = InfiniteScroller || {};

let config = {
  type: Phaser.AUTO,
  width: window.innerWidth,
  height: window.innerHeight,
  physics: {
    default: "arcade",
    arcade: {
      // debug: true,
      // gravity: { y: 0, x: 0 },
    },
    scale: {
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH,
    },
  },

  scene: [MainMenu, Game, Level5],
};

InfiniteScroller.game = new Phaser.Game(config);
