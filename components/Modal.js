import React from "react";

export class Modal extends React.Component {
	constructor(props) {
		super(props);
		this.state = { visible: "" };
		this.close = this.close.bind(this);
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick(e) {
		if(e.target.id == "background") {
			this.close();
		}
	}

	close() {
		this.setState({ visible: "" })
		if(this.props.onClose){
			this.props.onClose()
		}
	}

	componentWillReceiveProps(newProps) {
		let visible = newProps.visible ?
			"is-active" : "";
		this.setState( { visible: visible } ); 
	}

	render() {
		return (
			<div id="background" 
				 onClick={ this.handleClick } 
				 className={ "modal modal-bg " + this.state.visible }>
				<div  className="modal-card popup box">
					<button onClick={ this.close }
						className="modal-close close"></button>
					<div className="modal-card-body">
						{ this.props.content }
					</div>
				</div>	
			</div>
			)
	}
}