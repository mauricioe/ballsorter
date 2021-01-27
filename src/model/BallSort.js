import Pipe from "./Pipe";

export const numberOfBalls = 4;
export const color_flag = "white";
export const flag = -1;

class BallSort {
	constructor(level) {
		this.initLevel(level);
	}

	getCurrentLevel() {
		return this.currentLevel;
	}

	getPipes() {
		return this.pipes;
	}

	initLevel(level) {
		this.pipes = [];
		this.ballRaized = flag;
		this.currentLevel = level.level_number;
		level.pipes.map((pipe, index) => {
			return this.pipes.push(new Pipe(pipe, index));
		});
	}

	changeLevel(level) {
		this.initLevel(level);
	}

	clicked(pipeIndex) {
		if (this.ballRaized === flag) {
			// This is the first click and the pipe decides wich ball
			// will be rized
			this.ballRaized = this.pipes[pipeIndex].clickFirst();
		} else {
			// there's another ball raized, and now we need to check
			// if we can move the ball
			this.ballRaized = this.pipes[pipeIndex].clickSecond(
				this.pipes[this.ballRaized]
			);
		}
	}

	checkForWin() {
		//Check if thi is the final
		let ok = true;
		let pipe_index = 0;
		//Iterate over the pipes
		while (ok && pipe_index < this.pipes.length) {
			ok = this.pipes[pipe_index].sameColor();
			pipe_index += 1;
		}

		return ok;
	}
}

export default BallSort;
