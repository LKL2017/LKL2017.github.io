import {Effect} from "./effect";

export class Particle {
  effect: Effect;
  context: CanvasRenderingContext2D;
  x: number;
  y: number;
  points: { x: number, y: number }[];
  maxLength: number;
  constructor(effect: Effect) {
    this.effect = effect;
    this.context = this.effect.context;
    this.x = this.effect.width * Math.random();
    this.y = this.effect.height * Math.random();
    this.points = [];
    this.maxLength = 15;
  }

  getCurrentRad() {
    const gap = this.effect.gap;
    const yIndex = Math.floor(this.y / gap);
    const xIndex = Math.floor(this.x / gap);
    const cell = this.effect.fieldArr[yIndex][xIndex];
    return cell.angle *  Math.PI / 180;
  }

  update() {
    // calc next position
    const rad = this.getCurrentRad();
    const deltaX = Math.cos(rad);
    const deltaY = Math.sin(rad);
    const newX = this.x + 10 * deltaX;
    const newY = this.y + 10 * deltaY;

    // check validation
    if (newX > this.effect.width || newX < 0 || newY > this.effect.height || newY < 0) {
      this.points.shift();
      if (this.points.length === 0) {
        this.x = this.effect.width * Math.random();
        this.y = this.effect.height * Math.random();
      }
      return;
    }

    // update 'trail' arr
    if (this.points.length >= this.maxLength) {
      this.points.shift();
    }
    this.points.push({x: newX, y: newY});

    // update x y
    this.x = newX;
    this.y = newY;
  }

  draw() {
    this.context.lineWidth = 2;
    this.context.beginPath();

    for (let i = 0; i < this.points.length; i++) {
      const point = this.points[i];
      if (i === 0) {
        this.context.moveTo(point.x, point.y);
      } else {
        this.context.lineTo(point.x, point.y);
      }
    }
    this.context.stroke();
  }
}
