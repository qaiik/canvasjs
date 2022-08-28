const globals = {
  sprites: 0,
  spriteList: []
}

class Sprite {
  constructor(dictionary) {
    Object.assign(this, dictionary)
    this.id = globals.sprites;
    globals.sprites++;
  }
}

class Canvas {
  init(parent = document.body, width, height, extraStyle) {
    this.sprites = []
    this.canvas = document.createElement("canvas");
    parent.appendChild(this.canvas)
    this.canvas.width = width;
    this.canvas.height = height;
    this.canvas.style = extraStyle;
    this.ctx = document.querySelector("canvas").getContext("2d")

  }

  Tick(canvas) {
    globals.spriteList.forEach(function(sprite) {
      canvas.ctx[sprite.d.type](sprite.d.x, sprite.d.y, ...sprite.d.args)
    })
  }

  start() {
    setInterval(() => {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
      this.Tick(this)
    })
  }

  color(color) {
    this.ctx.fillStyle = color;
  }
  
  colorStroke(color) {
    this.ctx.strokeStyle = color;
  }

  add(sprite) {
    globals.spriteList.push(new Proxy({
      d: 0
    }, {
      get() {
        return sprite
      }
    }))
  }

  on(event, callback) {
    const br = this.canvas.getBoundingClientRect();
    this.canvas.addEventListener(event, e => {
      callback(e.clientX - br.x, e.clientY - br.y)
    })
  }
  remove(spriteid) {
    globals.spriteList = globals.spriteList.filter(s => s.id !== spriteid)
  }
}

function Tick(canvas) {
  globals.spriteList.forEach(function(sprite) {
    canvas.ctx[sprite.d.type](sprite.d.x, sprite.d.y, ...sprite.d.args)
  })
}
