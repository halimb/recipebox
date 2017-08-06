import React from "react";

export default class RecipePopup extends React.Component {
	constructor(props) {
		super(props);
		this.state = { 
						visible: false,

					 }
	}

	componentWillReceiveProps(newProps) {
		this.setState({ visible: true });
	}

	render() {
		var content = this.props.visible ?
			(<div className="modal is-active">
				<div className="modal-card  box auto-width">
				<button className="modal-close close"></button>
					<div className="modal-card-body">
						<h1>{ this.props.name }</h1>
						<hr/>
						<ul className="ul">
						 { this.props.ingr } 
						</ul>
					</div>
					<span style={{ float: "right" }}>
						<i className="icon-edit"></i>
						<i className="icon-delete"></i>
					</span>
				</div>
			</div>) :
			<div></div>;
		return content;
	}
}