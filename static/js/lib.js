const canvas = {
    canvasId: '#stage',
    canvasWidth: window.innerWidth,
    canvasHeight: window.innerHeight,
    stage() {
        const canvas = document.querySelector(this.canvasId);
        canvas.width = this.canvasWidth;
        canvas.height = this.canvasHeight;
        const c = canvas.getContext('2d');
        console.log('stage set')
        return c;
    }
}
function createShip(canva, size) {
    console.log('Creating Ship')
    return {
        size: size,
        x: canva.canvasWidth / 2 - size / 2,
        y: canva.canvasHeight - size - 10,
        isShooting: false,
        moveLeft: function(){this.x -= 10},
        moveRight: function(){this.x += 10}
    };
};
function drawShip(canva, ship) {
    console.log('Drawing ship')

    const newStage = canva.stage()
    newStage.fillStyle = "#FF0000"
    newStage.fillRect(ship.x, ship.y, ship.size, ship.size);
}