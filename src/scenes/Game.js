// import mp3 from "../assets/Orbital Colossus.mp3";
import background from "../assets/deepBlueSea.jpg";
import pipe from "../assets/pipe.png";
import star from "../assets/star.png";
import dude from "../assets/dude.png";
import { accelerate, decelerate } from "../utils";

let box;
let cursors;
let pipes;

export default new Phaser.Class({
  Extends: Phaser.Scene,
  initialize: function () {
    Phaser.Scene.call(this, { key: "game" });
    window.GAME = this;
  },
  preload: function preload() {
    this.load.image("background", background);
    this.load.image("pipe", pipe);

    this.load.spritesheet("dude", dude, {
      frameWidth: 32,
      frameHeight: 35, //  48 for full height
    });

    this.load.image("star", star);
  },
  create: function create() {
    this.add.image(500, 500, "background");
    pipes = this.physics.add.staticGroup();

    // pipe 1
    pipes.create(200, 500, "pipe").scale.setTo(1, 2).refreshBody();

    const stars = this.physics.add.group({
      key: "star",
      repeat: 11,
      setScale: { x: 0.2, y: 0.2 },
      setXY: { x: 400, y: 300 },
    });

    stars.children.iterate(function (child) {
      child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
      child.setVelocityX(150 - Math.random() * 300);
      child.setVelocityY(150 - Math.random() * 300);
      child.setBounce(1, 1);
      child.setCollideWorldBounds(true);
    });

    cursors = this.input.keyboard.createCursorKeys();

    box = this.physics.add.image(400, 100, "dude", 15);

    const processCollision = (box, star) => {
      star.destroy();
      const starsLeft = stars.countActive();
      if (starsLeft === 0) {
        this.scene.start("winscreen");
      }
    };

    this.physics.add.collider(stars, box, processCollision, null, this);

    box.setBounce(1, 1);
    box.setCollideWorldBounds(true);
  },
  update: function () {
    const { velocity } = box.body;

    if (cursors.space.isDown) {
      const x = decelerate(velocity.x);
      const y = decelerate(velocity.y);
      box.setVelocity(x, y);
    }

    if (cursors.up.isDown) box.setVelocityY(accelerate(velocity.y, -1));
    if (cursors.right.isDown) box.setVelocityX(accelerate(velocity.x, 1));
    if (cursors.down.isDown) box.setVelocityY(accelerate(velocity.y, 1));
    if (cursors.left.isDown) box.setVelocityX(accelerate(velocity.x, -1));
  },
});
