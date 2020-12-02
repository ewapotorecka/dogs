import React, { useEffect, useState } from 'react';
import Search from '../Search';

interface breeds {
	[key: string]: string[];
};

interface BreedListProps {
	onBreedChoice: ( breed: string ) => void;
}

export default function BreedsList( {onBreedChoice}: BreedListProps ){
	const [ breeds, setBreeds ] = useState<breeds>({});
	const [ breedNames, setBreedNames ] = useState<string[]>();
	const [ filteredBreeds, setFiteredBreeds ] = useState([]);
	const [ isLoaded, setIsLoaded ] = useState( false );
	const [ error, setError ] = useState<Error | null>( null );

	const createVariationNames = (breed: string, subBreeds: string[] ): string[] => {
		const variationNames = [];

		for (const subBreed of subBreeds ) {
			variationNames.push(`${subBreed}/${breed}`);
		}

		return variationNames;
	};
	const createBreedNamesArray = ( data: breeds ) => {
		const breedNames: string[] = [];
		

		for (const dogBreed in data) {
		  if (data[dogBreed].length > 0) {
			  console.log( data[dogBreed])
			breedNames.push(...createVariationNames(dogBreed, data[ dogBreed ]));
		  } else {
			breedNames.push(dogBreed);
		  }
		}

		return breedNames;
	};
	

	const handleClick = ( e: React.MouseEvent<HTMLElement> ) => {
		const clickedBreed = e.currentTarget.getAttribute( 'value' )!;

		onBreedChoice( clickedBreed );
	}

	useEffect( () => {
		fetch( 'https://dog.ceo/api/breeds/list/all' )
			.then( response => response.json() )
			.then( data => {
				setBreeds( data.message );
				setBreedNames( createBreedNamesArray( data.message ) );
				setIsLoaded( true );
			} )
			.catch( error => {
				setError( error );
				setIsLoaded( true );
			} )
	}, [] );

	if ( error ) {
		return <div>{ error.message }</div>
	} else if ( !isLoaded ) {
		return <div>Loading...</div>
	} else if ( breedNames ) {
		// const breedNames: string[] = [];

		// for (const dogBreed in breeds) {
		//   if (hasVariations(dogBreed)) {
		// 	breedNames.push(...createVariationNames(dogBreed));
		//   } else {
		// 	breedNames.push(dogBreed);
		//   }
		// }

		return (
		  <div>
			<Search />
			{breedNames.map((breed, index) => {
			  return (
				<div key={index}>
				  <button onClick={ handleClick } value={ breed }>{breed}</button>
				</div>
			  );
			})}
		  </div>
		);
	} else {
		return <div></div>
	}
};