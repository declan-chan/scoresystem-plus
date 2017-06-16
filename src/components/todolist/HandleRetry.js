import React from 'react'

const HandleRetry = ({ errorMessage, onRetry }) => (
	<div>
		<p>Could not fetch items {errorMessage} </p>
		<button onClick={() => onRetry()}>RETRY</button>
	</div>
);

export default HandleRetry;