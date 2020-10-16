import React from 'react';

import Pipe from './Pipe';

var _ = require('lodash');

const numberOfBallsPerPipe = 5; 
const numberOfEmptyPipes= 2;
const flag = -1;
const flag_color = "white";

class Board extends React.Component{

    constructor(props){
        super(props);

        let colors = ["red", "orange", "yellow", "olive", "green", "teal", "blue", "violet", "purple", "pink", "brown", "grey", "black"];
        
        let pipes = [];
        let pointers = [];
        const totalPipes = this.props.numberOfPipes + numberOfEmptyPipes;

        for (let i=0; i < this.props.numberOfPipes; i++){
            pipes[i] = _.sampleSize(colors, numberOfBallsPerPipe);
            pointers[i] = 0;
        }
        
        for (let i = this.props.numberOfPipes; i < totalPipes; i++){
            pipes[i] = _.fill([1,2,3,4,5],"white",0, numberOfBallsPerPipe);
            pointers[i] = numberOfBallsPerPipe;
        }

        
        const ballsRaisedNew = _.fill(Array(totalPipes), "white");
        this.state= {
                pipes: pipes,
                pointers: pointers, 
                ballRaised: flag,
                ballsRaised: ballsRaisedNew                
        };

    }

    ballGoesDown(pipeIndex){

        let ballRaizedNew = this.state.ballsRaised;
        let pipesNew = this.state.pipes;
        let pointersNew = this.state.pointers;

        pointersNew[pipeIndex] -= 1;

        pipesNew[pipeIndex][pointersNew[pipeIndex]] = ballRaizedNew[pipeIndex];

        ballRaizedNew[pipeIndex] = flag_color;        

        this.setState({
            ballRaised: flag,
            pipes: pipesNew,
            pointers: pointersNew,
            ballsRaised: ballRaizedNew       
        });
    }

    ballGoesUp(pipeIndex){

        let ballRaizedNew = this.state.ballsRaised;
        let pipesNew = this.state.pipes;
        let pointersNew = this.state.pointers;

        if (pointersNew[pipeIndex] < numberOfBallsPerPipe ){

            ballRaizedNew[pipeIndex] = pipesNew[pipeIndex][pointersNew[pipeIndex]];
            
            pipesNew[pipeIndex][pointersNew[pipeIndex]] = flag_color;

            if (pointersNew[pipeIndex] !== 4){ 
                pointersNew[pipeIndex] += 1;
            }

            this.setState({
                ballRaised: pipeIndex,
                pipes: pipesNew,
                pointers: pointersNew,
                ballsRaised: ballRaizedNew     
            });
        }
    }

    sameColor(number, aColor){
        
    }

    checkPipe(number){
        let pipe = this.state.pipes[number];
        return this.sameColor(number, pipe[0]);
    }

    check(){

        let pipes = this.state.pipes;
        let pointers = this.state.pointers;

        let ok = true;
        let current_pipe = 0;

        while (ok){
            while (ok){
                let pointer = pointers[current_pipe];
                if ( pointer !== numberOfBallsPerPipe){
                    if ( pointer === 0 ){
                        ok = this.checkPipe(current_pipe);
                    } else{
                        ok = false;
                    }

                }

            }
            current_pipe +=1;
        }
    }
   
    addBallToPipe(ball, pipe){
        
    }

    onClick(clickedPipe){
        
        let pipesMoved = this.state.pipes;
        let pipeFrom = this.state.pipes[this.state.ballRaised];
        let pipeTo = this.state.pipes[clickedPipe];
        let pointersUpdated = this.state.pointers;
        let fromIndex = this.state.ballRaised;
        let ballsRaizedNew = this.state.ballsRaised;

        if (this.state.ballRaised === flag && 
            this.state.pointers[clickedPipe] < numberOfBallsPerPipe ) { 

            //First Click, Ball goes up
            this.ballGoesUp(clickedPipe);
            console.log("Ball goes up");


        } else if (this.state.ballRaised === clickedPipe) {
            //Click on the same pipe, ball goes down
            this.ballGoesDown(clickedPipe);
            console.log("ball goes down");

        } else if (pointersUpdated[clickedPipe] === numberOfBallsPerPipe && this.state.ballRaised !== flag ){
                //Make the move to an empty pipe
                console.log("I'm going to make a movement to an empty pipe");

                let ball = ballsRaizedNew[fromIndex];

                pipeTo[numberOfBallsPerPipe - 1] = ball;

                pipesMoved[clickedPipe] = pipeTo;

                ballsRaizedNew[fromIndex] = flag_color;

                pointersUpdated[clickedPipe] -=1;
                
                this.setState({
                    pipes: pipesMoved,
                    pointers: pointersUpdated,
                    ballRaised: flag,
                    ballsRaised: ballsRaizedNew
                });

        } else if (this.state.ballRaised !== flag) {
             if (pipeTo[this.state.pointers[clickedPipe]] === 
                ballsRaizedNew[fromIndex] ) {
                //Make a move to an equal color ball

                console.log("The balss are equals, lets move.")
                console.log(pipeTo[this.state.pointers[clickedPipe]]);
                console.log(pipeFrom[this.state.pointers[fromIndex]]);

                let ball = ballsRaizedNew[fromIndex];

                let pointerTo = this.state.pointers[clickedPipe];

                ballsRaizedNew[fromIndex] = flag_color;

                pipeTo[pointerTo-1] = ball;

                pipesMoved[clickedPipe] = pipeTo;

                pointersUpdated[clickedPipe] -=1;
                
                this.setState({
                    pipes: pipesMoved,
                    pointers: pointersUpdated,
                    ballRaised: flag,
                    ballsRaised: ballsRaizedNew
                })
            

            }           

            else {
                        //There's no space in the pipe
                        // the ball is raized on a new pipe
                        console.log("estoy en el else");   
                        let ball = ballsRaizedNew[fromIndex];
                        console.log(ball);

                        ballsRaizedNew[clickedPipe] = pipesMoved[clickedPipe][pointersUpdated[clickedPipe]];
                        ballsRaizedNew[fromIndex] = flag_color;

                        
                        pointersUpdated[fromIndex] -=1;

                        pipesMoved[fromIndex][pointersUpdated[fromIndex]] = ball;
                        pipesMoved[clickedPipe][pointersUpdated[clickedPipe]] = flag_color;

                        pointersUpdated[clickedPipe] +=1;
                        

                        console.log("pointers update the clicked" , pointersUpdated[clickedPipe])
                        console.log("pointers update the from index", pointersUpdated[fromIndex])

                        this.setState({
                            pipes: pipesMoved,
                            ballRaised: clickedPipe,
                            pointers: pointersUpdated,
                            ballsRaised: ballsRaizedNew
                            
                        });
                        console.log("ball goes down last else");
                        console.log(" clickedPipe vel " +clickedPipe);
                        console.log("from index val " + fromIndex);
                        console.log( "this.state.pointers[cliclelPipe] " +this.state.pointers[clickedPipe] );
                        console.log( "this.state.pointers[fromIndex]" + this.state.pointers[fromIndex]);
                        console.log("piepTO val e " + pipeTo);
                        console.log("pipe from " + pipeFrom);
                        let una = pipeTo[this.state.pointers[clickedPipe]+1];
                        let dos = pipeFrom[this.state.pointers[fromIndex]];
                        console.log("una " + typeof(una));
                        console.log("dos " + typeof(dos ));
                        console.log("una " + una);
                        console.log("dos " + dos);

                        console.log("la verdad es  " + (pipeTo[this.state.pointers[clickedPipe] + 1] === 
                            pipeFrom[this.state.pointers[fromIndex]]));


                    }
                }
        
                this.check();
    }

    renderPipes(){
        const totalPipes = this.props.numberOfPipes + numberOfEmptyPipes;
        const positions = _.range(0,totalPipes);
        return positions.map((index) =>{
            return <div key= {index}>
                        <div
                            style={{display: "flex", marginRight: "auto", marginLeft: "auto"}}
                        > 
                            <Pipe 
                                colors = {this.state.pipes[index]}
                                ballRaised = {this.state.ballsRaised[index]}
                                onClick= {(e) => this.onClick(e)}
                                index= {index}                            
                            /> 
                            
                        </div>

                    </div>
                })
        }

    render(){
        return(
            <div>
                    <div className= "inner">
                    <div className= "ui four column grid ">
                        
                        {this.renderPipes()}

                    </div>
                    </div>

            </div>
        );
    }
}

export default Board;