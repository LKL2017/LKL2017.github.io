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
  numOfParticles = 100;
  gap = 40;
  fieldArr: FieldArr = [];

  constructor(context: CanvasRenderingContext2D, width: number, height: number) {
    this.context = context;
    this.width = width;
    this.height = height;
  }

  init() {
    this.setInitStyle();
    this.fieldArr = this.genFieldArr();
    this.particles = new Array(this.numOfParticles).fill('').map(_ => {
      return new Particle(this);
    });
  }

  genFieldArr(): FieldArr {
    let fieldArr = [];
    let angle = 0;
    let angleStep = 0.2;
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

  setInitStyle() {
    this.context.globalAlpha = 0.05;
    this.context.fillStyle = 'black';
    this.context.lineWidth = 2;

    const g = this.context.createLinearGradient(0,0 , this.width, this.height);
    g.addColorStop(0.2, '#3ca7e8');
    g.addColorStop(0.5, '#65d9d9');
    g.addColorStop(0.8, '#c7d9d9');

    this.context.strokeStyle = g;
  }

  update() {
    this.particles.forEach(p => {
      p.update();
    })
  }

  render() {
    this.context.fillRect(0, 0, this.width, this.height);

    this.particles.forEach(p => {
      p.draw();
    })
  }

  resize(width: number, height: number) {
    // clear before assignment
    this.context.clearRect(0, 0, this.width, this.height);
    this.width = width;
    this.height = height;
    if (this.width > 1200) {
      this.numOfParticles = 140;
    } else if (this.width > 600) {
      this.numOfParticles = 80;
    } else {
      this.numOfParticles = 30;
    }
    this.init();
  }

}
