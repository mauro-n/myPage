const body = document.querySelector('body');
const canvas = document.querySelector('#stage');

window.addEventListener('resize',() => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    console.log('resizing wooo')
})
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;