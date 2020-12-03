import React, { useState } from 'react';

export default function Search( { onChange }: any) {
	const [ inputValue, setInputValue ] = useState('');

	const handleChange = (event: any) => {
		setInputValue(event.target.value);
		onChange( event.target.value);
	}

	return (
			<input type='text' placeholder='Search...' onChange={handleChange} value={inputValue}/>
	)
};