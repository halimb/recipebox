import React from "react"

const Tag = props => {
	return (
		<span 	className="tag is-light is-medium margin">
				{props.content}
				<button className="delete is-small"
						onClick={props.onClose}
						type="button"/>
		 </span>
	)
}

export default Tag