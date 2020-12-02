import React, { useEffect, useState } from 'react';
import Search from '../Search';
import loading from '../../icons/480.gif'

interface breeds {
	[key: string]: string[];
};

interface breedInfo {
	displayName: string,
	URLFragment: string
}

interface BreedListProps {
	onBreedChoice: ( breed: string ) => void;
}

export default function BreedsList( {onBreedChoice}: BreedListProps ){
	const [ breedInfo, setBreedInfo ] = useState<breedInfo[]>([])!;
	const [ filteredBreeds, setFilteredBreeds ] = useState<breedInfo[]>([])!;
	const [ isLoaded, setIsLoaded ] = useState( false );
	const [ error, setError ] = useState<Error | null>( null );

	const createSubBreedInfo = (breed: string, subBreeds: string[] ): breedInfo[] => {
		const subBreedInfo = [];

		for (const subBreed of subBreeds ) {
			subBreedInfo.push( {
				displayName: `${capitalize(subBreed)} ${capitalize(breed)}`,
				URLFragment: `${breed}/${subBreed}`
			} );
		}

		return subBreedInfo;
	};

	const createBreedsInfo = ( data: breeds ) => {
		const breedsInfo: breedInfo[] = [];

		for (const dogBreed in data) {
			if (data[dogBreed].length > 0) {
			  breedsInfo.push(...createSubBreedInfo(dogBreed, data[ dogBreed ]));
			} else {
				breedsInfo.push({
					displayName: capitalize( dogBreed ),
					URLFragment: dogBreed
				} );
			}
		  }

		  return breedsInfo;
	}

	const handleClick = ( e: React.MouseEvent<HTMLElement> ) => {
		const clickedBreed = e.currentTarget.getAttribute( 'value' )!;

		onBreedChoice( clickedBreed );
	}

	const filterBreeds = ( phrase: string) => {
		const result = breedInfo.filter( element => {
			return element.displayName.toLowerCase().startsWith( phrase.toLocaleLowerCase() )
		} );

		setFilteredBreeds( result );
	}

	useEffect( () => {
		fetch( 'https://dog.ceo/api/breeds/list/all' )
			.then( response => response.json() )
			.then( data => createBreedsInfo( data.message ))
			.then( breedsInfo => {
				setBreedInfo(breedsInfo );
				setFilteredBreeds(breedsInfo);
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
		return <div><img src={loading} alt="loading"/></div>
	} else  {

		return (
		  <div>
			<Search onChange={ filterBreeds }/>
			{filteredBreeds.map((breedInfo, index) => {
			  return (
				<div key={index}>
				  <button onClick={ handleClick } value={ breedInfo.URLFragment }>{breedInfo.displayName}</button>
				</div>
			  );
			})}
		  </div>
		);
	}
};

const capitalize = ( name: string ) => {
	return name[0].toUpperCase() + name.slice( 1 );
}