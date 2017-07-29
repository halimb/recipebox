import React from "react"
import shortid from "shortid"

const Recipe = props => {
	let key = shortid.generate()
	console.log(props)
	return (
		<div className="is-child box">
			<div key={ key }
				className="box">
				<h1>{ props.name }</h1>
				<hr/>
				<ul>
					{ props.ingr }	
				</ul>
		  </div>
		</div>
	)
}

export default Recipe