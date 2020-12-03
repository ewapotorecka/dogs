import React, { useState } from 'react';
import BreedsList from './components/BreedsList';
import Breed from './components/Breed';
import { breedInfo } from './interfaces/breedInfo';
import './App.scss';

function App() {
	const [ selectedBreed, setSelectedBreed ] = useState<breedInfo | { displayName: null, URLFragment: null}>({ displayName: null, URLFragment: null });

	return (
		<div>
			{ selectedBreed.displayName && <Breed breed={ selectedBreed } onBack={ () => setSelectedBreed({ displayName: null, URLFragment: null })}  /> }
			{ !selectedBreed.displayName && <BreedsList onBreedChoice={ setSelectedBreed } />}

		</div>
	)
}

export default App;
