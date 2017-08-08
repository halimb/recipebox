import React from "react";
import { RecipeForm } from "./RecipeForm";

export default class RecipePopup extends React.Component {
	constructor(props) {
		super(props);
		this.state = { 
						visible: false,
						edit: false
					 }
		this.editRecipe = this.editRecipe.bind(this);
	}

	editRecipe(recipe) {
		return;
	}

	componentWillReceiveProps(newProps) {
		this.setState({ visible: newProps.pop });
	}

	render() {
		let modal = this.state.edit ?
			(<RecipeForm submitRecipe={ this.editRecipe } />) 
			:
			(<div>
				<button onClick={ 
							() => {
								this.setState({ visible: false })
							} 
						}
						className="modal-close close"></button>
				<div className="modal-card-body">
					<h1>{ this.props.name }</h1>
					<hr/>
					<ul className="ul">
					 { this.props.ingr } 
					</ul>
				</div>
				<span style={{ float: "right" }}>
					<i onClick={ () => { this.setState({edit: true}) }}
					   className="icon-edit"></i>
					<i className="icon-delete"></i>
				</span>
			</div>);

		let content = this.state.visible ?
			(<div className="modal is-active">
				<div className="modal-card  box auto-width">
					{ modal }
				</div>	
			</div>) :
			(<div></div>);
		return content;
	}
}