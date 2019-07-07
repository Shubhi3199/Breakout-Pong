export function detectCollision(ball,gameObject){
    
        let ballBottom=ball.position.y+ball.size;
        let topOfBall=ball.position.y;  
        let topOfObject=gameObject.position.y;
        let leftSideOfObject=gameObject.position.x;
        let rightSideOfObject=gameObject.position.x + gameObject.width;

        let bottomOfObject=gameObject.position.y + gameObject.height;

        if(ballBottom>=topOfObject &&
           
           topOfBall<=bottomOfObject && 
           ball.position.x>=leftSideOfObject && 
           ball.position.x <=rightSideOfObject){

            return true;
        
        }else return false;
}
