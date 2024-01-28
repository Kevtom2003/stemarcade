// GalagaGame.js
import React, { useEffect, useRef } from "react";
import * as PIXI from "pixi.js";

import planeImage from "../plane.png";

const GalagaGame = () => {
  const appRef = useRef(null);

  useEffect(() => {
    const app = new PIXI.Application({
      width: window.innerWidth,
      height: window.innerHeight,
      backgroundColor: 0x1099bb,
    });
    appRef.current.appendChild(app.view);

    // Player setup
    const player = new PIXI.Sprite(PIXI.Texture.from(planeImage));
    player.anchor.set(0.5);
    player.x = app.screen.width / 2;
    player.y = app.screen.height - 50;
    app.stage.addChild(player);

    // Laser setup
    const lasers = [];

    // Alien setup
    const aliens = [];

    for (let i = 0; i < 5; i++) {
      const number = i === 2 ? 25 : Math.floor(Math.random() * 10) + 1;
      const alien = new PIXI.Text(number, {
        fontSize: 36,
        fill: 0xFFFFFF,
      });
      alien.x = i * 120;
      alien.y = 100;
      aliens.push(alien);
      app.stage.addChild(alien);
    }

    // Math operation text
    const mathOperation = new PIXI.Text("5 x 5", {
      fontSize: 24,
      fill: 0xFFFFFF,
    });
    mathOperation.anchor.set(0.5, 1);
    mathOperation.x = app.screen.width / 2;
    mathOperation.y = app.screen.height - 10;
    app.stage.addChild(mathOperation);

    // Keyboard controls
    const left = keyboard("ArrowLeft");
    const right = keyboard("ArrowRight");
    const space = keyboard("Space");

    left.press = () => {
      player.vx = -5;
      player.vy = 0;
    };

    left.release = () => {
      if (!right.isDown) {
        player.vx = 0;
      }
    };

    right.press = () => {
      player.vx = 5;
      player.vy = 0;
    };

    right.release = () => {
      if (!left.isDown) {
        player.vx = 0;
      }
    };

    space.press = () => {
      // Create and shoot lasers
      const laser = new PIXI.Graphics();
      laser.beginFill(0xFF0000);
      laser.drawRect(0, 0, 5, 10);
      laser.endFill();
      laser.x = player.x;
      laser.y = player.y - 20;
      lasers.push(laser);
      app.stage.addChild(laser);
    };

    // Game loop
    const gameLoop = () => {
      player.x += player.vx;

      // Update lasers
      lasers.forEach((laser) => {
        laser.y -= 5;

        // Check for collision with aliens
        aliens.forEach((alien) => {
          if (hitTestRectangle(laser, alien)) {
            // Handle collision (e.g., increase score)
            // You can customize this part based on your requirements
            console.log("Hit!");
            // Remove laser and reset position
            laser.y = -100;
          }
        });
      });
    };

    // PIXI.js ticker
    app.ticker.add(gameLoop);

    // Helper function for keyboard controls
    function keyboard(keyCode) {
      const key = {
        code: keyCode,
        isDown: false,
        isUp: true,
        press: undefined,
        release: undefined,
      };

      key.downHandler = (event) => {
        if (event.code === key.code) {
          if (key.isUp && key.press) key.press();
          key.isDown = true;
          key.isUp = false;
          event.preventDefault();
        }
      };

      key.upHandler = (event) => {
        if (event.code === key.code) {
          if (key.isDown && key.release) key.release();
          key.isDown = false;
          key.isUp = true;
          event.preventDefault();
        }
      };

      // Attach event listeners
      window.addEventListener("keydown", key.downHandler);
      window.addEventListener("keyup", key.upHandler);

      return key;
    }

    // Helper function for collision detection
    function hitTestRectangle(r1, r2) {
      return (
        r1.x < r2.x + r2.width &&
        r1.x + r1.width > r2.x &&
        r1.y < r2.y + r2.height &&
        r1.y + r1.height > r2.y
      );
    }

    // Clean up PIXI.js application on component unmount
    return () => {
      app.destroy();
    };
  }, []);

  return <div id="galaga-container" ref={appRef}></div>;
};

export default GalagaGame;
