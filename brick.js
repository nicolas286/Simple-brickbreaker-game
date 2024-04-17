class Brick {
  constructor(x, y, w, h, brickType) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.brickType = brickType;
    this.collide = false;
    this.selectedImage = woodBrickImage1;
    this.hasPowerUp = false;
    this.powerUpType;
    this.powerUp;

    if (random(0, 100) <= 33)
    {
      this.powerUpType = "fastBall"
    }
    else if (random(0, 100) <= 66)
    {
      this.powerUpType = "bigBall"
    }
    else
    {
      this.powerUpType = "doubleBall";
    }


    if(this.brickType == "solidBrick"){
     this.hp = 2;
    } else {
    this.hp = 1;
    }
  }

  selectImage() {
    let imageSelector = random(0, 100);

    if (this.brickType == "solidBrick")
    {
      this.selectedImage = redBrickImage1;

      if (this.hp < 2)
      {
        this.selectedImage = redBrickImage1Broken;
      }
    }
    else if (this.brickType == "unbreakable")
    {
      this.selectedImage = unbreakableImage;
    }
    else 
    {
      if (imageSelector <= 33)
      {
        this.selectedImage = woodBrickImage1;
      }
      else if (imageSelector <= 66)
      {
        this.selectedImage = woodBrickImage2;
      }
      else 
      {
        this.selectedImage = woodBrickImage3;
      }
    }
    }

  definePowerUp(powerUpPercentage) {
    let powerUpOrNot= random(0, 100);

    if (powerUpOrNot<= powerUpPercentage) {
      this.hasPowerUp = true;
    }
  }
  
  drawBrick() {
   
    image(this.selectedImage, this.x, this.y, this.w, this.h);
    noFill();
    noStroke();
    rect(this.x, this.y, this.w, this.h);
  }
  
  collided(ball){
    let closeX = ball.x;
    let closeY = ball.y;
    
    if (ball.x > this.x + this.w){
      closeX = this.x + this.w;
    } else if (ball.x < this.x) {
      closeX = this.x;
    }
    
    if (ball.y > this.y + this.h){
      closeY = this.y + this.h;
    } else if (ball.y < this.y) {
      closeY = this.y;
    }
    
    let distance = dist(closeX, closeY, ball.x, ball.y);
    
    if (distance <= ball.r) {

      this.collide = true;
      this.selectImage();
      ball.dy = ball.dy * -1;
      this.powerUp = new PowerUp(this.x, this.y, 30, 30, this.powerUpType, ball, paddle);


      if (this.brickType !== "unbreakable")
      {
        this.hp--;
      }

    }
    
    else {
      this.collide = false;
    }
    
  }
}
