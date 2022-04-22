import { start } from "../app.js";
import { can } from "../view/view.js";
import { getBallIndex } from "../model/model.js";
import { balls } from "../model/model.js";
import { moveBall } from "../model/model.js";

let isDragging = false;

export function init() {
  console.log("initializing Controller");
  document.getElementById("startButton").addEventListener("click", () => {
    console.log("button click");
    document.getElementById("startButton").style.display = "none";
    start();
  });
  can.addEventListener("mousedown", (e) => {
    let ball = getBallIndex(e.clientX, e.clientY);
    if (ball !== 0) {
      return;
    }
    isDragging = true;
  });
  can.addEventListener("mouseup", () => {
    if (isDragging) {
      // TO DO - handle release of ball
      // ie. start the animation with ball in this position
    }
    isDragging = false;
  });
  can.addEventListener("mousemove", (e) => {
    if (!isDragging) {
      return;
    }
    // TO DO - inform model and view of temporary repositioning of ball
  })
}
