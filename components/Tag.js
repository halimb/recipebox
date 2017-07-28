import React from "react"

const Tag = props => {
	return (
		<span 	className="tag is-primary is-medium margin">
				{props.content}
				<button className="delete is-small"
						onClick={props.onClose}/>
		 </span>
	)
}

export default Tag