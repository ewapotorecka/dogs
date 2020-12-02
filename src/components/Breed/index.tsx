import React, { useEffect, useState } from 'react';
import loading from '../../icons/480.gif';

type BreedProps = {
	breed: string,
	onBack: any
};

export default function Breed( { breed, onBack }: BreedProps ) {
	const [ imagesData, setImagesData ] = useState<string[]>( [] );
	const [ isLoaded, setIsLoaded ] = useState( false );
	const [ error, setError ] = useState<Error | null>( null );

	useEffect( () => {
		fetch( `https://dog.ceo/api/breed/${breed}/images/random/3`)
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
		<div>
			{ !isLoaded && <p><img src={loading} alt="loading"/></p> }
			{ error && <p>{ error.message }</p>}
			{
				<div>
					<button onClick={ onBack }>Back to breeds list</button>
					<img src={ imagesData[ 0 ] } alt={ breed }/>
					<img src={ imagesData[ 1 ] } alt={ breed }/>
					<img src={ imagesData[ 2 ] } alt={ breed }/>
				</div>
			}
		</div>


	);
};