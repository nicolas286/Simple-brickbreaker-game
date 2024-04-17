let startXSpeed = [-2, -1, 1, 2];

class Ball {
  constructor(x, y, r){
    this.x = x;
    this.y = y;
    this.r = r;
    this.dx = random(startXSpeed);
    this.dy = 4;
    this.ballImage = ballImage;
  }
  
  drawBall() {
    image(this.ballImage, this.x, this.y, this.r*2, this.r*2);
    noFill();
    noStroke();
    ellipse(this.x, this.y, this.r*2, this.r*2);
  }
  
  moveBall(){
    this.x = this.x + this.dx;
    this.y = this.y + this.dy;
  }
  
  checkBoundaries(ball) {
    if (ball.x >= width-brickWidth/2 || ball.x <= brickWidth/2)
      {
        ball.dx *= -1;
      } 
      else if (ball.y <= brickHeight) 
      {
        ball.dy *= -1;
      }
      else if (ball.y >= screenHeight)
      {
        remainingLives--;
      }
      
  }

  

}