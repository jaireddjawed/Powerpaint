export default class Circle {
  constructor(startX, startY, endX, endY) {
    this.startX = startX;
    this.startY = startY;
    this.endX = endX;
    this.endY = endY;
  }

  setContext = ctx => {
    this.ctx = ctx;
  }

  setColor = color => {
    this.color = color;
  }

  setStrokeOrFill = isFilled => {
    this.isFilled = isFilled;
  }

  draw = () => {
    const distanceX = (this.endX - this.startX) ** 2;
    const distanceY = (this.endY - this.startY) ** 2;
    const radius = Math.sqrt(distanceX + distanceY);

    this.ctx.beginPath();
    this.ctx.arc(this.startX, this.startY, radius, 0, 2 * Math.PI);
    this.ctx.closePath();

    // fill the rectangle with the entire color if isFilled, otherwise just stroke it
    if (this.isFilled) {
      this.ctx.fillStyle = this.color;
      this.ctx.fill();
    } else {
      this.ctx.strokeStyle = this.color;
      this.ctx.stroke();
    }
  }
}
