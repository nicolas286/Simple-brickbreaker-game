let bricks = [];
let leftBorderBricks = [];
let rightBorderBricks = [];
let upperBorderBricks = [];
let cols = 9;
let brickOffset = 0;
let rows;
let brickType;
let solidBrickPercentage = 10;
let unbreakablePercentage = 5;
let brickDice = 0;
let powerUpPercentage = 25;
let remainingLives = 3;

let screenWidth = 1440;
let screenHeight = 900;

let brickHeight = 55;
let brickWidth = 150;
let ballRadius = 15;

let bg;
let ballImage;
let woodBrickImage1;
let woodBrickImage2;
let woodBrickImage3;
let redBrickImage1;
let redBrickImage1Broken;
let paddleImage;
let borderBrickImage;
let fastBallImage;


let ballArray = [];
let paddle;
let lifeCounter;
let gameStarted = false;


function preload() {
  ballImage = loadImage('images/ball.png');
  woodBrickImage1 = loadImage('images/planche1.png');
  woodBrickImage2 = loadImage('images/planche2.png');
  woodBrickImage3 = loadImage('images/planche3.png');
  redBrickImage1 = loadImage('images/brique1.png');
  redBrickImage1Broken = loadImage('images/brique1cassee.png');
  paddleImage = loadImage('images/paddle.png');
  borderBrickImage = loadImage('images/borderbrick.png');
  unbreakableImage = loadImage('images/unbreakable.png');
  fastBallImage = loadImage('images/speedPowerUp.png');
}

function timer(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function setup() {
  bg = loadImage('images/background1.jpg');
  createCanvas(screenWidth, screenHeight);
  rows = random(5, 10);


  for (let i=0; i<height/brickHeight; i++)
    {
      leftBorderBricks[i] = new BorderBrick(0, i*brickHeight, brickWidth/2, brickHeight);
      rightBorderBricks[i] = new BorderBrick(width-brickWidth/2, i*brickHeight, brickWidth/2, brickHeight);
    }

    for (let i=0; i<width/brickWidth; i++)
    {
      upperBorderBricks[i] = new BorderBrick(i*brickWidth, 0, brickWidth, brickHeight);
    }
  
  for (let i=1; i<cols; i++)
    {
      bricks[i] = [];
      for (let j=0; j<rows; j++)
        {
          
          if (random(100) <= solidBrickPercentage)
            {
              brickType = "solidBrick";
            }
          else if (random(100) <= unbreakablePercentage)
          {
            brickType = "unbreakable";
          } 
          else {
            brickType = "normalBrick";
          }
          

          
          bricks[i][j] = new Brick((i*brickWidth - brickWidth/5) + brickOffset/2, (j*brickHeight + brickHeight*2), brickWidth - brickOffset, brickHeight - brickOffset, brickType);
          bricks[i][j].definePowerUp(powerUpPercentage);


        }
    }
  

  paddle = new Paddle(mouseX);
  startBall = new Ball(paddle.x + paddle.w/2, paddle.y - ballRadius*2, ballRadius);
  ballArray.push(startBall);
  lifeCounter = new LifeCounter(screenWidth - 100, 10, 90, 30);

}

function draw() {
  background(bg);
  paddle.x = mouseX;

  for (let i=0; i<height/brickHeight; i++)
    {
      leftBorderBricks[i].drawBorders();      
      rightBorderBricks[i].drawBorders();
    }

  for (let i=0; i<width/brickWidth; i++)
    {
      upperBorderBricks[i].drawBorders();
    }

  for (let i=1; i<cols; i++) {
    for (let j=0; j<rows; j++) {
      
      if (bricks[i][j].hp > 0)
      {
      bricks[i][j].selectImage();
      bricks[i][j].drawBrick();


      ballArray.forEach((ball) => {
      bricks[i][j].collided(ball);});

      }
        
      if (bricks[i][j].hasPowerUp && bricks[i][j].collide && !bricks[i][j].powerUp.powerUpUsed && bricks[i][j].hp < 1)
      {
        bricks[i][j].powerUp.drawPowerUp();
        bricks[i][j].powerUp.movePowerUp();
        bricks[i][j].powerUp.collided(paddle);
      }
  
    }
  }


  ballArray.forEach((ball) => {
    ball.drawBall();
    ball.checkBoundaries(ball);
    paddle.hitPaddle(ball);

    if (gameStarted)
    {
      ball.moveBall();
    }
    else {
      ball.x = paddle.x + paddle.w/2;
      ball.y = paddle.y - ballRadius*2;
    }
  });

  paddle.checkBoundaries();
  paddle.drawPaddle();
  lifeCounter.drawLifeCounter(remainingLives);
 


  if (remainingLives < 0)
  {
    fill(0, 0, 0);
    rect(0, 0, screenWidth, screenHeight);
    fill(255);
    textSize(25);
    textAlign(CENTER);
    text("Game Over", screenWidth/2, screenHeight/2);
    text("Click anywhere to retry", screenWidth/2, screenHeight/2 + 20);
  }

}

  function mouseClicked() {
    if (remainingLives >= 0) {
    gameStarted = true; 
  }
    else if (remainingLives < 0) {
      reset();
      setup();
    }
  }

  function reset() {
    remainingLives = 3;
    ballRadius = 15;
    ballArray = [];
    startBall = new Ball(paddle.x + paddle.w/2, paddle.y - ballRadius*2, ballRadius);
    ballArray.push(startBall);
  }
  