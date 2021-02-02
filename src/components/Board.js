import React from "react";

import Pipe from "./Pipe";
import BallSort from "../model/BallSort";
import Winner from "./Winner";

const levels = require("../game/levels2");

class Board extends React.Component {
	constructor(props) {
		super(props);
		this.ballSort = new BallSort(this.getLevel(1));
		this.state = {
			pipes: this.ballSort.getPipes(),
			current_level: 0,
		};
	}

	nextLevel() {
		//After a winner game, the player wants to go to the next level.
		let level = this.getLevel(this.state.current_level + 1);

		this.ballSort.changeLevel(level);
		this.setState({
			pipes: this.ballSort.getPipes(),
			winner: false,
			current_level: level.level_number,
		});
	}

	getLevel(levelNumber) {
		//Get the level from the JSON file
		let level;
		if (levelNumber - 1 < levels.length) {
			level = levels[levelNumber - 1];
		} else {
			level = levels[0];
		}
		return level;
	}

	getAllLevels() {
		return levels;
	}

	handleChange(event) {
		let level = this.getLevel(event.target.value);
		this.ballSort.changeLevel(level);
		this.setState({
			pipes: this.ballSort.getPipes(),
			winner: false,
			current_level: level.level_number,
		});
	}

	updateState() {
		this.setState({
			pipes: this.ballSort.getPipes(),
			current_level: this.ballSort.getCurrentLevel(),
		});
	}

	onClick(clickedPipe) {
		this.ballSort.clicked(clickedPipe);
		this.updateState();
		if (this.ballSort.checkForWin()) {
			this.setState({
				winner: true,
			});
		}
	}

	renderWinner() {
		if (this.state.winner) {
			return (
				<div>
					<Winner onClick={() => this.nextLevel()} />
				</div>
			);
		}
	}

	renderPipes() {
		return this.state.pipes.map((pipe, index) => {
			return (
				<div key={index} className="column">
					<Pipe
						colors={pipe.getColors()}
						onClick={(e) => this.onClick(e)}
						index={index}
					/>
				</div>
			);
		});
	}

	renderInput() {
		return (
			<div>
				<select
					value={this.state.current_level}
					onChange={(e) => {
						this.handleChange(e);
					}}
				>
					{this.getAllLevels().map((level) => {
						return (
							<option key={level.level_number} value={level.level_number}>
								{level.level_number}
							</option>
						);
					})}
				</select>
			</div>
		);
	}

	renderInstructionButton() {
		return (
			<div className="ui labeled button">
				<div className="ui red button">
					<i className="question circle icon big"></i>
				</div>
				<label
					className="ui basic red left pointing label"
					onClick={() => console.log("Here we go again")}
				>
					Instructions
				</label>
			</div>
		);
	}

	render() {
		return (
			<div className="padding-top">
				<div className="ui equal width grid">{this.renderPipes()}</div>
				<div className="ui center aligned grid">
					<div className="ui large form">
						<div className="one fields">
							<div className="field">
								<label>Select the Level:</label>
								{this.renderInput()}
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
