import React from "react"
import shortid from "shortid"
import Tag from "./Tag"

export class RecipeForm extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
						name: "",
						ingr: "",
						nameMsg: "",
						nameClass: "",
						ingMsg: "",
						ingClass: "",
						maxIngMsg: "",
						maxIngClass: "",
						ingredients: [],
						submit: false,
						disabled: false
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
						ingredients: [],
						submit: false,
						maxIngMsg: "",
						maxIngClass: "",
						disabled: false
					})
	}

	onNameChange(changeEvent) {
		this.setState({name: changeEvent.target.value})
	}

	handleIngr(event) {
		this.setState({ingr: event.target.value})
	}

	closeTag(key) {
		let ingr = this.state.ingredients
		// console.log("before:")
		// console.log(ingredients[0].key)
		ingr = ingr.filter((el) => { return el.key != key })
		// console.log("after:")
		// console.log(ingredients)
		this.setState({ingredients: ingr})
	}

	addIngredient(e) {
		if(e) { e.preventDefault() }
		let newIngr = this.state.ingr
		if(newIngr != "") {
			let ingredients = this.state.ingredients
			// Test for max number of ingredients
			if(ingredients.length > 12) {
				this.setState({
								maxIngMsg: "seems like enough ingredients!",
								maxIngClass: " is-danger",
								disabled: true,
								ingr: ""
							})
			}
			else {
				let key = shortid.generate();
				ingredients.push(
					<Tag content={ newIngr } 
						key={ key }
						onClose={ () => { this.closeTag(key) } }
					/>
				);
				this.setState({
							ingr: "",
							ingredients: ingredients,
							maxIngMsg: "",
							maxIngClass: "",
							disabled: false
						})
			}
		}
	}

	submitRecipe() {
		let name = this.state.name
		let ingr = this.state.ingredients
		let recipe = {
						name,
						ingr 
					  }
		this.props.addRecipe(recipe)
		this.reset()
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

	render() {
		return (
				<div onFocus={ this.activate } className="box fit">
					<h1>Add a recipe</h1>
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
					<div className={ this.state.ingClass }>
						<form onSubmit={this.addIngredient} className="field box">
							<h1>Ingredients</h1>
							{this.state.ingredients.length ? 
								<br/> : ""}
								{this.state.ingredients}
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
	}
}