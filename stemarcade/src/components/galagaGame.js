// GalagaGame.js
import React, { useEffect, useRef, useState } from "react";
import * as PIXI from "pixi.js";
import plane from "../images/mathspaceship.png"
import {Keyboard} from 'pixi.js-keyboard';
import { Text } from 'pixi.js';



const GalagaGame = () => {
  const [loading, setLoading] = useState(true);
  const appRef = useRef(null);

  useEffect(() => {
    console.log(loading);
    setTimeout(() => {
      setLoading(false);
      console.log("done", loading);
    }, 500);
  }, []);

  useEffect(() => {
// Based somewhat on this article by Spicy Yoghurt
// URL for further reading: https://spicyyoghurt.com/tutorials/html5-javascript-game-development/collision-detection-physics
const app = new PIXI.Application({ background: '#111', resizeTo: window });
app.ticker.add(gameLoop);
document.body.appendChild(app.view);

// Options for how objects interact
// How fast the red square moves
// const movementSpeed = 0.05;

// Strength of the impulse push between two objects
const impulsePower = 5;
let bullets = [];
let bulletSpeed = 10;

// Test For Hit
// A basic AABB check between two different squares
function testForHit(object1, object2)
{
    const bounds1 = object1.getBounds();
    const bounds2 = object2.getBounds();

    return bounds1.x < bounds2.x + bounds2.width
        && bounds1.x + bounds1.width > bounds2.x
        && bounds1.y < bounds2.y + bounds2.height
        && bounds1.y + bounds1.height > bounds2.y;
}

// Calculates the results of a collision, allowing us to give an impulse that
// shoves objects apart
// function collisionResponse(object1, object2)
// {
//     if (!object1 || !object2)
//     {
//         return new PIXI.Point(0);
//     }

//     const vCollision = new PIXI.Point(
//         object2.x - object1.x,
//         object2.y - object1.y,
//     );

//     const distance = Math.sqrt(
//         (object2.x - object1.x) * (object2.x - object1.x)
//         + (object2.y - object1.y) * (object2.y - object1.y),
//     );

//     const vCollisionNorm = new PIXI.Point(
//         vCollision.x / distance,
//         vCollision.y / distance,
//     );

//     const vRelativeVelocity = new PIXI.Point(
//         object1.acceleration.x - object2.acceleration.x,
//         object1.acceleration.y - object2.acceleration.y,
//     );

//     const speed = vRelativeVelocity.x * vCollisionNorm.x
//         + vRelativeVelocity.y * vCollisionNorm.y;

//     const impulse = impulsePower * speed / (object1.mass + object2.mass);

//     return new PIXI.Point(
//         impulse * vCollisionNorm.x,
//         impulse * vCollisionNorm.y,
//     );
// }

// // Calculate the distance between two given points
// function distanceBetweenTwoPoints(p1, p2)
// {
//     const a = p1.x - p2.x;
//     const b = p1.y - p2.y;

//     return Math.hypot(a, b);
// }

// The green square we will knock about
var userScore = 0;

const style = new PIXI.TextStyle({
    fill: ['#ffffff']

});
const basicText = new PIXI.Text("Score: " + userScore,style);

basicText.x = 450;
basicText.y = 50;


const greenSquare = new PIXI.Sprite(PIXI.Texture.WHITE);

greenSquare.position.set((app.screen.width - 100) / 2, (app.screen.height - 100) / 2);
greenSquare.width = 100;
greenSquare.height = 100;
greenSquare.tint = 0x00FF00;
greenSquare.acceleration = new PIXI.Point(0);
greenSquare.mass = 3;

// The square you move around
// const redSquare = PIXI.Sprite.from('https://pixijs.com/assets/bunny.png');
// redSquare.on('pointerdown', fireBullets);
const redSquare= PIXI.Sprite.from(plane);

// Set the initial position
redSquare.anchor.set(0.5,1);
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
        movingLeft = 5;
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
            movingRight=5;
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
function fireBullets(){
    console.log("Fire");
    let bullet = createBullet();
    bullets.push(bullet);
}
function createBullet(){
    let bullet = PIXI.Sprite.from(PIXI.Texture.WHITE);
    bullet.width = 10;
    bullet.height = 10;
    bullet.tint = 0x00FF00;
    bullet.x=redSquare.x * 0.992;
    bullet.y=redSquare.y - redSquare.height;
    bullet.speed = bulletSpeed;
    app.stage.addChild(bullet);
    return bullet;
}
var score =0;
function gameLoop(delta){
    updateBullet(delta);
    redSquare.x -= movingLeft;
    redSquare.x += movingRight;
    
}

function updateBullet(delta){
    for(let i = 0;i < bullets.length;i++){
        bullets[i].position.y -= bullets[i].speed;
        if(testForHit(bullets[i], greenSquare)){
            console.log("HIT!");
            score += 2;
            bullets[i].dead= true;
        }else if(bullets[i].position.y < 0){
            bullets[i].dead= true;
        }
    }
    for(let i = 0;i < bullets.length;i++){
        if(bullets[i].dead){
            app.stage.removeChild(bullets[i]);
            bullets.splice(i,1);
        }
    }
    basicText.text = "Score: " + score;
    
}


// Listen for animate update
// app.ticker.add((delta) =>
// {
//     // Applied deacceleration for both squares, done by reducing the
//     // acceleration by 0.01% of the acceleration every loop
//     redSquare.acceleration.set(redSquare.acceleration.x * 0.99, redSquare.acceleration.y * 0.99);
//     greenSquare.acceleration.set(greenSquare.acceleration.x * 0.99, greenSquare.acceleration.y * 0.99);

//     // Check whether the green square ever moves off the screen
//     // If so, reverse acceleration in that direction
//     if (greenSquare.x < 0 || greenSquare.x > (app.screen.width - 100))
//     {
//         greenSquare.acceleration.x = -greenSquare.acceleration.x;
//     }

//     if (greenSquare.y < 0 || greenSquare.y > (app.screen.height - 100))
//     {
//         greenSquare.acceleration.y = -greenSquare.acceleration.y;
//     }

//     // If the green square pops out of the cordon, it pops back into the
//     // middle
//     if ((greenSquare.x < -30 || greenSquare.x > (app.screen.width + 30))
//         || greenSquare.y < -30 || greenSquare.y > (app.screen.height + 30))
//     {
//         greenSquare.position.set((app.screen.width - 100) / 2, (app.screen.height - 100) / 2);
//     }

//     // If the mouse is off screen, then don't update any further
//     if (app.screen.width > mouseCoords.x || mouseCoords.x > 0
//         || app.screen.height > mouseCoords.y || mouseCoords.y > 0)
//     {
//         // Get the red square's center point
//         const redSquareCenterPosition = new PIXI.Point(
//             redSquare.x + (redSquare.width * 0.5),
//             redSquare.y + (redSquare.height * 0.5),
//         );

//         // Calculate the direction vector between the mouse pointer and
//         // the red square
//         const toMouseDirection = new PIXI.Point(
//             mouseCoords.x - redSquareCenterPosition.x,
//             mouseCoords.y - redSquareCenterPosition.y,
//         );

//         // Use the above to figure out the angle that direction has
//         const angleToMouse = Math.atan2(
//             toMouseDirection.y,
//             toMouseDirection.x,
//         );

//         // Figure out the speed the square should be travelling by, as a
//         // function of how far away from the mouse pointer the red square is
//         const distMouseRedSquare = distanceBetweenTwoPoints(
//             mouseCoords,
//             redSquareCenterPosition,
//         );
//         const redSpeed = distMouseRedSquare * movementSpeed;

//         // Calculate the acceleration of the red square
//         redSquare.acceleration.set(
//             Math.cos(angleToMouse) * redSpeed,
//             Math.sin(angleToMouse) * redSpeed,
//         );
//     }

//     // If the two squares are colliding


//     greenSquare.x += greenSquare.acceleration.x * delta;
//     greenSquare.y += greenSquare.acceleration.y * delta;

//     redSquare.x += redSquare.acceleration.x * delta;
//     redSquare.y += redSquare.acceleration.y * delta;
// });

// Add to stage
if (app.stage) {
    console.log("rendering");
    app.stage.addChild(basicText);
    app.stage.addChild(redSquare, greenSquare);
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
