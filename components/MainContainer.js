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
						formVis: false,
						edit: false,
						current: false
					}
		this.inflate = this.inflate.bind(this);
		this.addRecipe = this.addRecipe.bind(this);
		this.setFormVis = this.setFormVis.bind(this);
		this.editRecipe = this.editRecipe.bind(this);
		this.setRecipeVis = this.setRecipeVis.bind(this);
	}

	setFormVis(visible) {
		this.setState( { formVis: visible } );
	}

	addRecipe(recipe) {
		let exists = false;
		let recipes = this.state.recipes;
		for(var i = 0; i < recipes.length; i++) {
			if(recipe.key == recipes[i].key) {
				console.log("before: ")
				console.log(recipes)
				console.log(recipe)
				console.log("found!");
				recipes[i] = recipe;
				console.log("after: ")
				console.log(recipes)
				exists = true;
			}
		}
		if(!exists) {
			recipes.push(recipe);
		}
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

	editRecipe(key) {
		var recipes = this.state.recipes;
		var res = false;
		for(let i = 0; i < recipes.length; i++) {
			if(recipes[i].key == key) {
				res = recipes[i];
			}
		}
		this.setState({ edit: true,
						current: res,
						formVis: true }); 
	}

	inflate() {
		let res = {};
		let recipeBtns = [];
		let recipePopups = [];
		let recipes = this.state.recipes;
		for(let i = 0; i < recipes.length; i++) {
			let recipe = recipes[i];
			let key = recipe.key;
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
					 pop={ () => this.setRecipeVis(key) }
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
					 onEdit={ () => {
					 			this.setRecipeVis(key, false); 
					 			this.editRecipe(key);
					 			}
							}
					 visible={ this.state.ids[key] }
					/>
				);

		}
		res.btns = recipeBtns;
		res.popups = recipePopups;
		return res;
	}

	render() {
		let inflated = this.inflate();
		let btns = inflated.btns;
		let popups = inflated.popups;
		return (
				<div>
					<div className="main box">
						<div className="banner">
							Recipes
						</div>
						{ btns }
						<div className="button is-primary bottom add-btn"
							 onClick={() => { this.setState({ formVis: true }) } }>
							+ Add Recipe
						</div>
					</div>
					{ popups }
					<RecipeForm 
						title={ this.state.edit ? 
							"Edit" : "Add a recipe" }
						onClose={ 
							() =>
							 this.setState({ formVis: false,
									 		 current: false,
									 		 edit: false }) 
						}
						visible={ this.state.formVis }
						prefill={ this.state.current }
						submitRecipe={ this.addRecipe }/>
				</div>
			)
	}
}

