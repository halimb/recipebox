import React from "react";
import { RecipeForm } from "./RecipeForm";
import { Modal } from "./Modal";

export class RecipePopup extends React.Component {
	constructor(props) {
		super(props);
		this.state = { 
						// visible: false,
						edit: false
					 }
		this.editRecipe = this.editRecipe.bind(this);
	}

	editRecipe(recipe) {
		return;
	}

	// componentWillReceiveProps(newProps) {
	// 	this.setState({ visible: newProps.visible });
	// }

	render() {
		let content = this.state.edit ?
			(<RecipeForm submitRecipe={ this.editRecipe } />) 
			:
			(<div>
				<div className="modal-card-body">
					<h1 className="title center">
						{ this.props.name }
					</h1>
					<hr/>
					<ul className="ul">
					 { this.props.ingr } 
					</ul>
				</div>
				<span style={{ float: "right" }}>
					<i onClick={ this.props.onEdit }
					   className="icon-edit"></i>
					<i className="icon-delete"></i>
				</span>
			</div>);

			return (<Modal 
						visible={ this.props.visible }
						onClose={ this.props.onClose } 
						content={ content } />);
	}
}