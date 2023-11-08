const canvas = document.querySelector('#scene');
const ctx = canvas.getContext('2d', { willReadFrequently: true});
const section = document.querySelector('.container > section:nth-child(2)');
const rect = section.getBoundingClientRect();
canvas.width = rect.width;
canvas.height = rect.height;

class Particle {
  constructor(effect) {
    this.effect = effect;
    this.context = effect.context;
    this.gap = effect.gap;

    this.x = Math.random() * this.effect.width;
    this.y = 0;
    this.size = Math.random() * 0.5 + 1;

    this.vy = Math.random() * 2;

    this.color = 'white';
  }

  get cell() {
    const rowIndex = Math.floor(this.x / this.gap);
    const colIndex = Math.floor(this.y / this.gap);
    return this.effect.field[colIndex][rowIndex];
  }

  update() {
    if (this.y >= this.effect.height) {
      this.x = Math.random() * this.effect.width;
      this.y = 0;
    }

    this.color = this.cell.color;
    this.y += this.vy + 2.5 - this.cell.brightness;
  }

  draw() {
    this.context.beginPath();
    this.context.fillStyle = this.color;
    this.context.globalAlpha = 1;

    this.context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    this.context.fill();
  }

  reset() {
    this.x = Math.random() * this.effect.width;
    this.y = 0;
  }
}

class Effect {
  constructor(context, width, height) {
    this.context = context;
    this.width = width;
    this.height = height;
    this.gap = 1;

    this.field = [];

    this.numsOfParticles = 500;
    this.particles = [];

    this.pokemons = [];
    this.pokemonIndex = 0;
  }

  async initField() {
    await this.drawBackground();

    const pixelData = ctx.getImageData(0, 0, this.width, this.height).data;
    this.context.clearRect(0, 0, this.width, this.height);

    let grid = [];
    for (let y = 0; y < this.height; y += this.gap) {
      let row = [];
      for (let x = 0; x < this.width; x += this.gap) {
        const pixelIndex = (y * this.width + x) * 4;
        const red = pixelData[pixelIndex];
        const green = pixelData[pixelIndex + 1];
        const blue = pixelData[pixelIndex + 2];
        const cell = {
          color: `rgb(${red},${green},${blue})`,
          brightness: this.getRelatedBrightness(red, green, blue)
        }
        row.push(cell);
      }
      grid.push(row);
    }
    this.field = grid;
  }

  async drawBackground() {
    if (!this.pokemons.length) {
      this.pokemons = await this.initPokemons();
    }

    const currentPokemon = this.pokemons[this.pokemonIndex % this.pokemons.length];
    ctx.drawImage(currentPokemon, this.width / 2 - currentPokemon.width / 2, this.height / 2 - currentPokemon.height / 2)
  }

  initPokemons () {
    const promises = ['assets/images/1.png', 'assets/images/6.png'].map(src => {
      return new Promise(resolve => {
        const sprite = new Image();
        sprite.src = src;
        sprite.onload = () => resolve(sprite)
      })
    })

    return Promise.all(promises);
  }

  initParticles() {
    this.particles = new Array(this.numsOfParticles).fill('').map(_ => new Particle(this));
  }

  getRelatedBrightness(r, g, b) {
    return Math.sqrt(0.299 * r * r + 0.587 * g * g + 0.114 * b * b) / 100;
  }

  render() {
    this.particles.forEach(p => {
      p.update();
      p.draw();
    })
  }

  reset() {
    this.context.clearRect(0, 0, this.width, this.height);
    this.pokemonIndex++;
    this.particles.forEach(p => p.reset())
  }
}

const effect = new Effect(ctx, canvas.width, canvas.height);
effect.initParticles();

let isRun = true;
function animate() {
  if (!isRun) return;
  // ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.globalAlpha = 0.02;
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  effect.render();
  requestAnimationFrame(animate);
}

window.addEventListener('resize', () => {
  const rect = document.querySelector('.container > section').getBoundingClientRect();
  canvas.width = rect.width;
  canvas.height = rect.height;
})

section.addEventListener('mouseenter', () => {
  console.log('mouse enter');
  isRun = true;
  effect.initField().then(_ => animate());
})

section.addEventListener('mouseout', () => {
  console.log('mouse out')
  isRun = false;
  effect.reset();
})




