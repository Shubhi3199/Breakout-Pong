import {detectCollision} from './collisionDetection.js';

export default class Brick{
    constructor(game,position){
        this.game=game;
        this.image=document.getElementById('image_brick');
       
        
       
        this.position=position;
           
        
        this.width=80;
        this.height=24;
        this.markedForDeletion=false;
        
    }
    update(){
        if(detectCollision(this.game.ball,this)){
            this.game.ball.speed.y = -this.game.ball.speed.y;
            this.markedForDeletion=true;
        
        }
    }
    draw(ctx){
        ctx.drawImage(
            this.image,
            this.position.x,
            this.position.y,
            this.width,
            this.height
        );

    }
}