
export default class Paddle1{
    constructor(game){
        this.gameWidth=game.gameWidth;
        
        this.height=20;
        this.width=250;
        
        this.maxSpeed=7;
        this.speed=0;
        this.position={
            x:800/2-this.width/2,
            y:600-this.height-10
        }
    }
    moveLeft(){
        this.speed=-this.maxSpeed;
    }
    moveRight(){
        this.speed=this.maxSpeed;
    }

    stop(){
        this.speed=0;
    }

    draw(ctx){
        ctx.fillStyle='#fe89f0';
        ctx.fillRect(this.position.x,this.position.y,this.width,this.height);
        
       
    }
    update(deltaTime){
        
      this.position.x+=this.speed;
      if(this.position.x<0){
          this.position.x=5;
      } if(this.position.x>550){
          this.position.x=545;
      
      }
      
    }

   

}


