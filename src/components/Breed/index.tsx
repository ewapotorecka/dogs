import React, { useEffect, useState } from 'react';
import { breedInfo } from '../../interfaces/breedInfo';
import { ReactComponent as Back } from '../../icons/return.svg';
import { ReactComponent as Next } from '../../icons/next.svg';
import { ReactComponent as Prev } from '../../icons/prev.svg';
import './breed.scss';

type BreedProps = {
	breed: breedInfo,
	onBack: any
};

export default function Breed( { breed, onBack }: BreedProps ) {
	const [ imagesData, setImagesData ] = useState<string[]>( [] );
	const [ isLoaded, setIsLoaded ] = useState( false );
	const [ error, setError ] = useState<Error | null>( null );
	const [ imageIndex, setImageIndex ] = useState( 0 );

	const handleClick = ( type: string ): any => {
		if ( type === 'next' ) {
			if ( imageIndex === 2 ) {
				setImageIndex( 0 );
			} else {
				setImageIndex( imageIndex + 1 );
			}
		} else {
			if ( imageIndex === 0 ) {
				setImageIndex( 2 );
			} else {
				setImageIndex( imageIndex - 1);
			}
		}
	}

	useEffect( () => {
		fetch( `https://dog.ceo/api/breed/${breed.URLFragment}/images/random/3`)
			.then( response => response.json() )
			.then( data => {
				setImagesData( data.message );
				setIsLoaded( true );
			} )
			.catch( error => {
				setError( error );
				setIsLoaded( true );
			} )
	}, [] );

	return(
		<div className='breed-container'>
			{ error && <p>{ error.message }</p>}
			{
				<div>
					<div className='header-container'>
					<button onClick={ onBack }><Back/></button>
						<h1>{breed.displayName.toUpperCase()}</h1>
					</div>
					<div className='images-container'>
						<div className='buttons-container'>
							<button onClick={ ( ) => handleClick( 'prev' ) }><Prev/></button>
							<button onClick={ ( ) => handleClick( 'next')}><Next/></button>
						</div>
						<div className='image-container'>
							<img src={ imagesData[ imageIndex ] } alt={ breed.displayName }/>
						</div>
					</div>
				</div>
			}
		</div>


	);
};