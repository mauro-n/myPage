class Ship {
    constructor(size, img, x =0, y= 0){
        this.size = size;
        this.img = img;
        this.x = x - (size/2);
        this.y = y - (size/2);
        this.isShooting = true;
    };

    moveLeft(stage){
        if (this.x < stage.width - stage.width){
            return this.x = stage.width - this.size
        }
        this.x -= stage.width/7
    };

    moveRight(stage){
        if (this.x >= stage.width - this.size - 10){
            return this.x = 0;
        }
        this.x += stage.width/7
    }

    draw(ctx){
        ctx.drawImage(this.img, this.x, this.y, this.size,this.size+10)
    }
}


class Bullet {
    constructor(x,y, img){
        this.img = img;
        this.x = x;
        this.y = y;
        this.size = 20;
        this.speed = 8;
    };

    draw(ctx){
        ctx.drawImage(this.img, this.x + this.size/2,this.y,this.size,this.size);
    };

    move(){
        this.y -= this.speed
        if (this.y < 1){data.bullets.shift()}
    };

    boxCollision(obj1, obj2){
        if (
            obj1.x + obj1.size >= obj2.x &&
            obj1.x <= obj2.x + obj2.size &&
            obj1.y + obj1.size >= obj2.y &&
            obj1.y <= obj2.y + obj2.size
        ) {return true}
    }
    
};

class Enemy {
    constructor(y, size, texto, img, x = 1){
        this.x = x;
        this.y = y;
        this.texto = texto;
        this.size = size;
        this.enemies = [];
        this.beenHit = false;
        this.enemyImg = img;
    }

    populate(qtd,stage){
        const qtdPerStage = stage.width/qtd;

        for (let i = 0; i < qtd; i ++){
            let xPos = (i * qtdPerStage) + (qtdPerStage/2);//useful formula for evenly spacing
            xPos -= this.size/2 //centers
            const ene = new Enemy(this.y,this.size,this.texto.shift(),this.img, xPos);
            this.enemies.push(ene)
        }
    }

    draw(canva){
        this.enemies.forEach(element => {
            if (element.beenHit == true){return};
            canva.drawImage(this.enemyImg, element.x, element.y, this.size, this.size);
        })
    }
}
