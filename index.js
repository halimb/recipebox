import React from "react";
import ReactDOM from "react-dom";
import "./styles/style.scss";

class MainContainer extends React.Component {
	render() {
		return (
				<div className="main">
					<button className="button is-primary btn">Button</button>
					<div className="columns">
						<div className="column is-one-third">
							<button className="button is-primary is-fullwidth">1
							</button>
						</div>
						<div className="column">
							<button className="button is-primary is-fullwidth">2
							</button>
						</div>
						<div className="column">
							<button className="button is-primary is-fullwidth">3
							</button>
						</div>
						<div className="column">
							<button className="button is-primary is-fullwidth">4
							</button>
						</div>
					</div>
				</div>
			)
	}
}

ReactDOM.render(
	<MainContainer></MainContainer>,
	document.getElementById("app")
)