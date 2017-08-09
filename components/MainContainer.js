import React from "react";
import RecipeBtn from "./RecipeBtn";
import { RecipeForm } from "./RecipeForm";
import {RecipePopup} from "./RecipePopup";
import { Modal } from "./Modal";

export class MainContainer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
						ids: {},
						recipes: [],
						formVis: false
					}
		this.inflate = this.inflate.bind(this);
		this.addRecipe = this.addRecipe.bind(this);
		this.setFormVis = this.setFormVis.bind(this);
		this.setRecipeVis = this.setRecipeVis.bind(this);
	}

	setFormVis(visible) {
		this.setState( { formVis: visible } );
	}

	addRecipe(recipe) {
		let recipes = this.state.recipes;
		recipes.push(recipe);
		let ids = this.state.ids;
		ids[recipe.key] = false;
		this.setState({ 
						ids: ids,
						recipes: recipes
					  });
	}

	setRecipeVis(id, show = true) {
		let ids = this.state.ids;
		ids[id] = show;
		this.setState({ ids: ids });
	}

	inflate() {
		let recipeBtns = [];
		let recipePopups = [];
		let recipes = this.state.recipes;
		for(let i = 0; i < recipes.length; i++) {
			let recipe = recipes[i];
			let key = recipe.key;
			console.log(recipe)
			let ingredients = recipe.ingr.map(
				(el) => {
							return 	(<li key={ el.key }>
										{el.props.content}
									</li>)
						})

			recipeBtns.push(
				<RecipeBtn 
					 key={ key }
					 id={ key }
					 pop={ this.setRecipeVis }
					 name={ recipe.name }/>
				);

			recipePopups.push(
				<RecipePopup
					 key={ key }
					 id={ key }	 
					 onClose = { 
					 	() => { 
					 		this.setRecipeVis(key, false) 
					 	} 
					 }
					 name={ recipe.name }
					 ingr={ ingredients }
					 visible={ this.state.ids[key] }
					/>
				);

		}
		return (<div>{ recipeBtns }{ recipePopups }</div>);
	}

	render() {
		let recipes = this.inflate();
		let recipeForm = (<RecipeForm 
						onClose={ 
							() => this.setState({ formVis: false }) 
						}
						submitRecipe={this.addRecipe}/>)
		return (
				<div>
					<div className="main box">
						<div className="banner">
							Recipes
						</div>
						{ recipes }
						<div className="button is-primary bottom add-btn"
							 onClick={ () => { this.setState({ formVis: true }) } }>
							+ Add Recipe
						</div>
					</div>
					<Modal visible={ this.state.formVis } 
						   content={ recipeForm }/>
				</div>
			)
	}
}

