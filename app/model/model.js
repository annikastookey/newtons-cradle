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
        i === 0 ? Math.PI : Math.PI / 2,
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
}
