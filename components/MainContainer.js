import React from "react"
import RecipeBtn from "./RecipeBtn"
import shortid from "shortid"
import { RecipeForm } from "./RecipeForm"

export class MainContainer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {recipes: []}
		this.addRecipe = this.addRecipe.bind(this);
	}

	addRecipe(recipe) {
		let recipes = this.state.recipes
		let key = shortid.generate()
		let ingredients = recipe.ingr.map(
			(el) => {
						return 	(<li key={ el.key }>
									{el.props.content}
								</li>)
					})
		recipes.push(<RecipeBtn key={ key }
							 name={ recipe.name }
							 ingr={ ingredients }/>)

		this.setState({recipes: recipes})
	}

	render() {
		return (
				<div className="main">
					<RecipeForm submitRecipe={this.addRecipe}/>
					<div className="flex-child">
						{this.state.recipes}
					</div>
				</div>
			)
	}
}

