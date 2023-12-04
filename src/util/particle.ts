import {Effect} from "./effect";

export class Particle {
  effect: Effect;
  context: CanvasRenderingContext2D;
  originX: number;
  originY: number;
  x: number;
  y: number;
  rad: number;
  points: { x: number, y: number }[];
  maxLength: number;
  ratio: number;
  constructor(effect: Effect) {
    this.effect = effect;
    this.context = this.effect.context;
    this.originX = this.effect.width * Math.random();
    this.originY = this.effect.height * Math.random();
    this.x = this.originX;
    this.y = this.originY;
    this.rad = this.getCurrentRad();
    this.points = [];
    this.maxLength = 40;
    this.ratio = this.getRatio();
  }

  getCurrentRad() {
    const gap = this.effect.gap;
    const yIndex = Math.floor(this.y / gap);
    const xIndex = Math.floor(this.x / gap);
    const cell = this.effect.fieldArr[yIndex][xIndex];
    return cell.angle *  Math.PI / 180;
  }

  getRatio() {
    const base = 3;
    const upperRatio = Math.random() * base + base;
    const lowerRatio = Math.random() * base * -1 - base;
    return Math.random() > 0.5 ? upperRatio : lowerRatio;
  }

  update() {
    // calc next position
    // const rad = this.getCurrentRad();
    this.rad += Math.PI / 180;
    const deltaX = Math.cos(this.rad);
    const deltaY = Math.sin(this.rad);
    const newX = this.x + this.ratio * deltaX;
    const newY = this.y + this.ratio * deltaY;

    // check validation
    if (newX > this.effect.width || newX < 0 || newY > this.effect.height || newY < 0) {
      this.points.shift();
      if (this.points.length === 0) {
        this.x = this.originX;
        this.y = this.originY;
        this.rad = this.getCurrentRad();
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

    // set style
    this.context.lineWidth = 4;
    this.context.strokeStyle = 'yellow';
  }

  draw() {
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
