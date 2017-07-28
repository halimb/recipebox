import React from "react";

export class IngredientsBox extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
						live: "",
						ingredients: [],
						maxIngMsg: "",
						maxIngClass: "",
						disabled: false
					};
		this.addIngredient = this.addIngredient.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.reset = this.reset.bind(this);
	}

	reset() {
		this.setState( {
							live: "",
							ingredients: [],
							maxIngMsg: "",
							maxIngClass: "",
							disabled: false
						} )
	}

	handleChange(event) {
		this.setState({live: event.target.value})
	}

	addIngredient(e) {
		if(e) {
			e.preventDefault();
		}
		let newIngr = this.state.live;
		if(newIngr != "") {
			let ingredients = this.state.ingredients;
			// Test for max number of ingredients
			if(ingredients.length > 9) {
				this.setState({
								maxIngMsg: "seems like enough ingredients!",
								maxIngClass: " is-danger",
								disabled: true,
								live: ""
							});
			}
			else {
				newIngr = (<span className="tag is-light margin" 
								key={ingredients.length}>
								{newIngr}
							</span>)
				ingredients.push(<span className="tag is-light margin" 
										key={ingredients.length}>
										{newIngr}
								 </span>);
				this.setState({
							live: "",
							ingredients: ingredients,
							maxIngMsg: "",
							maxIngClass: "",
							disabled: false
						});
			}
			this.props.submitIngr(ingredients);
		}
	}

	componentDidUpdate(prevProps, prevState) {
		if(this.props.submit) {
			this.addIngredient()
		}
	}

	componentWillReceiveProps(nextProps) {
		// if(this.props.submit) {
		// 	this.addIngredient()
		// }
		if( !nextProps.active ) {
			this.reset()
		}
	}

	render() {
		return (
				<form onSubmit={this.addIngredient} className="field box">
					<h1>Ingredients</h1>
					<br/>
					{this.state.ingredients}
					<hr/>
					<div className="field has-addons">
						<p className="control">
							<input  value={this.state.live}
									onChange={this.handleChange} 
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
		)
	}
}