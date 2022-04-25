import { start } from "../app.js";
import { can } from "../view/view.js";
import {
  getBallIndex,
  setBallPosition,
  balls,
  startSwinging,
} from "../model/model.js";
// import { moveBall } from "../model/model.js";

let ballDragged = null;
let allowDrag = true;

export function init() {
  console.log("initializing Controller");
  document.getElementById("startButton").addEventListener("click", () => {
    console.log("button click");
    document.getElementById("startButton").style.display = "none";
    start();
  });
  can.addEventListener("mousedown", (e) => {
    if (!allowDrag) {
      return;
    }
    let ballI = getBallIndex(e.clientX, e.clientY);
    if (ballI !== 0) {
      return;
    }
    ballDragged = balls[ballI];
  });
  can.addEventListener("mouseup", (e) => {
    if (ballDragged) {
      // TO DO - handle release of ball
      // ie. start the animation with ball in this position
      // ball[i].angle = ball[i].stringLength / (ball[i.stringLength - ()])
      // do i need to add an update function to the model? there's one on the ball, so could I just pass this information on the ball's position to that function?
    }
    ballDragged = null;
    allowDrag = false;
    startSwinging();
  });
  can.addEventListener("mousemove", (e) => {
    if (!ballDragged) {
      return;
    }
    let mouseAngle =
      Math.atan2(
        e.clientY - ballDragged.anchorY,
        e.clientX - ballDragged.anchorX
      ) -
      Math.PI / 2;
    if (mouseAngle < 0) {
      mouseAngle = Math.PI / 2;
    }
    setBallPosition(ballDragged, mouseAngle);

    // TO DO - inform model and view of temporary repositioning of ball
  });
}
