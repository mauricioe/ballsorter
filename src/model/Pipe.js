
import { numberOfBalls } from './BallSort';
import { color_flag } from './BallSort';
import { flag } from './BallSort';


class Pipe {
    
    constructor(colors, index){
        this.index = index;
        this.balls = [...colors];
        this.pointer = numberOfBalls - colors.length ;
   
        //Fill the Pipe with white balls
        let limit = numberOfBalls - colors.length;
        for (let i = 1; i <= limit; i++){
            this.balls.unshift(color_flag);
        }
        this.ballRaized = color_flag;

    }

    getColors(){
        return [this.ballRaized].concat(this.balls);
    }

    getIndex(){
        return this.index;
    }

    getPointedColor(){
        if (this.pointer <= numberOfBalls){
            return this.balls[this.pointer];
        }else{
            return "";
        }
    }       

    getRaizedBall(){
        return this.ballRaized;
    }

    removeRaizedBall(){
        //Removes the ball that's razed and put the color flag
        let ball = this.ballRaized;
        this.ballRaized = color_flag;
        return ball;
    }

    push(ball){
        //Add a ball to the pipe
        this.pointer -=1;
        this.balls[this.pointer] = ball;
    }

    moveFrom(pipe){
        //Move a ball pointed from another ball, to this pipe
        this.push(pipe.removeRaizedBall());
    }

    ballEqualColor(pipe){
        //Return true if the colors of the balls are equals
        return (this.getPointedColor() === pipe.getRaizedBall());
    }

    clickFirst(){    
        //This is the fir click that the pipe receive, so the behaviour is different
        // from the second time that the pipe is clicked
        // Return the index of the pipe to keep track on the game.
        if (this.pointer !== numberOfBalls){
            this.raise();
            return this.index;
        }else{
            return flag;
        }       
    }  

    clickSecond(pipeFrom){
        //In the second click the behaviour is more complex
        //The most common value to return
        let new_pipe_rised = flag;

        if (this.getIndex() === pipeFrom.getIndex()) {
            //Clicked on same pipe -> unRaise()
            this.unRaise();
        } else if (this.pointer === 0){
            //This pipe is full so it's raise and unraised the other
            this.raise();
            pipeFrom.unRaise();
            new_pipe_rised = this.getIndex();
        }else if (this.ballEqualColor(pipeFrom)){
            //The balls are the same color, so let's move the ball
            this.moveFrom(pipeFrom);
        }else if (this.pointer === numberOfBalls){
            //This pipe es empty, so let's move the ball
            this.moveFrom(pipeFrom);
        }else{
            //The colors doesn't match
            this.raise();
            pipeFrom.unRaise();
            new_pipe_rised = this.getIndex();
        }

        //Please, make a single point of return.
        return new_pipe_rised;
    }

    raise(){
        //This pipe is going to raise
        //The ball pointed by pointer, puts on the raized ball

        this.ballRaized = this.balls[this.pointer];
        this.balls[this.pointer] = color_flag;
        this.pointer += 1;

    }

    unRaise(){
        //This ball is goint to unraise
        //The ball raized, is going to be put in the position before the 
        //pointed position
        if (this.pointer === numberOfBalls){
            //if the pipe is empy, goes in the last position
            this.balls[numberOfBalls-1] = this.ballRaized;
        }else{
            this.balls[this.pointer-1] = this.ballRaized;
        }
        this.ballRaized = color_flag;
        this.pointer -= 1;
        
    }

    sameColor(){
        //Check if all the balls are the same color as the first one.
         return this.equal(this.balls[0], 1);
    }

    equal(aColor, index){

        if(index === numberOfBalls){
            //base case, end of the array
            return true;
        }else{
            //Recursive case
            if (aColor === this.balls[index]){
                return true && this.equal(aColor, index + 1);
            }else{
                //Negative case
                return false;
            }
        }
    }
    
}

export default Pipe;