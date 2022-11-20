let game = document.getElementById('game');
let timer = 0;
let imgShip, imgGift, imgRocket, franchise, enemie;
let skills = ['I LOVE', 'TO', 'CODE'];
let enemyKilled = [];


function setup() {
  var myCanvas = createCanvas(game.clientWidth, game.clientHeight);
  myCanvas.parent('game');

  my_ship = new Ship(width/2, height - 30);

  
  if (width < 321){
    enemie = new Enemy(0, 60, width/6, skills);
    enemie.createNew(3);
    textSize(width/7);
  } else if (width > 321){
    enemie = new Enemy(0, 40, width/6, skills);
    enemie.createNew(3);
    textSize(width/7);
  }
  textFont(franchise);
}

function mousePressed(){
  my_ship.move();
}

function draw() {
  background('#ffb703');

  my_ship.show();
  my_ship.shot();

  if (enemie.enemies.length > 0){
    let myEnemy = enemie.enemies; 
    if (my_ship.bullets.length > 0){
      my_ship.bullets.forEach(element => {
        element.show();
        element.move();
        for (let i = 0; i < myEnemy.length; i++){
          element.checkCollision(myEnemy[i].x,
            myEnemy[i].y);
          if (element.colliding == true){
            enemie.enemies[i].beenHit = true;
            enemie.enemies[i].show();
            enemie.enemies.splice(i,1);
          }
        }
      });
    }
  }

  if (enemie.enemies.length > 0){
    enemie.enemies.forEach(element => {
    element.show();
    })
  }
  if (enemyKilled.length > 0 ){
    enemyKilled.forEach(element => {
      element.show()
    })
  }
}
