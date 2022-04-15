export let balls = [];
// export let strings = [];
let stringLength;
let ballMass;
let ballRadius;
export let ballNum;
let modelWidth;
let modelHeight;
export let modelAspectRatio;

import { Ball } from "./ball.js";
import { String } from "./string.js";

function collisionDetection(ballLeft, ballRight) {
  return ballLeft.angle < ballRight.angle;
}

export function init(_stringLength, _ballMass, _ballRadius, _ballNum) {
  // 200, 1, 50, 5
  console.log("initializing Model");
  stringLength = _stringLength;
  ballMass = _ballMass;
  ballRadius = _ballRadius;
  ballNum = _ballNum;
  modelWidth = 2 * stringLength + 2 * ballNum * ballRadius;
  modelHeight = stringLength + ballRadius;
  modelAspectRatio = modelWidth / modelHeight;
  for (let i = 0; i < ballNum; i++) {
    balls.push(
      new Ball(
        ballRadius + stringLength + 2 * i * ballRadius,
        ballRadius,
        stringLength,
        i === 0 ? Math.PI * (5 / 6) : Math.PI / 2,
        ballMass,
        ballRadius
      )
    );
    // strings.push(new String(stringLength));
  }
  //TODO
}

export function run(timeChange) {
  //TO DO
  for (let ball of balls) {
    ball.update(timeChange);
  }
  for (let i = 0; i < balls.length; i++) {
    let ball = balls[i];
    if (ball.angularVelocity > 0) {
      if (i === 0) {
        continue;
      }
      let nextBall = balls[i - 1];
      if (collisionDetection(nextBall, ball)) {
        nextBall.angularVelocity += ball.angularVelocity;
        ball.angularVelocity = 0;
        ball.angle = Math.PI / 2;
      }
    } else if (ball.angularVelocity < 0) {
      if (i === balls.length - 1) {
        continue;
      }
      let nextBall = balls[i + 1];
      if (collisionDetection(ball, nextBall)) {
        nextBall.angularVelocity += ball.angularVelocity;
        ball.angularVelocity = 0;
        ball.angle = Math.PI / 2;
      }
    }
  }
}
