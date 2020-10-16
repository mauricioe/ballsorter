import React from 'react';

import Ball from './Ball';

class Pipe extends React.Component{
    
    clicked(){
        this.props.onClick(this.props.index)
    }

    renderBalls(){
        
        return this.props.colors.map((color, index) =>{
            
            return <div key= {index}  style={{display: "flex", marginRight: "auto", marginLeft: "auto"}} > 
                        <Ball
                            color= {color}
                            index= {index}
                        /> 
                    </div>;
                })
        }

    render(){
        return(
                    <div className="column" onClick= {() => this.clicked()}>
                         < Ball
                            color= {this.props.ballRaised}
                            index = "10"
                        />    

                        {this.renderBalls()}                                                                                           
                    </div>
        );}
}

export default Pipe;


