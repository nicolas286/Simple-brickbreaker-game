class LifeCounter {
 constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
 }


drawLifeCounter(remainingLives) 
{
    noFill();
    strokeWeight(2);
    stroke(255);
    rect(this.x, this.y, this.w, this.h);

    for (let i=0; i<remainingLives; i++) {
        noStroke();
        fill(255, 0, 0);
        ellipse(this.x + this.w/5 + i*this.w/5, this.y + this.h/2, 15, 15);
    }
}
}