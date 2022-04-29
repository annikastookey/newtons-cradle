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
let dragDirection = 0;

export function init() {
  console.log("initializing Controller");
  document.getElementById("startButton").addEventListener("click", () => {
    console.log("button click");
    document.getElementById("startButton").style.display = "none";
    // document.getElementById("menuButton").style.display = "initial"; trying to only make the button visible once start button is clicked
    start();
  });
  // document.getElementById("menuButton").addEventListener("click", () => {
  //   console.log("menu click");
  //   userInput();
  // });
  can.addEventListener("mousedown", (e) => {
    if (!allowDrag) {
      return;
    }
    let ballI = getBallIndex(e.clientX, e.clientY);
    if (ballI !== 0 && ballI !== balls.length - 1) {
      return;
    }
    ballDragged = balls[ballI];
    dragDirection = ballI ? 1 : -1;
  });
  can.addEventListener("mouseup", (e) => {
    if (ballDragged) {
      ballDragged = null;
      dragDirection = 0;
      allowDrag = false;
      startSwinging();
    }
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
    if (dragDirection < 0) {
      if (mouseAngle < 0) {
        mouseAngle = Math.PI / 2;
      }
    } else {
      if (mouseAngle > 0) {
        mouseAngle = -Math.PI / 2;
      }
    }
    setBallPosition(ballDragged, mouseAngle);

    // TO DO - inform model and view of temporary repositioning of ball
  });
}

export function userInput() {
  console.log("gathering input");
  // open menu box
  // handle the user input for ballNum, stringLength, ballRadius, and ballMass
  // using buttons with restrictions on min/max values
  // if mousedown to drag ball, close menu box
}
