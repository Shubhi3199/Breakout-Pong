import Game from "./game.js";


let canvas=document.getElementById('brickGame');
let ctx=canvas.getContext('2d');
ctx.clearRect(0,0,800,600);
ctx.fillStyle='#f00';
ctx.fillRect(20,20,150,40);
ctx.fillStyle='#0f0';
ctx.fillRect(190,60,150,40);
ctx.fillStyle='#00f';
ctx.fillRect(360,40,150,40);
ctx.fillStyle='#0367a0';
ctx.fillRect(530,20,150,40);
ctx.fillStyle='#0f3388';
ctx.fillRect(700,20,80,40);

var GAME_WIDTH=800;
var GAME_HEIGHT=600;
let game=new Game(GAME_WIDTH,GAME_HEIGHT);


     
let lastTime=0;

function gameLoop(timestamp){
    let deltaTime=timestamp-lastTime;
    lastTime=timestamp;
    ctx.clearRect(0,0,GAME_WIDTH,GAME_HEIGHT);
    game.update(deltaTime);
    game.drawing(ctx);
    requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);