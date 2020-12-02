import React, { useState } from 'react';
import BreedsList from './components/BreedsList';
import Breed from './components/Breed';
import './App.css';

function App() {
	const [ selectedBreed, setSelectedBreed ] = useState( 'hound' );

	if ( selectedBreed ) {
		return <Breed breed={ selectedBreed} onBack={ () => setSelectedBreed('')}/>
	} else {
		return <BreedsList onBreedChoice={setSelectedBreed}/>
	}
}

export default App;
