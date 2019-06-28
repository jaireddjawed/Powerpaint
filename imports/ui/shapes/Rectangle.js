export default class Rectangle {
  constructor(startX, startY, endX, endY) {
    this.startX = startX;
    this.startY = startY;
    this.endX = endX;
    this.endY = endY;
  }

  setContext = (ctx) => {
    this.ctx = ctx;
  }

  setColor = (color) => {
    this.color = color;
  }

  setStrokeOrFilled = (isFilled) => {
    this.isFilled = isFilled;
  }

  draw = () => {
    const width = this.endX - this.startX;
    const height = this.endY - this.startY;

    this.ctx.beginPath();
    this.ctx.rect(this.startX, this.startY, width, height);
    this.ctx.closePath();

    // fill the rectangle with the entire color if isFilling, otherwise just stroke it
    if (this.isFilled) {
      this.ctx.fillStyle = this.color;
      this.ctx.fill();
    } else {
      this.ctx.strokeStyle = this.color;
      this.ctx.stroke();
    }
  }
}
