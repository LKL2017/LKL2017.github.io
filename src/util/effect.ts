import {Particle} from "./particle";

export class Effect {
  context: CanvasRenderingContext2D;
  width: number;
  height: number;
  particles: Particle[] = [];
  numOfParticles = 1;

  constructor(context: CanvasRenderingContext2D, width: number, height: number) {
    this.context = context;
    this.width = width;
    this.height = height;
  }

  init() {
    this.context.strokeStyle = 'yellow';
    this.context.fillStyle = 'black';
    this.context.globalAlpha = 0.5;
    this.particles = new Array(this.numOfParticles).fill(new Particle(this));
  }

  update() {
    this.context.fillRect(0, 0, this.width, this.height);
    this.particles.forEach(p => {
      p.update();
    })
  }

  render() {
    this.particles.forEach(p => {
      p.draw();
    })
  }

}
