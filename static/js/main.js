//SCROLL BUTTON SCRIPT
const scroll_btn = document.querySelector('#scroll-btn');
const lPainel = document.querySelector('#left-painel');
const scrollHeight = lPainel.clientHeight;

scroll_btn.addEventListener('click', () => {
    window.scroll({
        top: scrollHeight + 20,
        behavior: 'smooth'
    });
});
// ************************

const startGame = document.querySelector('#start-game');

startGame.addEventListener('click', () => {
    console.log('starting game');
    setTimeout(() => {
        gameStart();    
    }, 1000)
    gameStart();
    startGame.style.display = "none";
})


// GAME SCRIPT
const gameStart = () => {
    //class ship
    class Ship {
        constructor() {
            const image = document.createElement('img');
            image.src = '../static/images/ship23x34.png';

            image.onload = () => {
                this.img = image;
            }
            const scaling = 1.25;
            this.width = image.width * scaling;
            this.height = image.height * scaling;
            
            this.position = {
                x: canvas.width / 2 - this.width,
                y: canvas.height - this.height * 3,
            }
            this.isShooting = true;
            /* console.log(this.position) */

        };

        moveLeft() {
            if (this.position.x < canvas.width - canvas.width) {
                return this.position.x = canvas.width - this.width
            }
            this.position.x -= canvas.width / 10;
        };

        moveRight() {
            if (this.position.x > canvas.width - this.width - 10) {
                return this.position.x = 0;
            }
            this.position.x += canvas.width / 10;
        }

        draw() {
            if (!this.img) { return /* console.log('carregando ship.png...') */ };
            ctx.drawImage(
                this.img,
                this.position.x,
                this.position.y,
                this.width,
                this.height)
        }

        setPOS(){
            this.position.x = canvas.width / 2 - this.width;
            this.position.y = canvas.height - this.height * 3;
        }
    }

    //class enemy
    class Enemy {
        constructor(qtd = 0, skill = [], x = 1) {
            const image = document.createElement('img');
            image.src = '../static/images/gift.png';
            image.onload = () => {
                this.img = image;
            }

            const scaling = 2;
            this.width = image.width * scaling;
            this.height = image.height * scaling;

            this.position = {
                x: x,
                y: 50,
            }

            this.skill = skill;
            this.beenHit = false;
            this.qtd = qtd;
        }

        populate(skills) {
            const qtdPerStage = canvas.width / this.qtd;

            for (let i = 0; i < this.qtd; i++) {
                let xPos = (i * qtdPerStage) + (qtdPerStage / 2);//useful formula for evenly spacing
                xPos -= this.width / 2 //centers
                const ene = new Enemy(0, skills.shift(), xPos);
                enemies.push(ene);
            }
        }

        draw() {
            if (!this.img) { return /* console.log('carregando gift.png..') */ }

            enemies.forEach(element => {
                if (element.beenHit == true) { return };
                ctx.drawImage(this.img, element.position.x, element.position.y, this.width, this.height);
            })
        }

        death() {
            if (!this.beenHit) { return };
            const tombstone = new Tomb(this.skill,
                this.position, this.width, this.height);
            deadEnemies.push(tombstone)
        }
    }

    //function for adding images onto  document
    function addImg(icons) {
        icons.forEach((element) => {
            const tempImg = document.createElement('img');
            tempImg.src = `../static/images/${element}.png`;
            habilidades.push(tempImg);
        })

    }

    //function for finding element position
    function findPos(obj) {
        var curleft = curtop = 0;
        if (obj.offsetParent) {
            do {
                curleft += obj.offsetLeft;
                curtop += obj.offsetTop;
            } while (obj = obj.offsetParent);
        }
        return [curleft, curtop];
    }

    //class Tomb
    class Tomb {
        constructor(img, position, w, h) {
            this.img = img;
            this.position = position;
            this.scaling = 1.25;
            this.width = w;
            this.height = h;
        }

        draw() {
            if (!this.img) { return };
            if (this.img.length == 0) { return }
            ctx.drawImage(this.img,
                this.position.x,
                this.position.y,
                this.width * this.scaling,
                this.height * this.scaling);
        }


    }

    //class projectile bullet
    class Bullet {
        constructor(obj) {
            const image = document.createElement('img');
            image.src = '../static/images/rocket.png';

            image.onload = () => {
                this.img = image;
            }

            this.speed = 8;

            const scaling = 1.5;
            this.width = image.width * scaling;
            this.height = image.height * scaling;

            this.position = {
                x: obj.x,
                y: obj.y
            }
        };

        draw() {
            if (!this.img) { return }
            ctx.drawImage(this.img, this.position.x, this.position.y, this.width, this.height);
        };

        move() {
            if (!this.img) { return };
            this.position.y -= this.speed
            if (this.position.y < 0) {
                setTimeout(() => {
                    bullets.shift();
                }, 0)
                //console.log(bullets.length);
            }
        };

        checkCollision(obj1, obj2) { //this is box collision algorithm
            if (
                obj1.position.x + obj1.width >= obj2.position.x &&
                obj1.position.x <= obj2.position.x + obj2.width &&
                obj1.position.y + obj1.height >= obj2.position.y &&
                obj1.position.y <= obj2.position.y + obj2.height
            ) { return true }
        }

    };

    //setting game assets
    const habilidades = [];
    const bullets = [];
    const enemies = [];
    addImg(['django-logo-icon', 'express-js-icon',
        'icons8-javascript-48',
        'mongodb-icon', 'node-js-icon', 'python-icon']);
    const deadEnemies = [];

    //setting up canvas
    let raf;

    const canvas = document.querySelector('#stage');

    window.addEventListener('resize', () => {
        window.location.reload();
        canvas.width = canvas.clientWidth;
        canvas.height = canvas.clientHeight;
        ctx.reset()
        animate()
    })

    canvas.width = document.querySelector('#game-wrapper').clientWidth;
    canvas.height = document.querySelector('#game-wrapper').clientHeight;
    canvas.style = "border: 1px solid rgba(0, 0, 0, 0.208);";
    const ctx = canvas.getContext('2d');

    const canvasX1 = findPos(canvas).shift()
    const canvasX2 = canvasX1 + canvas.width
    const halfCanvasX = canvasX1 + canvas.width / 2;
    //console.log(canvasX1, canvasX2, halfCanvasX)

    //adding ship&&enemy
    const ship = new Ship;
    const enemy = new Enemy(habilidades.length);
    enemy.populate(habilidades);

    //adding events
    canvas.addEventListener('click', (e) => {
        if (e.clientX > halfCanvasX) { ship.moveRight() }
        if (e.clientX < halfCanvasX) { ship.moveLeft() }
        const bullet = new Bullet(ship.position)
        bullets.push(bullet);
    });

    function animate() {
        /* console.log(canvas.width, canvas.height) */
        function play() {
            ctx.fillStyle = 'white';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ship.draw()
            enemy.draw()

            //shooting&&collision
            if (bullets.length > 0) {
                bullets.forEach((el) => {
                    if (el.img) {
                        el.draw();
                        el.move();
                    };
                    enemies.forEach((el2) => {
                        if (el2.beenHit == true) { return };
                        if (el.checkCollision(el, el2)) { el2.beenHit = true };
                        el2.death();
                    })
                })
            }

            //habilidades
            if (deadEnemies.length > 0) {
                deadEnemies.forEach(element => {
                    element.draw()
                })
            }

            raf = requestAnimationFrame(play)
        }
        play();
    }
    animate()
}

//*************************