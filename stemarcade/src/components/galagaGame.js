// GalagaGame.js
import React, { useEffect, useRef, useState } from "react";
import * as PIXI from "pixi.js";
import plane from "../images/mathspaceship.png"
import alien from "../images/rawalienhead.png"
import alien400 from "../images/400alien.png"
import alien30 from "../images/30alien.png"
import alien99 from "../images/99alien.png"
import alien169 from "../images/169alien.png"
import alien78 from "../images/78alien.png"
import spacebg from "../images/spacebg.jpg"
import { Keyboard } from 'pixi.js-keyboard';
import { Text } from 'pixi.js';
import { useNavigate } from "react-router-dom";
import './galagaGame.css';
//import { setTimeout } from "timers/promises";


const GalagaGame = () => {
  const appRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {

    // Based somewhat on this article by Spicy Yoghurt
    // URL for further reading: https://spicyyoghurt.com/tutorials/html5-javascript-game-development/collision-detection-physics
    const app = new PIXI.Application({ background: '#111', resizeTo: window });
    const backgroundTexture = PIXI.Texture.from(spacebg);
    const backgroundSprite = new PIXI.TilingSprite(backgroundTexture, app.screen.width, app.screen.height);
    backgroundSprite.tileScale.set(0.5, 0.5);
    app.stage.addChild(backgroundSprite);

    app.ticker.add(gameLoop);
    document.body.appendChild(app.view);

    // Options for how objects interact
    // How fast the red square moves
    // const movementSpeed = 0.05;

    // Strength of the impulse push between two objects
    let bullets = [];
    let bulletSpeed = 25;
    const aliens = [];
    let hitcount = 0;

    // Test For Hit
    // A basic AABB check between two different squares
    let questionList = ["100*8 - 3/4*800 + 50*4 = ", "A student is traveling at 15mph for 2 hours, how far does he go?", "(4^2 + 3*8) * (3/4) = "]
    let responseList = ["Correct! Speaking of 400, the fastest rocket in the world traveled at about \n400,000 kph! Let's try to be fast too, and show these aliens who's boss!", "Right again! Did you know that there are 30 Earth's worth of distance between us and the moon?\nLook how far we've come!", "Awesome! Interesting, because the Sun makes up 99% of our solar system's mass!\nJust like the sun, you're on fire!!"]
    let alienVals = [400, 30, 99, 120, 50]
    function testForHit(object1, object2) {
      const bounds1 = object1.getBounds();
      const bounds2 = object2.getBounds();

      return bounds1.x < bounds2.x + bounds2.width
        && bounds1.x + bounds1.width > bounds2.x
        && bounds1.y < bounds2.y + bounds2.height
        && bounds1.y + bounds1.height > bounds2.y;
    }


    var userScore = 0;

    const style = new PIXI.TextStyle({
      fill: ['#ffffff'],
      fontFamily:"mySecondFont"

    });

    const gameoverstyle = new PIXI.TextStyle({
      fill: ['#ffffff'],
      fontSize: 100

    });
    const basicText = new PIXI.Text("Score:   ", style);

    basicText.x = 1200;
    basicText.y = 50;

    const tipText = new PIXI.Text("", style);

    tipText.x = 450;
    tipText.y = 70;
    let qCount = 0;

    const problemText = new PIXI.Text(questionList[qCount], style);
    problemText.x = 100;
    problemText.y = 50;

    const responseText = new PIXI.Text("", style);
    responseText.x = 100;
    responseText.y = 50;

    const gameOverText = new PIXI.Text("", gameoverstyle);
    gameOverText.x = 100;
    gameOverText.y = 220;

    // Create a PIXI.Sprite with the desired texture
    const greenSquare = PIXI.Sprite.from(alien400);
    aliens.push(greenSquare);

    greenSquare.position.set((app.screen.width - 100) / 2, (app.screen.height - 100) / 2);
    greenSquare.width = 50;
    greenSquare.height = 60;
    greenSquare.acceleration = new PIXI.Point(0);
    greenSquare.value = alienVals[0];
    greenSquare.speed = Math.random() * 5;

    function getRandomPosition() {
      const screenWidth = app.screen.width;
      const screenHeight = app.screen.height * 0.5;
      const x = Math.random() * (screenWidth - 100);
      const y = Math.random() * screenHeight + 70;
      const v = Math.random() * 3;
      return { x, y, v };
    }
    function distanceBetweenTwoPoints(point1, point2) {
      const dx = point2.x - point1.x;
      const dy = point2.y - point1.y;
      return Math.sqrt(dx * dx + dy * dy);
    }
    // Function to add green squares to the stage
    function addGreenSquares() {
      const minDistance = 150; // Minimum distance between aliens
      let position = getRandomPosition();
      while (aliens.some((alien) => distanceBetweenTwoPoints(position, alien.position) < minDistance)) {
        position = getRandomPosition();
      }
      // Create a PIXI.Sprite with the desired texture
      const greenSquare = PIXI.Sprite.from(alien30);
      aliens.push(greenSquare);
      greenSquare.speed = position.v;
      greenSquare.position.set(position.x, position.y);
      greenSquare.width = 50;
      greenSquare.height = 60;
      greenSquare.acceleration = new PIXI.Point(0);
      greenSquare.mass = 3;
      greenSquare.value = alienVals[1];
      aliens.push(greenSquare);
      app.stage.addChild(greenSquare);

      let position2 = getRandomPosition();
      while (aliens.some((alien) => distanceBetweenTwoPoints(position2, alien.position) < minDistance)) {
        position2 = getRandomPosition();
      }
      // Create a PIXI.Sprite with the desired texture
      const greenSquare2 = PIXI.Sprite.from(alien99);
      aliens.push(greenSquare2);
      greenSquare2.speed = position2.v;
      greenSquare2.position.set(position2.x, position2.y);
      greenSquare2.width = 50;
      greenSquare2.height = 60;
      greenSquare2.acceleration = new PIXI.Point(0);
      greenSquare2.mass = 3;
      greenSquare2.value = alienVals[2];
      aliens.push(greenSquare2);
      app.stage.addChild(greenSquare2);

      let position3 = getRandomPosition();
      while (aliens.some((alien) => distanceBetweenTwoPoints(position3, alien.position) < minDistance)) {
        position3 = getRandomPosition();
      }
      // Create a PIXI.Sprite with the desired texture
      const greenSquare3 = PIXI.Sprite.from(alien169);
      aliens.push(greenSquare3);
      greenSquare3.speed = position2.v;
      greenSquare3.position.set(position2.x, position2.y);
      greenSquare3.width = 50;
      greenSquare3.height = 60;
      greenSquare3.acceleration = new PIXI.Point(0);
      greenSquare3.mass = 3;
      greenSquare3.value = alienVals[3];
      aliens.push(greenSquare3);
      app.stage.addChild(greenSquare3);

      let position4 = getRandomPosition();
      while (aliens.some((alien) => distanceBetweenTwoPoints(position4, alien.position) < minDistance)) {
        position4 = getRandomPosition();
      }
      // Create a PIXI.Sprite with the desired texture
      const greenSquare4 = PIXI.Sprite.from(alien78);
      aliens.push(greenSquare3);
      greenSquare4.speed = position2.v;
      greenSquare4.position.set(position2.x, position2.y);
      greenSquare4.width = 50;
      greenSquare4.height = 60;
      greenSquare4.acceleration = new PIXI.Point(0);
      greenSquare4.mass = 3;
      greenSquare4.value = alienVals[4];
      aliens.push(greenSquare4);
      app.stage.addChild(greenSquare4);

    }
    addGreenSquares();

    // The square you move around
    // const redSquare = PIXI.Sprite.from('https://pixijs.com/assets/bunny.png');
    // redSquare.on('pointerdown', fireBullets);
    const redSquare = PIXI.Sprite.from(plane);

    // Set the initial position
    redSquare.anchor.set(0.5, 1);
    redSquare.x = app.screen.width / 2;
    redSquare.y = app.screen.height * 0.96;

    // Opt-in to interactivity
    redSquare.eventMode = 'static';


    function keyboard(keyCode) {
      let key = {};
      key.code = keyCode;
      key.isDown = false;
      key.isUp = true;
      key.press = undefined;
      key.release = undefined;

      //The `downHandler`
      key.downHandler = event => {
        if (event.keyCode === key.code) {
          if (key.isUp && key.press) key.press();
          key.isDown = true;
          key.isUp = false;
        }
        event.preventDefault();
      };

      //The `upHandler`
      key.upHandler = event => {
        if (event.keyCode === key.code) {
          if (key.isDown && key.release) key.release();
          key.isDown = false;
          key.isUp = true;
        }
        event.preventDefault();
      };

      //Attach event listeners
      window.addEventListener(
        "keydown", key.downHandler.bind(key), false
      );
      window.addEventListener(
        "keyup", key.upHandler.bind(key), false
      );

      //Return the `key` object
      return key;
    }

    var movingLeft = 0;
    var movingRight = 0;
    var left = keyboard(37),
      up = keyboard(38),
      right = keyboard(39);

    left.press = () => {
      console.log("Moving left");
      //Change the sprite’s velocity when the key is pressed
      movingLeft = 10;
    };


    //Left arrow key `release` method
    left.release = () => {
      //If the left arrow has been released, and the right arrow isn’t down,
      //and the pixie isn’t moving vertically, stop the sprite from moving
      //by setting its velocity to zero
      movingLeft = 0;
    };
    right.press = () => {
      console.log("Moving left");
      //Change the sprite’s velocity when the key is pressed
      movingLeft = 0;
      movingRight = 10;
    };


    //Left arrow key `release` method
    right.release = () => {
      //If the left arrow has been released, and the right arrow isn’t down,
      //and the pixie isn’t moving vertically, stop the sprite from moving
      //by setting its velocity to zero
      movingRight = 0;
    };


    up.press = () => {
      fireBullets();
    };



    // Pointers normalize touch and mouse (good for mobile and desktop)
    function fireBullets() {
      console.log("Fire");
      let bullet = createBullet();
      bullets.push(bullet);
    }
    function createBullet() {
      let bullet = PIXI.Sprite.from(PIXI.Texture.WHITE);
      bullet.width = 10;
      bullet.height = 10;
      bullet.tint = 0xFFFF00;
      bullet.x = redSquare.x * 0.992;
      bullet.y = redSquare.y - redSquare.height;
      bullet.speed = bulletSpeed;
      app.stage.addChild(bullet);
      return bullet;
    }
    var score = 0;
    function gameLoop(delta) {

      updateBullet(delta);
      for (let i = 0; i < aliens.length; i++) {
        aliens[i].position.x += aliens[i].speed * delta;

        // Check if the alien hits the screen boundaries
        if (
          aliens[i].position.x < 0 ||
          aliens[i].position.x > app.screen.width - aliens[i].width
        ) {
          // Reverse the direction when hitting the boundaries
          aliens[i].speed = -aliens[i].speed;
        }
      }

      redSquare.x -= movingLeft;
      redSquare.x += movingRight;
    }
    let tipTimeout;
    let responseTimeout;

    function updateBullet(delta) {
      for (let i = 0; i < bullets.length; i++) {
        bullets[i].position.y -= bullets[i].speed;
        for (let j = 0; j < aliens.length; j++) {
          if (testForHit(bullets[i], aliens[j])) {
            console.log("HIT!");
            if (aliens[j].value === alienVals[qCount]) {
              hitcount += 1;
              score += 2;
              basicText.text = "Score:   " + score;
              if (hitcount === 5) {
                hitcount = 0;
                problemText.text = "";
                responseText.text = responseList[qCount];
                console.log("Question Completed!");
                clearTimeout(responseTimeout);
                responseTimeout = setTimeout(() => {
                  qCount += 1;
                  problemText.text = questionList[qCount];
                  responseText.text = "";
                }, 4000); // Adjust the duration (in milliseconds) as needed

                //qCount += 1;
                //problemText.text = questionList[qCount];
                //responseText.text = "";
              }
            } else {
              tipText.text = "Try a different one!";
              console.log("Miss");
              clearTimeout(tipTimeout);
              tipTimeout = setTimeout(() => {
                tipText.text = "";
              }, 300); // Adjust the duration (in milliseconds) as needed
            }
            bullets[i].dead = true;
          } else if (bullets[i].position.y < 0) {
            bullets[i].dead = true;
          }
        }

      }
      for (let i = 0; i < bullets.length; i++) {
        if (bullets[i].dead) {
          app.stage.removeChild(bullets[i]);
          bullets.splice(i, 1);
        }
      }
      
      if (qCount > 2) {
        gameEnd();
      }
    }
    function gameEnd() {
      console.log("game over");
      gameOverText.text = "YOU WIN!";
      // Create buttons
      const homeButton = new PIXI.Text("Take Me Back to Homepage", style);
      homeButton.x = 100;
      homeButton.y = 330;
      homeButton.interactive = true;
      homeButton.buttonMode = true;
      homeButton.on("pointerdown", () => navigate("/galagaIntro"));

      const playMoreButton = new PIXI.Text("Play More", style);
      playMoreButton.x = 100;
      playMoreButton.y = 380;
      playMoreButton.interactive = true;
      playMoreButton.buttonMode = true;
      playMoreButton.on("pointerdown", () => {
        window.location.reload();
      });

      app.stage.addChild(homeButton, playMoreButton);
    }

    // Add to stage
    if (app.stage) {
      console.log("rendering");
      app.stage.addChild(basicText, tipText, redSquare, ...aliens, problemText, gameOverText, responseText);
      // app.stage.addChild(redSquare, greenSquare);
    } else {
      console.error('app.stage is null or undefined.');
    }
    // Cleanup PIXI when the component unmounts
    return () => {
      app.destroy(true);
    };
  }, []); // Run this effect only once during component mount

  return <div ref={appRef} />;
};

export default GalagaGame;
