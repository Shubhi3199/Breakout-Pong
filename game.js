import Paddle1 from './Paddle1.js';
import InputHandler from './input.js';
import Ball from './ball.js';
import Brick from './brick.js'
import {buildLevel,level1, level2} from './levels.js';

const GAMESTATE={
    PAUSED:0,
    RUNNING:1,
    MENU:2,
    GAMEOVER:3,
    GAMELEVEL:4
}

export default class Game{
    constructor(gameWidth,gameHeihgt){
        this.gameWidth=gameWidth;
        this.gameHeihgt=gameHeihgt;
        this.gameState=GAMESTATE.MENU;
        this.paddle=new Paddle1(this);
        this.ball=new Ball(this);
        new InputHandler(this.paddle,this);
        this.gameObjects=[];
        this.lives=3;
        this.bricks=[];
        this.levels=[level1,level2]
        this.currentLevel=0;
    }
    start(){
        if(this.gameState !==GAMESTATE.MENU &&
           this.gameState!==GAMESTATE.NEWLEVEL ){
            return;
        }
        this.bricks=buildLevel(this,this.levels[this.currentLevel])
        this.ball.reset();
        
        this.gameObjects=[this.ball,this.paddle];
        this.gameState=GAMESTATE.RUNNING;
    }
    update(deltaTime){
       if(this.lives===0){
           this.gameState=GAMESTATE.GAMEOVER;
       } 
       if(this.gameState===GAMESTATE.PAUSED || 
          this.gameState===GAMESTATE.MENU ||
          this.gameState===GAMESTATE.GAMEOVER       
          ){
           return;
       } 

       if(this.bricks.length===0){
           this.currentLevel++;
           
           this.gameState=GAMESTATE.NEWLEVEL;
           this.start();        
       }
       [...this.gameObjects,...this.bricks].forEach((object)=>object.update(deltaTime));
       this.bricks=this.bricks.filter(brick=> !brick.markedForDeletion);    

    }
    drawing(ctx){
        
   
    [...this.gameObjects,...this.bricks].forEach((object)=>object.draw(ctx));

    if(this.gameState==GAMESTATE.PAUSED){
        ctx.rect(0,0,this.gameWidth,this.gameHeihgt);
        ctx.fillStyle="rgba(0,0,0,0.5)";
        ctx.fill();
        ctx.font="30px Arial";
        ctx.fillStyle="white";
        ctx.textAlign="centre";
        ctx.fillText("PAUSED",this.gameWidth/2-40,this.gameHeihgt/2);
    }

    if(this.gameState==GAMESTATE.MENU){
        ctx.rect(0,0,this.gameWidth,this.gameHeihgt);
        ctx.fillStyle="rgba(0,0,0,1)";
        ctx.fill();
        ctx.font="30px Arial";
        
        ctx.textAlign="centre";
        ctx.fillStyle="red";
        ctx.fillText("BREAKOUT",this.gameWidth/2-110,this.gameHeihgt/2-70);
        ctx.fillStyle="white";
        ctx.fillText("HIT THE SPACE BAR TO START THE GAME",this.gameWidth/2-310,this.gameHeihgt/2);
        ctx.fillStyle="green";
        ctx.fillText("Lives:3",this.gameWidth/2-70,this.gameHeihgt/2+70);
    }

    if(this.gameState==GAMESTATE.GAMEOVER){
        ctx.rect(0,0,this.gameWidth,this.gameHeihgt);
        ctx.fillStyle="rgba(0,0,0,1)";
        ctx.fill();
        ctx.font="30px Arial";
        ctx.fillStyle="white";
        ctx.textAlign="centre";
        ctx.fillText("GAMEOVER",this.gameWidth/2-70,this.gameHeihgt/2);
    }

    if(this.gameState==GAMESTATE.RUNNING || 
       this.gameState==GAMESTATE.RUNNING ||
       this.gameState==GAMESTATE.RUNNING){
           ctx.fillStyle="red";
          // ctx.fillText("Lives:",this.gameWidth/2-70,this.gameHeihgt/2)
       }

    }
    togglePause(){
        if(this.gameState==GAMESTATE.PAUSED){
            this.gameState=GAMESTATE.RUNNING;
        }else{
            this.gameState=GAMESTATE.PAUSED;
        }
    }
    
}