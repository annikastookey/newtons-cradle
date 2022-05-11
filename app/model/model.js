export let balls = [];
// export let strings = [];
let stringLength;
let ballMass;
let ballRadius;
export let ballNum;
let modelWidth;
let modelHeight;
export let modelAspectRatio;
let isSwinging = false;

import { Ball } from "./ball.js";

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
        Math.PI / 2, //i === 0 ? Math.PI * (5 / 6) :
        ballMass,
        ballRadius
      )
    );
    // strings.push(new String(stringLength));
  }
  //TODO
}

export function getBallIndex(clickX, clickY) {
  for (let i = 0; i < balls.length; i++) {
    let ball = balls[i];
    let ballX = ball.stringLength * Math.cos(ball.angle) + ball.anchorX;
    let ballY = ball.stringLength * Math.sin(ball.angle) + ball.anchorY;
    console.log("ball", ballX, ballY);
    console.log("click", clickX, clickY);
    let dX = clickX - ballX;
    let dY = clickY - ballY;
    let dSq = dX * dX + dY * dY;
    if (dSq < ball.ballRadius * ball.ballRadius) {
      return i;
    }
  }
  return -1;
}

export function moveBall() {
  console.log("moving ball");
}

export function run(timeChange) {
  //TO DO
  if (!isSwinging) {
    return;
  }
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
        ball.playClick();
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
        ball.playClick();
        nextBall.angularVelocity += ball.angularVelocity;
        ball.angularVelocity = 0;
        ball.angle = Math.PI / 2;
      }
    }
  }
}

export function setBallPosition(ball, angle) {
  ball.angle = angle + Math.PI / 2;
}

export function startSwinging() {
  isSwinging = true;
}

export function updateStringLength(_stringLength) {
  stringLength = _stringLength;
  modelWidth = 2 * stringLength + 2 * ballNum * ballRadius;
  modelHeight = stringLength + ballRadius;
  modelAspectRatio = modelWidth / modelHeight;
  for (let i = 0; i < ballNum; i++) {
    balls[i].updateStringLength(
      ballRadius + stringLength + 2 * i * ballRadius,
      stringLength
    );
  }
}

export function updateBallRadius(_ballRadius) {
  ballRadius = _ballRadius;
  modelWidth = 2 * stringLength + 2 * ballNum * ballRadius;
  modelHeight = stringLength + ballRadius;
  modelAspectRatio = modelWidth / modelHeight;
  for (let i = 0; i < ballNum; i++) {
    balls[i].updateBallRadius(
      ballRadius + stringLength + 2 * i * ballRadius,
      ballRadius,
      ballRadius
    );
  }
}

export function updateBallNum(_ballNum) {
  ballNum = _ballNum;
  modelWidth = 2 * stringLength + 2 * ballNum * ballRadius;
  modelAspectRatio = modelWidth / modelHeight;
  while (balls.pop());
  for (let i = 0; i < ballNum; i++) {
    balls.push(
      new Ball(
        ballRadius + stringLength + 2 * i * ballRadius,
        ballRadius,
        stringLength,
        Math.PI / 2,
        ballMass,
        ballRadius
      )
    );
  }
}
