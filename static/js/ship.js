class Ship {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.bullets = [];
    this.size = 20
    this.shootingMode = false;
  }

  show() {
    image(imgShip, this.x, this.y);
    //fill(51);
    //square(this.x, this.y, this.size);
  }

  shot() {
    if (mouseX > 0 && mouseY > 0
      && mouseX < width && mouseY < height){
      this.shootingMode = true;
    }
    if (!this.shootingMode) { return }
    if (millis() >= 1000 + timer) {
    let bullet = new Bullet(this.x, this.y);
    this.bullets.push(bullet)
    timer = millis();
    }
    if (this.bullets.length > 3){
      this.bullets.shift()
    }
  }

  move() {
    if (mouseY <= 0 || mouseY > height
      || mouseX > width || mouseX < 0) { return; }
    
    if (this.x > game.clientWidth - this.size) {
      this.x -= 40;
      return;
    };

    if (this.x < (game.clientWidth - game.clientWidth)) {
      this.x += 40;
      return;
    };

    if (mouseX > 0 && mouseX < (game.clientWidth / 2)) {
      if (width>400){
        this.x -= 30;
      }
      this.x -= 10;
      
    } else if (mouseX > (game.clientWidth / 2)
      && mouseX < game.clientWidth) {
        if (width>400){
          this.x += 30;
        }
      this.x += 10;
    };
  }
}
//***************************************************
class Bullet {

  constructor(tempX, tempY) {
    this.x = tempX;
    this.y = tempY;
    this.size = 15;
    this.colliding = false;
  }
  show() {
    image(imgRocket, this.x, this.y);

    //fill('red');
    //noStroke();
    //square(this.x, this.y, this.size);
  }
  move() {
    this.y -= 2.4;
  }

  checkCollision(xpos, ypos){
    let d = dist(this.x, this.y, xpos, ypos);
    if (d < this.size){
      //console.log("hit");
      this.colliding = true;
    } else {this.colliding = false};
  }
}