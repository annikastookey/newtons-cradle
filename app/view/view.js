import { modelAspectRatio } from "../model/model.js";
import { ballNum } from "../model/model.js";
import { balls } from "../model/model.js";
let can;
let con;
export let shinyBall;

export function init() {
  console.log("initializing View");
  shinyBall = document.getElementById("shinyBall");
  document.getElementsByTagName("html")[0].style = "width: 100%; height: 100%;";
  document.body.style =
    "width: 100%; height: 100%; margin: 0; overflow: hidden;";
  can = document.createElement("canvas");
  con = can.getContext("2d");
  can.style = "position: absolute; top: 0; z-index: 1;";
  document.body.appendChild(can);
  window.onresize = resize;
  resize();
}

function resize() {
  let viewAspectRatio = innerWidth / innerHeight;
  // console.log(
  //   "resizing view",
  //   innerWidth,
  //   innerHeight,
  //   viewAspectRatio,
  //   modelAspectRatio
  // );
  if (viewAspectRatio > modelAspectRatio) {
    console.log("vAR > mAR");
    can.width = Math.floor(innerHeight * modelAspectRatio);
    can.style.left = Math.floor((innerWidth - can.width) / 2) + "px";
    can.height = innerHeight;
  } else {
    console.log("vAR < mAR");
    can.style.left = 0;
    can.width = innerWidth;
    can.height = innerHeight;
  }
}

export function run() {
  // console.log("running View");
  con.clearRect(0, 0, can.width, can.height);
  con.fillStyle = "black";
  con.fillRect(
    balls[0].anchorX - balls[0].ballRadius,
    0,
    2 * balls[0].ballRadius * balls.length,
    balls[0].anchorY
  );
  // con.fillRect(0, 0, can.width, can.height);
  for (let i = 0; i < ballNum; i++) {
    balls[i].draw(con);
  }
}
