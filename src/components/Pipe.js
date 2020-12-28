import React from 'react';

class Pipe extends React.Component{
    
    clicked(){
        this.props.onClick(this.props.index)
    }

    renderDivider(index, color){
        if (index === 1){
            return (
                <div>
                    <div className="ui center aligned grid">
                    <div className="ui divider"></div> 
                    </div>
                    <div className="ui center aligned grid">
                    <label className= {'ui inverted empty massive circular empty label '.concat(color)}></label>
                    </div>
                </div>
            );
        }else{
            return (<div className="ui center aligned grid">
                        <label className= {'ui inverted empty massive circular empty label '.concat(color)}></label>
                    </div>
                    );
        }
    }

    renderBalls(){
        
        return this.props.colors.map((color, index) =>{
            
            return (
                     <div key= {index}> 
                            {this.renderDivider(index, color)}                            
                            <br></br>
                            <br></br>
                            <br></br>                                           
                    </div>
                   );});
        }

    render(){
        return(
                    <div className="column" onClick= {() => this.clicked()}>

                        {this.renderBalls()}                                                                                           

                    </div>
        );}
}

export default Pipe;


