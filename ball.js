import {detectCollision} from './collisionDetection.js';

export default class Ball{
    constructor(game){
        this.game=game;
        this.image=document.getElementById('image_ball');
        this.gameWidth=game.gameWidth;
        this.gameHeight=game.gameHeight;
        
        
        this.size=17;
        this.reset();
        
    }

    reset(){
        this.speed={
            x:10,
            y:5 
        };
        this.position={
            x:10,
            y:220   
        };
    }
    draw(ctx){
        ctx.drawImage(this.image,this.position.x,this.position.y,this.size,this.size)
    }
    update(deltaTime){
        
        this.position.x += this.speed.x;
        this.position.y += this.speed.y;
        if(this.position.x>this.gameWidth-this.size || this.position.x<0){
            this.speed.x= -this.speed.x;
        }
        if( this.position.y<0){
            this.speed.y= -this.speed.y;
        }
        if(this.position.y>600-this.size){
            this.game.lives--;
            if(this.game.lives>0){
                this.reset();
            }
        }

        if(detectCollision(this,this.game.paddle))
        {
            this.speed.y= -this.speed.y;
            this.position.y=this.game.paddle.position.y-this.size;    
        }
    }
}