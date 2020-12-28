import React from 'react';
import ReactDOM from 'react-dom';

import Board from './components/Board';

import './styles/app.css';

class BallSort extends React.Component{
    render(){
        return(
                <div className="ui raised very padded text container segment" >
                    <Board/>
                </div>
        );
    }
}

ReactDOM.render(
    <BallSort />,
    document.getElementById('root')
);