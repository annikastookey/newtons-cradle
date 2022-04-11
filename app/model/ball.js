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
    console.log(this.stringLength);
    this.angle = startingAngle;
    console.log(this.angle);
    this.ballMass = ballMass;
    this.ballRadius = ballRadius;
    this.angularVelocity = 0;
    this.angularAcceleration = 0.000001;
  }
  draw(con) {
    this.con = con;
    this.con.strokestyle = "blue";
    con.translate(this.anchorX, this.anchorY);
    con.fillRect(-10, -10, 20, 20);
    con.rotate(this.angle);
    con.beginPath();
    con.moveTo(0, 0);
    con.lineTo(this.stringLength, 0);
    con.stroke();
    con.beginPath();
    con.arc(this.stringLength, 0, this.ballRadius, 0, 2 * Math.PI);
    con.rotate(-this.angle);
    con.translate(-this.anchorX, -this.anchorY);
    con.stroke();
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
}
