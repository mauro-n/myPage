
/* const enemy = new Enemy(1,100,20,palavras);
    if (enemies.length > 0){
        for (let i = 0; i < enemies.length; i++){
            enemies[i].draw()
            //console.log(enemies)
        }
    }

 */
const data = {
    palavras: ['arroz', 'feijao', 'macarrao'],
    bullets: [],
    enemies: [],
}

function main(data) {
    //game images
    const images = document.querySelectorAll('.gameImg');
    const [shipImg, enemyImg, bulletImg] = images;

    //setting up canvas
    let raf;
    const canvas = document.querySelector('#stage');
    canvas.width = document.querySelector('body').clientWidth - 50;
    canvas.height = document.querySelector('html').clientHeight - 50;
    const ctx = canvas.getContext('2d');

    //adding enemies
    const enemy = new Enemy(100, 60, data.palavras, enemyImg);
    enemy.populate(10, canvas);

    //adding ship
    let shipSize = 40;
    const ship = new Ship(shipSize, shipImg,
        canvas.width / 2,
        canvas.height - (shipSize * 2));

    //adding events
    canvas.addEventListener('click', (e) => {
        if (e.clientX > canvas.width / 2) { ship.moveRight(canvas) }
        if (e.clientX < canvas.width / 2) { ship.moveLeft(canvas) }
        const bullet = new Bullet(ship.x, ship.y, bulletImg)
        data.bullets.push(bullet);
    });

    //draw loop
    function loop() {
        //clear
        ctx.fillStyle = 'rgba(255, 255, 255)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        //ship&&enemy
        ship.draw(ctx);
        enemy.draw(ctx)
        //shooting%%collision
        if (data.bullets.length > 0 && ship.isShooting == true) {
            for (let i = 0; i < data.bullets.length; i++) {
                for (let b = 0; b < enemy.enemies.length; b++) {
                    if (enemy.enemies[b].beenHit == true) {
                    } else
                        if (data.bullets[i].boxCollision(data.bullets[i], enemy.enemies[b])) {
                            enemy.enemies[b].beenHit = true;
                        }
                }
                data.bullets[i].draw(ctx)
                data.bullets[i].move()
            }
        }
        //request next frame
        raf = window.requestAnimationFrame(loop);
    }
    loop()
};

window.onload = function () {
    main(data);
}


