class BorderBrick {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.collide = false;
    this.borderBrickImage = borderBrickImage;
  }
  
  drawBorders() {
    noFill();
    noStroke();
    image(this.borderBrickImage, this.x, this.y, this.w, this.h);
    rect(this.x, this.y, this.w, this.h);
  }
  
}

