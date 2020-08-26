import underground from "../assets/underground.jpg";
let graphics,
  cursors,
  windowWidth = window.innerWidth,
  widnowHeight = window.innerHeight;

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

    let backgroundImg = this.add.image(
      windowWidth / 2,
      widnowHeight / 2,
      "underground"
    );
    backgroundImg.setDisplaySize(windowWidth, widnowHeight);
    // Add text to the screen
    const textStyle = {
      fill: "#fff",
      fontSize: "1.7em",
    };
    this.add.text(40, 120, "Press space to start.", textStyle);
    this.add.text(40, 170, "Move with up, down, left, right.", textStyle);
    this.add.text(40, 220, "Press spacebar to jump.", textStyle);

    this.add.text(40, 270, "Collect all the stars.", textStyle);
  },
  update: function () {
    // Start game on space bar down
    let pointer = this.input.activePointer;

    if (cursors.space.isDown || pointer.isDown) {
      this.scene.start("game");
    }
  },
});
