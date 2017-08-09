import React from "react";
import { RecipeForm } from "./RecipeForm";
import { Modal } from "./Modal";

export class RecipePopup extends React.Component {
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
		this.setState({ visible: newProps.visible[this.props.id] });
	}

	render() {
		let content = this.state.edit ?
			(<RecipeForm submitRecipe={ this.editRecipe } />) 
			:
			(<div>
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

		let res = this.props.visible ?
			(<Modal onClose={ this.props.onClose } 
					content={ content } />) :
			(<div></div>);
		return res;
	}
}