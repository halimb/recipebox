import React from "react";

export default class RecipePopup extends React.Component {
	constructor(props) {
		super(props);
		this.state = { visible: false }
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
						bla
					</div>
				</div>
			</div>) :
			<div></div>;
		return content;
	}
}