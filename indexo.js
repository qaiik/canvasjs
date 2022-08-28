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
  init(parent=document.body, width, height, extraStyle) {
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
        canvas.ctx[sprite.type](sprite.x, sprite.y, ...sprite.args)
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
  
  add(sprite) {
    globals.spriteList.push(sprite)
  }
  
  remove(spriteid) {
    globals.spriteList = globals.spriteList.filter(s => s.id !== spriteid)
  }
}

function Tick(canvas) {
  globals.spriteList.forEach(function(sprite) {
      canvas.ctx[sprite.type](sprite.x, sprite.y, ...sprite.args)
  })
}
