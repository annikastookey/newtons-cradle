import { Model } from "./model/model.js";
import { View } from "./view/view.js";
import { Controller } from "./controller/controller.js";

export class App {
  constructor() {
    console.log("constructing app");
    this.model = new Model();
    this.view = new View();
    this.controller = new Controller();
    this.run();
  }
  run() {
    let timePrior = 0;
    requestAnimationFrame(loop.bind(this));
    function loop(timeNow) {
      let timeChange = timeNow - timePrior;
      this.model.run(timeChange);
      this.view.run();
      timePrior = timeNow;
      requestAnimationFrame(loop.bind(this));
    }
  }
}
