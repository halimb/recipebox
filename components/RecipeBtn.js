import React from "react";
import shortid from "shortid";

export default class RecipeBtn extends React.Component {
	constructor(props) {
		super(props);
		this.state = { pop: false };
	}

	render() {
		let key = shortid.generate();
		return (
				<div className="button is-medium btn"
					 onClick={ () => this.props.pop(this.props.id) }>
					<h1>{ this.props.name }</h1>
				</div>
		)
	}
}