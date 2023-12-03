import {Particle} from "./particle";

interface FieldRowItem {
  angle: number
}
type FieldArr = FieldRowItem[][];


export class Effect {
  context: CanvasRenderingContext2D;
  width: number;
  height: number;
  particles: Particle[] = [];
  numOfParticles = 40;
  gap = 20;
  fieldArr: FieldArr = [];

  constructor(context: CanvasRenderingContext2D, width: number, height: number) {
    this.context = context;
    this.width = width;
    this.height = height;
  }

  init() {
    this.context.strokeStyle = 'yellow';
    this.context.fillStyle = 'black';
    // this.context.globalAlpha = 0.5;
    this.fieldArr = this.genFieldArr();
    this.particles = new Array(this.numOfParticles).fill('').map(_ => {
      return new Particle(this);
    });
  }

  genFieldArr(): FieldArr {
    let fieldArr = [];
    let angle = 0;
    let angleStep = 0.1;
    for (let y = 0; y < this.height; y += this.gap) {
      let row = [];
      for (let x = 0; x < this.width; x += this.gap) {
        row.push({
          angle,
        });
        angle += angleStep;
      }
      fieldArr.push(row);
    }
    return fieldArr;
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
