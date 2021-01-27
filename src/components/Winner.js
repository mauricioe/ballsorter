import React from 'react';

const Winner = (props) => {
    return(
            <div>
                <div className="ui red horizontal label ">You WIN !!!</div>
                <div className="ui red horizontal label ">You WIN !!!</div>
                <div className="ui red horizontal label ">You WIN !!!</div>
                <div className="ui red horizontal label ">You WIN !!!</div>
                <div className="ui red horizontal label ">You WIN !!!</div>
                <div className="ui red horizontal label ">You WIN !!!</div>
                <div className="ui center aligned grid">
                    <div className="large form padding-top">
                        <button className= "ui blue button" type="button" onClick={()=> props.onClick()}>
                            Next Level
                        </button>                            
                    </div>
                </div> 
            </div>
    )
}

export default Winner;