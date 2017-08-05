import React from "react";
import shortid from "shortid";
import RecipePopup from "./RecipePopup";

export default class RecipeBtn extends React.Component {
	constructor(props) {
		super(props);
		this.state = { pop: false };
	}

	render() {
		let key = shortid.generate();
		return (
				<div key={ key }
					className="button is-large btn"
					onClick={ () => this.setState({ pop: !this.state.pop }) }>
					<h1>{ this.props.name }</h1>
					<RecipePopup visible={ this.state.pop }/>
				</div>
		)
	}
}


/*
<hr/>
<ul>
	{ props.ingr }	
</ul>
*/