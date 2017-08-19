import React from "react";
import RecipeBtn from "./RecipeBtn";
import { RecipeForm } from "./RecipeForm";
import { RecipePopup } from "./RecipePopup";
import defaultRecipes from "../json/defaultRecipes.json"
import shortid from "shortid";
import { Modal } from "./Modal";

export class MainContainer extends React.Component {
	constructor(props) {
		super(props);
		let recipes = 
			JSON.parse(
				window.localStorage.getItem("recipes")
				) 
			|| defaultRecipes;
		this.state = {
						ids: {},
						recipes: recipes,
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
				recipes[i] = recipe;
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

	deleteRecipe(key) {
		var recipes = this.state.recipes;
		var res = [];
		for(let i = 0; i < recipes.length; i++) {
			if(recipes[i].key == key) {
				continue;
			}
			else {
				res.push(recipes[i]);
			}
		}

		this.setState({ recipes: res });
	}

	componentDidUpdate() {
		window.localStorage.clear();
		let recipes = JSON.stringify(this.state.recipes)
		window.localStorage.setItem("recipes", recipes);
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
							let id = shortid.generate();
							return 	(<li key={ id }>
										{ el }
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
					 onDelete={ () => this.deleteRecipe(key) }
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
							Recipes&nbsp;
							<i className="icon-recipe"></i>
						</div>
						<hr/>
						{ btns }
						<div className="button is-medium  bottom add-btn"
							 onClick={ () => { this.setState({ formVis: true }) } }>
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

