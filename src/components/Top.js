import React from 'react';

const Top = (props) => {
    return(
        <div>
            <div className="item">
                <div className= {'ui inverted empty massive circular empty label '.concat(props.color)} />
            </div>
        </div>
    )
}

export default Top;