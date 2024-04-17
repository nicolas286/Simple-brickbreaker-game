class PowerUp {
    constructor(x, y, w, h, powerUpType, ball, paddle) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.powerUpType = powerUpType;
        this.dx = 0;
        this.dy = 4;
        this.ball = ball;
        this.paddle = paddle;
        this.collide = false;
        this.powerUpUsed = false;
        this.newBall;

    }

drawPowerUp() {
    if (this.powerUpType == "bigBall") {
    fill(255, 0, 0);
    ellipse(this.x, this.y, 30, 30);
    }

    else if (this.powerUpType == "fastBall") {
      noFill();
      noStroke();
      image(fastBallImage, this.x, this.y, this.w, this.h);
      ellipse(this.x, this.y, 30, 30);
    }

    else if (this.powerUpType == "doubleBall") {
      fill(0, 255, 0);
      ellipse(this.x, this.y, 30, 30);
    }
}

movePowerUp(){
    this.x = this.x + this.dx;
    this.y = this.y + this.dy;
  }

collided(paddle){

    let distY = paddle.y - this.y;
    let distX = paddle.x - this.x;

    if (distY <= this.h && this.x >= paddle.x && this.x <= paddle.x + paddle.w && !this.powerUpUsed)
    {

      if (this.powerUpType == "bigBall")
      {
        ballArray.forEach((ball) => {
        this.bigBallEffect(ball);
        this.collide = true;});
      } 
      
      else if (this.powerUpType == "fastBall")
      {

        ballArray.forEach((ball) => {
          this.speedEffect(ball);
          this.collide = true;});

      }

      else if (this.powerUpType == "doubleBall")
      {
        this.doubleBall(ballArray[0]);
        this.collide = true;

      }


      this.powerUpUsed = true;



    } else if (this.y >= paddle.y)
    {
      this.powerUpUsed = true;
    }
    
  }

bigBallEffect(ball) {
    ballRadius += 5;
    ball.r += 5;
    timer(10000).then(() => { ballRadius -= 5; ball.r -= 5});
    }

speedEffect(ball) {
  ball.dx *= 2;
  ball.dy *= 2;
  timer(10000).then(() => { ball.dx /= 2; ball.dy /= 2});
}

doubleBall(ball) {
  this.newBall = new Ball(ball.x, ball.y, ballRadius);
  this.newBall.dx = ball.dx*-1;
  this.newBall.dy = ball.dy*-1;
  ballArray.push(this.newBall);

  timer(10000).then(() => { ballArray.pop();});
}

}

