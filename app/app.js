import * as model from "./model/model.js";
import * as view from "./view/view.js";

function loop(timeNow) {
  let timePrior = timeNow;
  requestAnimationFrame(_loop);

  function _loop(timeNow) {
    let timeChange = timeNow - timePrior;
    model.run(timeChange);
    view.run();
    timePrior = timeNow;
    requestAnimationFrame(_loop);
  }
}

export function run() {
  console.log("running App");
  model.init(200, 1, 50, 5);
  view.init();
  requestAnimationFrame(loop);
}
