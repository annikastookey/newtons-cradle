import { shinyBall } from "../view/view.js";

const metalClick = new Audio("./app/model/click.mp3");

export class Ball {
  constructor(
    anchorX,
    anchorY,
    stringLength,
    startingAngle,
    ballMass,
    ballRadius
  ) {
    this.anchorX = anchorX;
    this.anchorY = anchorY;
    this.stringLength = stringLength;
    this.angle = startingAngle;
    this.ballMass = ballMass;
    this.ballRadius = ballRadius;
    this.angularVelocity = 0;
    this.angularAcceleration = 0.000001;
  }

  draw(con) {
    this.con = con;
    this.con.strokeStyle = "rgb(50, 50, 50)";
    con.translate(this.anchorX, this.anchorY);
    con.rotate(this.angle);
    con.beginPath();
    con.moveTo(0, 0);
    con.lineTo(this.stringLength, 0);
    con.stroke();
    con.translate(this.stringLength, 0);
    con.rotate(-this.angle);
    con.drawImage(
      shinyBall,
      -this.ballRadius,
      -this.ballRadius,
      2 * this.ballRadius,
      2 * this.ballRadius
    );
    con.rotate(this.angle);
    // con.beginPath();
    // con.arc(this.stringLength, 0, this.ballRadius, 0, 2 * Math.PI);
    con.translate(-this.stringLength, 0);
    con.rotate(-this.angle);
    con.translate(-this.anchorX, -this.anchorY);
    // con.stroke();
  }
  playClick() {
    metalClick.play();
  }
  update(timeChange) {
    this.timeChange = timeChange;
    this.angularVelocity +=
      this.angularAcceleration * Math.cos(this.angle) * timeChange;
    this.angle += this.angularVelocity * timeChange;
    if (this.angle < 0) {
      this.angle = 0;
      this.angularVelocity *= -1;
    } else if (this.angle > Math.PI) {
      this.angle = Math.PI;
      this.angularVelocity *= -1;
    }
  }
  updateBallRadius(anchorX, anchorY, ballRadius) {
    this.anchorX = anchorX;
    this.anchorY = anchorY;
    this.ballRadius = ballRadius;
  }
  updateStringLength(anchorX, stringLength) {
    this.anchorX = anchorX;
    this.stringLength = stringLength;
  }
}
