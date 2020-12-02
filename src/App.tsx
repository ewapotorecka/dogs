import React, { useState } from 'react';
import BreedsList from './components/BreedsList';
import Breed from './components/Breed';
import './App.scss';

function App() {
	const [ selectedBreed, setSelectedBreed ] = useState( '' );

	return (
		<div>
			{ selectedBreed && <Breed breed={ selectedBreed} onBack={ () => setSelectedBreed('')}  /> }
			{ !selectedBreed && <BreedsList onBreedChoice={ setSelectedBreed } />}

		</div>
	
		
	)
	// if ( selectedBreed ) {
	// 	return <Breed breed={ selectedBreed} onBack={ () => setSelectedBreed('')}/>
	// } else {
	// 	return <BreedsList onBreedChoice={setSelectedBreed}/>
	// }
}

export default App;
