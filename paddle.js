class Paddle {
  constructor(x){
    this.x = x;
    this.y = height-40;
    this.w = 160;
    this.h = 30;
    this.paddleImage = paddleImage;
  }
  
  drawPaddle(){
    
    noFill();
    noStroke();
    image(this.paddleImage, this.x, this.y, this.w, this.h);
    rect(this.x, this.y, this.w, this.h);
  }
  
  hitPaddle(ball){
    let distY = (this.y - ball.y);
    
    if (distY <= ball.r && ball.x > this.x && ball.x < this.x + this.w )
      {
        ball.dy = ball.dy * -1;
        
        if (ball.x <= this.x + this.w/3)
          {
            if (ball.dx > 0)
              {
                ball.dx = ball.dx * -1;
              }
          } else if (ball.x >= this.x + 2/3 * this.w)
            {
          if (ball.dx < 0)
              {
                ball.dx = ball.dx * -1;
              }
            }

      } else if (ball.y >= this.y) {
        remainingLives--;
        gameStarted = false;
      }
      
  }

  checkBoundaries() {
    if (this.x <= brickWidth/2)
    {
      this.x = brickWidth/2;
    } 
    else if (this.x + this.w >= screenWidth - brickWidth/2)
    {
      this.x = screenWidth - brickWidth/2 - this.w;
    }
  }
  

  
}