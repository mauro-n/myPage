class Enemy {
    constructor(x, y, size, texto){
        this.x = x;
        this.y = y;
        this.texto = texto;
        
        this.enemies = [];
        this.size = size;
        this.colliding = false;
        this.beenHit = false;
    }

    createNew(qtd){
        let xSpace = this.size;
        for (let i = 0; i < qtd; i++){
            this.enemies.push(new Enemy(xSpace, this.y, this.size, this.texto.shift()));
            xSpace += width/qtd;
            console.log(this.enemies[i].texto)
        }
    }

    show(){
        if (this.beenHit == false){
            image(imgGift, this.x, this.y);
        } else {
            let texto = new deathText(this.x, this.y, this.texto);
            enemyKilled.push(texto);
        }
    }
}

class deathText {
    constructor(x, y, texto){
        this.x = x;
        this.y = y;
        this.texto = texto;
        //this.textos = [];
    }

    show(){
        fill('white');
        stroke('black')
        text(this.texto, this.x, this.y);
    }
}