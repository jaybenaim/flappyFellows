// import mp3 from "../assets/Orbital Colossus.mp3";
import background from "../assets/deepBlueSea.jpg";
import bigCloudsImg from "../assets/bigClouds.png";
import smallCloudsImg from "../assets/smallClouds.png";

import pipe from "../assets/pipe.png";
import longPipe from "../assets/longPipe.png";
import upsideDownPipe from "../assets/upsideDownPipe.png";
import star from "../assets/star.png";
import dude from "../assets/dude.png";
import { accelerate, decelerate, randomIntFromInterval } from "../utils";

let backroundImage,
  bigClouds,
  smallClouds,
  player,
  cursors,
  pipes,
  lives = 1,
  bottomOfThePage = window.innerHeight;

export default new Phaser.Class({
  Extends: Phaser.Scene,
  initialize: function () {
    Phaser.Scene.call(this, { key: "game" });
    window.GAME = this;
  },
  preload: function preload() {
    this.load.image("background", background);
    this.load.image("bigClouds", bigCloudsImg);
    this.load.image("smallClouds", smallCloudsImg);

    this.load.image("pipe", pipe);
    this.load.image("longPipe", longPipe);
    this.load.image("upsideDownPipe", upsideDownPipe);

    this.load.spritesheet("dude", dude, {
      frameWidth: 32,
      frameHeight: 35, //  48 for full height
    });

    this.load.image("star", star);
  },
  create: function () {
    backroundImage = this.add.image(500, 500, "background");
    backroundImage.flipY = true;
    bigClouds = this.add.tileSprite(640, 200, 1280, 400, "bigClouds");
    smallClouds = this.add.tileSprite(640, 200, 1280, 400, "smallClouds");

    cursors = this.input.keyboard.createCursorKeys();
    player = this.physics.add.sprite(50, 350, "dude", 6);
    pipes = this.add.group();

    this.addPlayer();
    // this.addStars();

    this.renderPipes();
    const processPipeCollision = (player, pipe) => {
      // lives check
      lives -= 1;

      if (lives === 0) {
        lives = 1;
        this.scene.start("mainmenu");
      }
    };
    this.physics.add.collider(pipes, player, processPipeCollision, null, this);
  },
  addPlayer: function () {
    //  PLAYER
    // set collision box size
    player.body.setSize(30, 26).setOffset(0, 10);
    player.body.gravity.y = 1000;
    // PLAYER ANIMATIONS
    this.anims.create({
      key: "left",
      frames: this.anims.generateFrameNumbers("dude", {
        start: 0,
        end: 3,
      }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: "turn",
      frames: [{ key: "dude", frame: 4 }],
      frameRate: 20,
    });
    this.anims.create({
      key: "right",
      frames: this.anims.generateFrameNumbers("dude", {
        start: 5,
        end: 8,
      }),
      frameRate: 10,
      repeat: -1,
    });

    // Player collisions
    player.setBounce(0.7, 0.7);
    player.setCollideWorldBounds(true);
  },
  addStars: function () {
    // STARS;
    const stars = this.physics.add.group({
      key: "star",
      repeat: 11,
      setScale: { x: 0.2, y: 0.2 },
      setXY: { x: 400, y: 300 },
    });
    // Create stars
    stars.children.iterate(function (child) {
      child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
      child.setVelocityX(150 - Math.random() * 300);
      child.setVelocityY(150 - Math.random() * 300);
      child.setBounce(1, 1);
      child.setCollideWorldBounds(true);
      child.setSize(220, 200).setOffset(160, 80);
    });
    // COLLISIONS
    // Star collision
    const processStarCollision = (player, star) => {
      star.destroy();
      const starsLeft = stars.countActive();
      if (starsLeft === 0) {
        this.scene.start("mainmenu");
      }
    };
    this.physics.add.collider(stars, pipes);

    this.physics.add.collider(stars, player, processStarCollision, null, this);
  },
  renderPipes: function () {
    this.time.addEvent({
      delay: 3500,
      callback: this.addPipes,
      callbackScope: this,
      loop: true,
    });
  },
  stopPipetimer: function () {
    this.timer.remove();
  },
  addPipes: function () {
    let maxBottom = bottomOfThePage - 50;

    this.addPipe(
      window.innerWidth,
      randomIntFromInterval(maxBottom - 75, maxBottom),
      "longPipe"
    );
    this.addPipe(
      window.innerWidth,
      randomIntFromInterval(0, 75),
      "upsideDownPipe"
    );
  },

  addPipe: function (x, y, typeOfPipe) {
    let pipe = this.physics.add.sprite(x, y, typeOfPipe);
    pipes.add(pipe);
    pipe.setScale(1.3);

    // Make pipe move left
    pipe.body.velocity.x = -200;

    // set collision box for pipes
    if (typeOfPipe === "longPipe") {
      pipe.setSize(63, 200);
      pipe.setOffset(85, 0);
    } else {
      // set upsidedown pipe
      pipe.setSize(72, 197);
      pipe.setOffset(90, 20);
    }

    // Kill the pipe when it is out of view
    pipe.setCollideWorldBounds(false);
  },

  update: function () {
    const { velocity } = player.body;

    let pointer = this.input.activePointer;
    // TOUCH EVENTS
    if (pointer.isDown) {
      if (pointer.x <= 225 || cursors.left.isDown) {
        player.setVelocityX(accelerate(velocity.x, -2));
        player.anims.play("left", true);
      } else if (pointer.x > 225 || cursors.right.isDown) {
        player.setVelocityX(accelerate(velocity.x, 2));
        player.anims.play("right", true);
      }
      if (cursors.up.isDown) {
        this.jump();
        player.anims.play("right", true);
      }
      player.anims.play("turn", true);
    }
    if (player.y < 0 || player.y >= window.innerHeight) {
      this.restartGame();
    }
    // ARROW KEYS
    else {
      // ARROW KEYS
      // Move left
      if (cursors.left.isDown) {
        player.setVelocityX(accelerate(velocity.x, -2));
        player.anims.play("left", true);

        // move right
      } else if (cursors.right.isDown) {
        player.setVelocityX(accelerate(velocity.x, 2));
        player.anims.play("right", true);
      } else if (cursors.up.isDown) {
        this.jump();
        player.anims.play("right", true);
      } else {
        player.anims.play("turn", true);
      }
    }

    if (cursors.space.isDown) {
      this.jump();
    }

    bigClouds.tilePositionX += 0.5;
    smallClouds.tilePositionX += 0.25;
  },
  jump: function () {
    player.body.velocity.y = -350;
  },
  restartGame: function () {
    this.scene.start("mainmenu");
  },
});
