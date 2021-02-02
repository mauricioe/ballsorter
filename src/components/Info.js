import React from "react";

import Modal from "./Modal";
import history from "../history";

const Info = () => {
	const renderActions = () => {
		return <button onClick={() => history.push("/")}>Ok</button>;
	};

	const renderInstructions = () => {
		return (
			<div className="ui info message">
				<div className="header">
					<p>Instructions:</p>
				</div>
				<ul className="list">
					<li>
						{" "}
						The goal of the game is to put all the Balls of the same color in
						the same Pipe{" "}
					</li>
					<li>
						{" "}
						To move a Ball, first click on the Pipe where the Ball is, the Ball
						will rise. Then click on the Pipe where you want to move the Ball.{" "}
					</li>
					<li>
						You can only move a Ball to an empty Pipe or to a Pipe where the top
						ball is the same color of the Ball you want to move.
					</li>
				</ul>
			</div>
		);
	};
	return (
		<Modal
			title="Instructions"
			content={renderInstructions()}
			onDismiss={() => history.push("/")}
			actions={renderActions()}
		/>
	);
};

export default Info;
