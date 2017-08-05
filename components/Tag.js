import React from "react"

const Tag = props => {
	return (
		<div 	className="tag is-light is-medium margin">
				<p className="break">{props.content}</p>
				<button className="delete is-small"
						onClick={props.onClose}
						type="button"/>
		 </div>
	)
}

export default Tag