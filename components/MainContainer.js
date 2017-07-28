import React from "react";
import { RecipeForm } from "./RecipeForm";

export class MainContainer extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
				<div className="tile is-ancestor">
					<div className="tile is-parent is-7">
						<div className="tile is-child box"></div>
					</div>
					<div className="tile is-parent is-5">
						<div  className="tile is-child">
							<RecipeForm/>
						</div>
					</div>
				</div>
			)
	}
}