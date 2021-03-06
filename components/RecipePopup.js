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
					<i  title="edit"
						onClick={ this.props.onEdit }
						className="icon-edit pointer"></i>
					<i  title="delete"
						onClick={ this.props.onDelete }
						className="icon-delete pointer"></i>
				</span>
			</div>);

			return (<Modal 
						visible={ this.props.visible }
						onClose={ this.props.onClose } 
						content={ content } />);
	}
}