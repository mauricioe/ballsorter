import Pipe from "../components/Pipe";



class BallSort {

    constructor(numberOfPipes, numberOfEmptyPipes, colors ){

        this.pipes = Array(numberOfPipes+numberOfEmptyPipes)
        this.pipes.map((pipe, index) => {
            pipes[index] = new Pipe(colors[index]);
        })
        
        this.ballRaized = -1;
        
    }


    getPipes(){
        return this.pipes;
    }

    clicked(pipeIndex){
        //entre point for the click from the UI
        if (this.ballRaized === -1){
            //this is the first click
            this.pipes[pipeIndex].clicked();
            this.ballRaized = pipeIndex;
        }else{
            this.pipes[pipeIndex].clickedFrom(this.ballRaized);
        }
    }

}

export default BallSort;