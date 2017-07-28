import React from "react";
import { RecipeForm } from "./RecipeForm";

export class MainContainer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {recipes: []}
		this.addRecipe = this.addRecipe.bind(this);
	}

	addRecipe(recipe) {
		let recipes = this.state.recipes
		recipes.push(<div key={recipes.length}
						  className="box">
						<h1>{ recipe.name }</h1>
						<hr/>
						{ recipe.ingr }
					  </div>)
		this.setState({recipes: recipes})
	}

	render() {
		return (
				<div className="tile is-ancestor">
					<div className="tile is-parent is-7">
						<div className="tile is-child box">
							{this.state.recipes}
						</div>
					</div>
					<div className="tile is-parent is-5">
						<div  className="tile is-child">
							<RecipeForm addRecipe={this.addRecipe}/>
						</div>
					</div>
				</div>
			)
	}
}

