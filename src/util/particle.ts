import {Effect} from "./effect";

export class Particle {
  effect: Effect;
  context: CanvasRenderingContext2D;
  x: number;
  y: number;
  constructor(effect: Effect) {
    this.effect = effect;
    this.context = this.effect.context;
    this.x = this.effect.width / 2;
    this.y = this.effect.height / 2;
  }

  update() {
    this.x += Math.random() * 2 - 1;
    this.y += Math.random() * 2 - 1;
  }

  draw() {
    this.context.beginPath();
    this.context.arc(this.x, this.y, 100,0, Math.PI * 2 / 3);
    this.context.stroke();
  }
}
