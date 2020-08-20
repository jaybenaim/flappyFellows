let graphics;
let cursors;

export default new Phaser.Class({
  Extends: Phaser.Scene,
  initialize: function () {
    Phaser.Scene.call(this, { key: "mainmenu" });
  },
  create: function () {
    cursors = this.input.keyboard.createCursorKeys();

    graphics = this.add.graphics();
    // Color of the background
    graphics.fillStyle(0x000000, 1);
    // Size of the background
    graphics.fillRect(0, 0, 800, 600);

    // Add text to the screen
    this.add.text(270, 300, "Press space to start.");
    this.add.text(270, 315, "Move with up, down, left, right.");
    this.add.text(270, 330, "Press spacebar to brake.");
    this.add.text(270, 345, "Collect all the stars to win.");
  },
  update: function () {
    // Start game on space bar down
    if (cursors.space.isDown) {
      this.scene.start("game");
    }
  },
});
