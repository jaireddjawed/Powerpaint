export default class Line {
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

  draw = () => {
    this.ctx.beginPath();
    this.ctx.moveTo(this.startX, this.startY);
    this.ctx.lineTo(this.endX, this.endY);
    this.ctx.strokeStyle = this.color;
    this.ctx.stroke();
  }
}
