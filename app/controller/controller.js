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
let showingPanel = false;
let menuIcon;
let massSlider;
let radiusSlider;
let numberSlider;
let lengthSlider;

function getBallMass() {
  return Number(massSlider.value);
}

function getBallNum() {
  return Number(numberSlider.value);
}

function getBallRadius() {
  return Number(radiusSlider.value);
}

function getStringLength() {
  return Number(lengthSlider.value);
}

export function init() {
  console.log("initializing Controller");
  document.getElementById("startButton").addEventListener("click", () => {
    showingPanel = false;
    document.getElementById("menuPanel").style.display = "none";
    start(getStringLength(), getBallMass(), getBallRadius(), getBallNum());
  });
  menuIcon = document.getElementById("menuIcon");
  menuIcon.addEventListener("mouseenter", () => {
    if (!showingPanel) {
      menuIcon.classList.remove("menuIconUnhighlight");
      menuIcon.classList.add("menuIconHighlight");
    } else {
      menuIcon.classList.remove("menuIconHighlight");
      menuIcon.classList.add("menuIconUnhighlight");
    }
  });
  menuIcon.addEventListener("mouseleave", () => {
    if (!showingPanel) {
      menuIcon.classList.remove("menuIconHighlight");
      menuIcon.classList.add("menuIconUnhighlight");
    } else {
      menuIcon.classList.remove("menuIconUnhighlight");
      menuIcon.classList.add("menuIconHighlight");
    }
  });
  menuIcon.addEventListener("click", () => {
    if (!showingPanel) {
      console.log("menu button click");
      showingPanel = true;
      document.getElementById("menuPanel").style.display = "block";
    } else {
      showingPanel = false;
      document.getElementById("menuPanel").style.display = "none";
    }
  });
  initSliders();
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

function initSliders() {
  massSlider = document.getElementById("massSlider");
  massSlider.addEventListener("input", () => {
    console.log(massSlider.value);
  });
  radiusSlider = document.getElementById("radiusSlider");
  radiusSlider.addEventListener("input", () => {
    console.log(radiusSlider.value);
  });
  numberSlider = document.getElementById("numberSlider");
  numberSlider.addEventListener("input", () => {
    console.log(numberSlider.value);
  });
  lengthSlider = document.getElementById("lengthSlider");
  lengthSlider.addEventListener("input", () => {
    console.log(lengthSlider.value);
  });
}
