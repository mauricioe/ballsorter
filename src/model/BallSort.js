import Pipe from "./Pipe";

export const numberOfBalls = 4;
export const color_flag = "white";
export const flag = -1;

class BallSort {
    
    constructor(level){        
        this.initLevel(level);  
    }

    getCurrentLevel(){
        return this.currentLevel;
    }

    getPipes(){
        return this.pipes;
    }

    initLevel(level){
        console.log("el level val");
        console.log(level);
        this.pipes = [];
        this.ballRaized = flag;
        this.currentLevel = level.level_number;
        console.log(this);
        level.pipes.map((pipe, index) => {
            console.log("Estoy en el map");
            console.log(pipe);
            return this.pipes.push(new Pipe(pipe, index));
         });
    }

    changeLevel(level){
        this.initLevel(level);
    }

    clicked(pipeIndex){

        if (this.ballRaized === flag){
            // This is the first click and the pipe decides wich ball
            // will be rized
            console.log("este es el primer click");
            this.ballRaized = this.pipes[pipeIndex].clickFirst();
        }else{
            console.log("este es el segundo click");
            // there's another ball raized, and now we need to check
            // if we can move the ball
            this.ballRaized = this.pipes[pipeIndex].clickSecond(
                                        this.pipes[this.ballRaized]
                                        );
        }
        
    }

    checkForWin(){
        //Check if thi is the final
        let ok = true;
        let pipe_index=0;
        //Iterate over the pipes
        while (ok && pipe_index < this.pipes.length){
            // console.log("el while va a buscar ->" + pipe_index);
            ok = this.pipes[pipe_index].sameColor();
            pipe_index +=1;
        }

        return ok;

    }
 

}

export default BallSort;