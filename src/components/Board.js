import React from 'react'

import Pipe from './Pipe'
import BallSort from '../model/BallSort'
import Winner from './Winner';

const levels2 = require('../game/levels2');

class Board extends React.Component{

    constructor(props){
        super(props);
        this.ballSort = new BallSort(this.getLevel(1));
        this.state = {
            pipes: this.ballSort.getPipes(),
            current_level: 0
        };
    }

    nextLevel(){
        //After a winner game, the player wants to go to the next level.
        let level = this.getLevel(this.state.current_level + 1);
        
        this.ballSort.changeLevel(level);
        // this.ballSort = new BallSort(this.getLevel(level));
        this.setState({
            pipes: this.ballSort.getPipes(),
            winner: false,
            current_level: level.level_number
        });
    }

    getLevel(levelNumber){
        //Get the level from the JSON file
        let level;
         if (levelNumber-1 < levels2.length){
             level = levels2[levelNumber-1];
         }else{
             level = levels2[0];
         }
         console.log("ESTOY EN EL GELLEVEL");
         console.log(level);
         console.log(levels2[0]);
        return level;
    }

    getAllLevels(){
        // let allLevels = JSON.parse(levels);
        // console.log("ALLLLL LEVELSSSSSSSSSSSSSSSSSSSSSSS");
        // console.log(allLevels);
        // return allLevels;
        return levels2;
    }

    handleChange(event){
        let level = this.getLevel(event.target.value);
        console.log("ESTOY EN EL HANDLE CHANGE ");
        console.log(level);
        this.ballSort.changeLevel(level);
        console.log("el nivel en handleChange val " + level);
        console.log(level);
        this.setState({
            pipes: this.ballSort.getPipes(),
            winner: false,
            current_level: level.level_number
        });
        
    }

    updateState(){
        this.setState({
            pipes: this.ballSort.getPipes(),
            current_level: this.ballSort.getCurrentLevel()
        });        
    }
 
    onClick(clickedPipe){

       this.ballSort.clicked(clickedPipe);
       this.updateState();
       if (this.ballSort.checkForWin()){
           this.setState({
               winner: true
           });
        };

    }

    renderWinner(){
        if (this.state.winner){
            return (
                <div>
                    <Winner onClick={()=> this.nextLevel()}/>                                       
                </div>
            );
        };
    }

    renderPipes(){
        
        return this.state.pipes.map((pipe, index) =>{
            return <div key= {index} className="column">
                            <Pipe 
                                colors = {pipe.getColors()}
                                onClick= {(e) => this.onClick(e)}
                                index= {index}                            
                            /> 
                    </div>
                })
        }

    render(){

        return(
            <div className="padding-top ">
                    <div className= "ui equal width grid">
                        
                        {this.renderPipes()}

                    </div>
                    <div className="ui center aligned grid">
                    <div className="ui large form">
                        <div className="one fields">
                            <div className="field">
                            <label>Select the Level:</label> 
                            <select value= {this.state.current_level}
                                    onChange= {(e) => {this.handleChange(e)}}>
                                {this.getAllLevels().map((level) => {
                                    return(
                                        <option key= {level.level_number} 
                                                value= {level.level_number}>
                                                   {level.level_number}
                                        </option>
                                    );
                                })}
                            </select>
                            </div>
                        </div>
                    </div>
                        {this.renderWinner()}                                          
                    </div>

                
            </div>
        );
    }

    
}

export default Board;