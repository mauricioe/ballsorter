import React from "react";
import ReactDOM from "react-dom";
import { Router, Route } from "react-router-dom";

import Board from "./components/Board";
import Info from "./components/Info";
import history from "./history";

import "./styles/app.css";

class BallSort extends React.Component {
	showModal() {
		return;
	}

	render() {
		return (
			<Router history={history}>
				<Route exact path="/">
					<div className="ui raised very padded text container segment">
						<a
							className="ui red blue right ribbon label padd"
							onClick={() => history.push("/info")}
						>
							<i className="question circle big icon"></i>
						</a>
						<Board />
					</div>
				</Route>
				<Route path="/info">
					<Info />
				</Route>
			</Router>
		);
	}
}

ReactDOM.render(<BallSort />, document.getElementById("root"));
