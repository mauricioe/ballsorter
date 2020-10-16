import React from 'react';


const Ball = (props) => {
    // console.log("en Bal vale "+ props.color);
    return(
        <div className="item">
            <div>
                <label className= {'ui inverted empty massive circular empty label '.concat(props.color)}></label>
                <br></br>
                <br></br>
                
                </div>
        </div>
    );
}

export default Ball;