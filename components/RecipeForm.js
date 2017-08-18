import React from "react";
import shortid from "shortid";
import Tag from "./Tag";
import { Modal } from "./Modal";

export class RecipeForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
						name: "",
						ingr: "",
						nameMsg: "",
						nameClass: "",
						ingMsg: "",
						ingClass: "",
						maxIngMsg: "",
						maxIngClass: "",
						ingrTags: [],
						ingredients: [],
						submit: false,
						disabled: false,
						childrenLimit: 12
					}

		this.reset = this.reset.bind(this)
		this.submit = this.submit.bind(this)
		this.closeTag = this.closeTag.bind(this)
		this.handleIngr = this.handleIngr.bind(this)
		this.onNameChange = this.onNameChange.bind(this)
		this.addIngredient = this.addIngredient.bind(this)
		this.submitRecipe = this.submitRecipe.bind(this)
	}

	reset() {
		this.setState({
						ingr: "",
						name: "",
						nameMsg: "",
						nameClass: "",
						ingMsg: "",
						ingClass: "",
						ingrTags: [],
						ingredients: [],
						submit: false,
						maxIngMsg: "",
						maxIngClass: "",
						disabled: false,
						prefilledRecipe: false
					});
		if(this.props.onClose) {
			this.props.onClose();
		}
	}

	onNameChange(changeEvent) {
		this.setState({name: changeEvent.target.value})
	}

	handleIngr(event) {
		this.setState({ingr: event.target.value})
	}

	closeTag(key) {
		let ingr = this.state.ingredients;
		let ingrTags = this.state.ingrTags;
		let limit = this.state.childrenLimit;
		ingrTags = ingrTags.filter(
			(el) => { 
				return el.key != key 
			}
		);
		ingr = ingrTags.map(
			(tag) => {
				return tag.props.content;
			}
		)

		if(this.state.ingredients.length <= 12) {
			this.setState({
							ingr: "",
							ingredients: ingr,
							ingrTags: ingrTags,
							maxIngMsg: "",
							maxIngClass: "",
							disabled: false
						})
		} 
	}

	inflateTags(ingredients) {
		let res = []
		for(let i = 0; i < ingredients.length; i++) {
			let key = shortid.generate();
			res.push(
					<Tag content={ ingredients[i] } 
						key={ key }
						onClose={ 
							() => { 
								this.closeTag(key) 
							} 
						}
					/>
				);
		}
		return res;
	}

	addIngredient(e) {
		if(e) { e.preventDefault() }
		let newIngr = this.state.ingr;
		let limit = this.state.childrenLimit;
		if(newIngr != "") {
			let ingredients = this.state.ingredients
			let ingrTags = this.state.ingrTags;
			// Test for max number of ingredients
			if( ingredients.length <= limit ){
				//add ingredient
				ingredients.push(newIngr);
				//add ingredient tag
				let key = shortid.generate();
				ingrTags.push(
							<Tag content={ newIngr } 
								key={ key }
								onClose={ 
									() => { 
										this.closeTag(key) 
									} 
								}
							/>
						);
			}
			if(ingredients.length == limit) {
				this.setState({
								maxIngMsg: "seems like enough ingredients!",
								maxIngClass: " is-danger",
								disabled: true,
								ingr: ""
							})
			}
			else {
				this.setState({
						ingr: "",
						ingrTags: ingrTags,
						ingredients: ingredients,
						maxIngMsg: "",
						maxIngClass: "",
						disabled: false
					})
			}
		}
	}

	submitRecipe() {
		let edited = this.state.prefilledRecipe; 
		let key = edited ? edited.key : shortid.generate();
		let name = this.state.name;
		let ingr = this.state.ingredients;
		let recipe = {
						key,
						name,
						ingr 
					  }
		this.props.submitRecipe(recipe);		
		this.reset();
	}

	submit() {
		this.addIngredient()
		this.setState({
				submit: true,
				nameMsg: "",
				nameClass: "",
				ingMsg: "",
				ingClass: ""
			})
	}

	componentDidUpdate() {
		if(this.state.submit) {
			let nameLen = this.state.name.length
			let ingLen = this.state.ingredients.length
			
			if(nameLen && ingLen) {
				this.submitRecipe()
			}

			//Test for required fields
			else {
				if(nameLen == 0) {
					this.setState({
								nameClass: " is-danger",
								nameMsg: "* a good recipe must have name!",
								submit: false
							})
				}
				if(ingLen == 0) {
					this.setState({
								ingClass: " ingBox",
								ingMsg: "* a good recipe must have ingredients!",
								submit: false
							})
				}
			}
		}
	}

	componentWillReceiveProps(nextProps) {
		if(nextProps.prefill != false) {
			var prefill = nextProps.prefill;	
			this.setState({
						name: prefill.name,
						prefilledRecipe: prefill,
						ingredients: prefill.ingr,
						ingrTags: this.inflateTags(prefill.ingr)
					});
		}
	}

	render() {
		let defaultName = this.props.prefill ?
			this.props.prefill.name : "";

		let recipeForm = (
				<div onFocus={ this.activate } className="flex-form flex-child">
					<h1>{ this.props.title }</h1>
					
					<br/>
					<div className="field">
						<div className="control">
							<input  type="text" 
									placeholder="name" 
									className={ "input" + this.state.nameClass}
									onChange={this.onNameChange}
									value={this.state.name}/>
							<p className="help is-danger">
								{this.state.nameMsg}
							</p>
						</div>
					</div>
					<br/>
					<div className={ this.state.ingClass } >
						<form onSubmit={this.addIngredient} className="field ing">
							<h1>Ingredients</h1>
							{this.state.ingredients.length ? 
								<br/> : ""}
								{this.state.ingrTags}
							<hr/>
							<div className="field has-addons">
								<p className="control">
									<input  value={this.state.ingr}
											onChange={this.handleIngr} 
											disabled={this.state.disabled}
											placeholder="Add an ingredient" 
											className={"input "+ this.state.maxIngClass}/>
								</p>
								<p className="control">
									<button onClick={this.addIngredient} className="button is-primary">
										+
									</button>
								</p>
							</div>
							<p className="help is-danger">
								{this.state.maxIngMsg}
							</p>
						</form>
					</div>
					<p className="help is-danger">
							{this.state.ingMsg}
						</p>
					<br/>
					<div className="field is-grouped">
						<div className="control">
							<button className="button is-primary"
									onClick={this.submit}>
								Add
							</button>
						</div>
						<div className="control">
							<button onClick={this.reset} className="button is-outlined">
								Cancel
							</button>
						</div>
					</div>
				</div>
			)

		
		return (
				<Modal content={ recipeForm }
					   visible={ this.props.visible } 
					   onClose={ this.reset }/> 
			)
	}
}