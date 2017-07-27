import React from "react";

export class IngredientsBox extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
						live: "",
						ingredients: []
					};
		this.addIngredient = this.addIngredient.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(event) {
		this.setState({live: event.target.value})
	}

	addIngredient(e) {
		e.preventDefault();
		let newIngr = this.state.live;
		if(newIngr != "") {
			let ingredients = this.state.ingredients;
			ingredients.push(<li key={ingredients.length} >
									{newIngr}
							 </li>);
			this.setState({
						live: "",
						ingredients: ingredients
					});
		}
	}

	render() {
		return (
				<form onSubmit={this.addIngredient} className="field box">
					<h1>Ingredients</h1>
					{this.state.ingredients}
					<hr/>
					<div className="columns">
						<div className="control column is-10">
							<input  onChange={this.handleChange} 
									value={this.state.live}
									placeholder="Add an ingredient" 
									className="input"
									/>
						</div>
						<div className="column">
							<button onClick={this.addIngredient} className="button is-primary">
								+
							</button>
						</div>
					</div>
				</form>
		)
	}
}