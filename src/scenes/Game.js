// import mp3 from "../assets/Orbital Colossus.mp3";
import background from "../assets/deepBlueSea.jpg";
import pipe from "../assets/pipe.png";
import longPipe from "../assets/longPipe.png";
import upsideDownPipe from "../assets/upsideDownPipe.png";
import star from "../assets/star.png";
import dude from "../assets/dude.png";
import { accelerate, decelerate } from "../utils";

let player;
let cursors;
let pipes;
let lives = 1;

export default new Phaser.Class({
  Extends: Phaser.Scene,
  initialize: function () {
    Phaser.Scene.call(this, { key: "game" });
    window.GAME = this;
  },
  preload: function preload() {
    this.load.image("background", background);
    this.load.image("pipe", pipe);
    this.load.image("longPipe", longPipe);
    this.load.image("upsideDownPipe", upsideDownPipe);

    this.load.spritesheet("dude", dude, {
      frameWidth: 32,
      frameHeight: 35, //  48 for full height
    });

    this.load.image("star", star);
  },
  create: function create() {
    this.add.image(500, 500, "background");

    // Box // Player
    player = this.physics.add.sprite(100, 100, "dude", 6);
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

    // Pipes
    pipes = this.physics.add.staticGroup();

    pipes
      .create(200, 510, "longPipe")
      .setScale(1)
      .setSize(0.4, 0.4)
      .refreshBody();
    pipes.create(400, 0, "upsideDownPipe").setScale(1).refreshBody();

    const processPipeCollision = (player, pipe) => {
      // lives check
      lives -= 1;

      if (lives === 0) {
        lives = 1;
        this.scene.start("mainmenu");
      }
      // const lives = lives.countActive();
    };

    this.physics.add.collider(pipes, player, processPipeCollision, null, this);

    // const stars = this.physics.add.group({
    //   key: "star",
    //   repeat: 11,
    //   setScale: { x: 0.2, y: 0.2 },
    //   setXY: { x: 400, y: 300 },
    // });

    // stars.children.iterate(function (child) {
    //   child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    //   child.setVelocityX(150 - Math.random() * 300);
    //   child.setVelocityY(150 - Math.random() * 300);
    //   child.setBounce(1, 1);
    //   child.setCollideWorldBounds(true);
    // });

    cursors = this.input.keyboard.createCursorKeys();

    // const processCollision = (player, star) => {
    //   star.destroy();
    //   const starsLeft = stars.countActive();
    //   if (starsLeft === 0) {
    //     this.scene.start("winscreen");
    //   }
    // };

    // this.physics.add.collider(stars, player, processCollision, null, this);

    player.setBounce(1, 1);
    player.setCollideWorldBounds(true);
  },
  update: function () {
    const { velocity } = player.body;

    let pointer = this.input.activePointer;
    // TOUCH EVENTS
    if (pointer.isDown) {
      if (pointer.x <= 225 || cursors.left.isDown) {
        // player.setVelocityX(-130);
        player.setVelocityX(accelerate(velocity.x, -1));
        player.anims.play("left", true);
      } else if (pointer.x > 225 || cursors.right.isDown) {
        // player.setVelocityX(130);
        player.setVelocityX(accelerate(velocity.x, 1));
        player.anims.play("right", true);
      } else if (pointer.y <= 350 || cursors.up.isDown) {
        // player.setVelocityX(130);
        player.setVelocityY(accelerate(velocity.y, -1));
        player.anims.play("right", true);
      } else if (pointer.y > 350 || cursors.down.isDown) {
        // player.setVelocityX(130);
        player.setVelocityY(accelerate(velocity.y, 1));
        player.anims.play("right", true);
      } else {
        player.setVelocityX(0);
        player.anims.play("turn", true);
      }

      if (pointer.y <= 400 && player.body.touching.down) {
        player.setVelocityY(-330);
      }
    } else {
      // ARROW KEYS
      // Move left
      if (cursors.left.isDown) {
        // player.setVelocityX(-160);
        player.setVelocityX(accelerate(velocity.x, -1));
        player.anims.play("left", true);

        // move right
      } else if (cursors.right.isDown) {
        // player.setVelocityX(160);
        player.setVelocityX(accelerate(velocity.x, 1));
        player.anims.play("right", true);
      } else if (cursors.up.isDown) {
        // player.setVelocityX(160);
        player.setVelocityY(accelerate(velocity.y, -1));
        player.anims.play("right", true);
      } else if (cursors.down.isDown) {
        // player.setVelocityX(160);
        player.setVelocityY(accelerate(velocity.y, 1));
        player.anims.play("right", true);
      } else {
        player.setVelocityX(0);
        player.anims.play("turn", true);
      }
      if (cursors.up.isDown && player.body.touching.down) {
        player.setVelocityY(-330);
      }
    }

    // if (cursors.space.isDown) {
    //   const x = decelerate(velocity.x);
    //   const y = decelerate(velocity.y);
    //   player.setVelocity(x, y);
    // }

    // if (cursors.up.isDown) player.setVelocityY(accelerate(velocity.y, -1));
    // if (cursors.right.isDown) player.anims.play("right", true);
    // if (cursors.down.isDown) player.setVelocityY(accelerate(velocity.y, 1));
    // if (cursors.left.isDown) player.setVelocityX(accelerate(velocity.x, -1));
  },
});
