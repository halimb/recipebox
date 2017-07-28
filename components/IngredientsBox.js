import React from "react";

export class IngredientsBox extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
						live: "",
						ingredients: [],
						maxIngredients: "blabla"
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
			ingredients.push(<span className="tag is-light margin" 
									key={ingredients.length}>
									{newIngr}
							 </span>);
			this.setState({
						live: "",
						ingredients: ingredients
					});

			// Test for max number of ingredients
			if(ingredients.length > 9) {

			}
		}
	}

	render() {
		return (
				<form onSubmit={this.addIngredient} className="field box">
					<h1>Ingredients</h1>
					<br/>
					{this.state.ingredients}
					<hr/>
					<div className="field has-addons">
						<p className="control">
							<input  onChange={this.handleChange} 
									value={this.state.live}
									placeholder="Add an ingredient" 
									className="input"/>
						</p>
						<p className="control">
							<button onClick={this.addIngredient} className="button is-primary">
								+
							</button>
						</p>
					</div>
					<p className="help is-danger">
						{this.state.maxIngredients}
					</p>
				</form>
		)
	}
}