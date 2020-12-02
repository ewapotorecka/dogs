import React, { useState } from 'react';

export default function Search( { onChange }: any) {
	const [ inputValue, setInputValue ] = useState('');

	//add type to event
	const handleChange = (event: any) => {
		setInputValue(event.target.value);
		onChange( event.target.value);
	}
	return (
		<div>
			<input type='text' placeholder='Type dog breed name' onChange={handleChange} value={inputValue}/>
		</div>
	)
};