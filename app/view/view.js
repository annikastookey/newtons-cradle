import { modelAspectRatio } from "../model/model.js";
let can;
let con;

export function init() {
  console.log("initializing View");
  document.getElementsByTagName("html")[0].style = "width: 100%; height: 100%;";
  document.body.style =
    "width: 100%; height: 100%; margin: 0; overflow: hidden;";
  can = document.createElement("canvas");
  con = can.getContext("2d");
  can.style = "position: absolute; top: 0;";
  document.body.appendChild(can);
  window.onresize = resize;
  resize();
}

function resize() {
  let viewAspectRatio = innerWidth / innerHeight;
  console.log(
    "resizing view",
    innerWidth,
    innerHeight,
    viewAspectRatio,
    modelAspectRatio
  );
  if (viewAspectRatio > modelAspectRatio) {
    console.log("vAR > mAR");
    can.width = Math.floor(innerHeight * modelAspectRatio);
    can.style.left = Math.floor((innerWidth - can.width) / 2) + "px";
    can.height = innerHeight;
  } else {
    console.log("vAR < mAR");
    can.height = Math.floor(innerWidth / modelAspectRatio);
    can.style.left = 0;
    can.width = innerWidth;
  }
}

export function run() {
  // console.log("running View");
  con.clearRect(0, 0, can.width, can.height);
  con.fillRect(0, 0, can.width, can.height);
}
