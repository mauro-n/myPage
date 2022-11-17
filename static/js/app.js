const ship1 = createShip(canvas, 130);
function init(){
    drawShip(canvas, ship1);
    ship1.moveLeft()
    drawShip(canvas,ship1)
}
init()