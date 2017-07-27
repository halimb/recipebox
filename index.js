import React from "react";
import ReactDOM from "react-dom";
import { RecipeForm } from "./components/RecipeForm";
import "./styles/style.scss";

class MainContainer extends React.Component {
	render() {
		return (
				<div className="main">
					<div className="tile">
						<div className="tile is-parent is-vertical is-2">
								<div className="tile box is-primary is-child">foo</div>
								<div className="tile notification is-primary is-child">bar</div>
						</div>
						<div className="tile is-parent">
							<div className="tile is-child">
								<RecipeForm/>
							</div>
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