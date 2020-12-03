import React, { useEffect, useState } from 'react';
import Search from '../Search';

import './breeds-list.scss';
import { breedInfo } from '../../interfaces/breedInfo';

interface breeds {
	[key: string]: string[];
};

interface BreedListProps {
	onBreedChoice: ( breed: {displayName: string, URLFragment: string} ) => void;
}

export default function BreedsList( {onBreedChoice}: BreedListProps ){
	const [ breedsData, setBreedsData ] = useState<breedInfo[]>([])!;
	const [ filteredBreedsData, setFilteredBreedsData ] = useState<breedInfo[]>([])!;
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

	const convertBreedsData = ( data: breeds ) => {
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
		const selectedBreed = {
			displayName: e.currentTarget.getAttribute( 'name' )!,
			URLFragment: e.currentTarget.getAttribute( 'value' )!
		}

		onBreedChoice( selectedBreed );
	}

	const filterBreeds = ( phrase: string) => {
		const result = breedsData.filter( element => {
			if ( element.displayName.includes( ' ' ) ) {
				const subBreedName = element.displayName.substring( 0, element.displayName.indexOf(' ' ) - 1 );
				const breedName = element.displayName.substring( element.displayName.indexOf(' ') + 1, element.displayName.length );

				return ( breedName.toLocaleLowerCase().startsWith( phrase.toLocaleLowerCase() )|| subBreedName.toLowerCase().startsWith( phrase.toLocaleLowerCase() ) )
			} else {
				return element.displayName.toLowerCase().startsWith( phrase.toLocaleLowerCase() )
			}
		} );

		setFilteredBreedsData( result );
	}

	useEffect( () => {
		fetch( 'https://dog.ceo/api/breeds/list/all' )
			.then( response => response.json() )
			.then( data => convertBreedsData( data.message ))
			.then( breeds => {
				setBreedsData(breeds );
				setFilteredBreedsData(breeds);
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
		return <div></div>
	} else  {

		return (
		  <div className='breed-list-container'>
			  <div className='search-container'>
				<h1>Welcome to doggie search</h1>
			 	<Search onChange={ filterBreeds }/>
				<p>Click on a breed to see some lovely doggies</p>
			  </div>
			<div className='breed-list'>
				{filteredBreedsData.map((breedInfo, index) => {
				return (
					<div key={index} className='breed-button-container'>
						<button onClick={ handleClick } value={ breedInfo.URLFragment } name={breedInfo.displayName}>{breedInfo.displayName}</button>
					</div>
				);
				})}
			</div>
		  </div>
		);
	}
};

const capitalize = ( name: string ) => {
	return name[0].toUpperCase() + name.slice( 1 );
}