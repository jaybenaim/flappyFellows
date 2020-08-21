import underground from "../assets/underground.jpg";
let graphics;
let cursors;

export default new Phaser.Class({
  Extends: Phaser.Scene,
  initialize: function () {
    Phaser.Scene.call(this, { key: "mainmenu" });
  },
  preload: function () {
    this.load.image("underground", underground);
  },
  create: function () {
    cursors = this.input.keyboard.createCursorKeys();

    this.add.image(200, 500, "underground");

    // graphics = this.add.graphics();
    // // Color of the background
    // graphics.fillStyle(0x000000, 1);
    // // Size of the background
    // graphics.fillRect(0, 0, 800, 600);

    // Add text to the screen
    this.add.text(60, 180, "Press space to start.", {
      fill: "#000",
    });
    this.add.text(60, 195, "Move with up, down, left, right.", {
      fill: "#000",
    });
    this.add.text(60, 210, "Press spacebar to brake.", {
      fill: "#000",
    });
    this.add.text(60, 225, "Collect all the stars to win.", {
      fill: "#000",
    });
  },
  update: function () {
    // Start game on space bar down
    let pointer = this.input.activePointer;

    if (cursors.space.isDown || pointer.isDown) {
      this.scene.start("game");
    }
  },
});
