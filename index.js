import React from "react";
import ReactDOM from "react-dom";
import { MainContainer } from "./components/MainContainer";
import "./styles/style.scss";

class App extends React.Component {
	render() {
		return (
				<div className="main box">
					<MainContainer/>
				</div>
			)
	}
}

ReactDOM.render(
	<App/>	,
	document.getElementById("app")
)