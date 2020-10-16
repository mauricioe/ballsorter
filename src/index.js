import React from 'react';
import ReactDOM from 'react-dom';

import Board from './components/Board';

import './styles/app.css';

class BallSort extends React.Component{
    render(){
        return(
            <div className="main">
                <div><img src= {'./images/logo-short.jpg'} alt="come on" /></div>
                <div className="ui container" >
                    <Board 
                        numberOfPipes= {5}
                    />
                </div>
            </div>
        );
    }
}

ReactDOM.render(
    <BallSort />,
    document.getElementById('root')
);