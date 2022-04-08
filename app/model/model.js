let balls;
let stringLength;
let ballMass;
let ballDiam;
let ballNum;
let modelWidth;
let modelHeight;
export let modelAspectRatio;

export function init(_stringLength, _ballMass, _ballDiam, _ballNum) {
  console.log("initializing Model");
  stringLength = _stringLength;
  ballMass = _ballMass;
  ballDiam = _ballDiam;
  ballNum = _ballNum;
  modelWidth = 2 * stringLength + ballNum * ballDiam;
  modelHeight = stringLength + ballDiam;
  modelAspectRatio = modelWidth/modelHeight;
  //TODO
}

export function run(timeChange) {
  //TO DO
}
