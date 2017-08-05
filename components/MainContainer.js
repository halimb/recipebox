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
							 ingr={ ingredients }/>
							 )

		this.setState({recipes: recipes})
	}

	render() {
		return (
				<div className="tile is-ancestor">
					<div className="tile is-parent is-5">
						<div  className="tile is-child">
							<RecipeForm addRecipe={this.addRecipe}/>
						</div>
					</div>
					<div className="tile is-parent is-7">
						{this.state.recipes}
					</div>
				</div>
			)
	}
}

