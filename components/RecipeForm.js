import React from "react"
import { IngredientsBox } from "./IngredientsBox"

export class RecipeForm extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
						active: true,
						submit: false,
						name: ""
					}

		this.clear = this.clear.bind(this)
		this.activate = this.activate.bind(this)
		this.onNameChange= this.onNameChange.bind(this)
		this.getIngredients = this.getIngredients.bind(this)
	}

	clear() {
		this.setState({
						active: false,
						submit: false,
						name: ""
					})
	}

	activate() {
		this.setState({active: true})
	}

	onNameChange(changeEvent) {
		this.setState({name: changeEvent.target.value});
	}

	getIngredients(ingr) {
		let name = this.state.name
		let recipe = {
						name,
						ingr 
					  }
		this.props.addRecipe(recipe);
		this.clear();
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
									className="input"
									onChange={this.onNameChange}
									value={this.state.name}/>
						</div>
					</div>
					<br/>
					<IngredientsBox submit={this.state.submit}
									submitIngr={this.getIngredients}
									active={this.state.active}/>
					<br/>
					<div className="field is-grouped">
						<div className="control">
							<button className="button is-primary"
									onClick={ () => this.setState({submit: true})}>
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