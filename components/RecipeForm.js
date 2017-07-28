import React from "react";
import { IngredientsBox } from "./IngredientsBox";

export class RecipeForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {foo: "bar"}
	}

	render() {
		return (
				<div className="box fit">
					<h1>Add a recipe</h1>
					<br/>
					<div className="field">
						<div className="control">
							<input placeholder="name" type="text" className="input"/>
						</div>
					</div>
					<br/>
					<IngredientsBox/>
					<br/>
					<div className="field is-grouped">
						<div className="control">
							<button className="button is-primary">
								Add
							</button>
						</div>
						<div className="control">
							<button className="button is-outlined">
								Cancel
							</button>
						</div>
					</div>
				</div>
			)
	}
}