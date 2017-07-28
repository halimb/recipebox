import React from "react"
import { IngredientsBox } from "./IngredientsBox"

export class RecipeForm extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
						name: "",
						nameMsg: "",
						nameClass: "",
						ingMsg: "",
						ingClass: "",
						ingredients: [],
						active: true,
						submit: false
					}

		this.clear = this.clear.bind(this)
		this.submit = this.submit.bind(this)
		this.activate = this.activate.bind(this)
		this.onNameChange = this.onNameChange.bind(this)
		this.submitRecipe = this.submitRecipe.bind(this)
		this.getIngredients = this.getIngredients.bind(this)
	}

	clear() {
		this.setState({
						name: "",
						nameMsg: "",
						nameClass: "",
						ingMsg: "",
						ingClass: "",
						ingredients: [],
						active: false,
						submit: false,
						preSubmit: false
					})
	}

	activate() {
		this.setState({active: true})
	}

	onNameChange(changeEvent) {
		this.setState({name: changeEvent.target.value});
	}

	getIngredients(ingr) {
		this.setState({
			ingredients: ingr,
			ingMsg: "",
			ingClass: ""
		},

		() => 	{
					if(this.state.preSubmit) {
						 this.submitRecipe() 
					}
				}
		);
	}

	submitRecipe() {
		let name = this.state.name
		let ingr = this.state.ingredients
		let recipe = {
						name,
						ingr 
					  }
		this.props.addRecipe(recipe);
		this.clear();
	}

	submit() {
		this.setState({
				preSubmit: true,
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

			else {
				if(nameLen == 0) {
					this.setState({
									nameClass: " is-danger",
									nameMsg: "* a good recipe must have name!",
									preSubmit: false,
									submit: false
								})
				}
				if(ingLen == 0) {
							this.setState({
										ingClass: " ingBox",
										ingMsg: "* a good recipe must have ingredients!",
										submit: false
									})
					window.setTimeout(()=>
					{
						if(this.state.preSubmit){
							this.setState({preSubmit: false})
						}
					}, 500);	
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
						<IngredientsBox preSubmit={this.state.preSubmit}
										submit={this.state.submit}
										submitIngr={this.getIngredients}
										active={this.state.active}/>
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
							<button onClick={this.clear} className="button is-outlined">
								Cancel
							</button>
						</div>
					</div>
				</div>
			)
	}
}