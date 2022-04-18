import { start } from "../app.js";

export function init() {
  console.log("initializing Controller");
  document.getElementById("startButton").addEventListener("click", () => {
    console.log("button click");
    document.getElementById("startButton").style.display = "none";
    start();
  });
}
