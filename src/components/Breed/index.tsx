import React, { useEffect, useState } from 'react';

type BreedProps = {
	breed: string,
	onBack: any
};

export default function Breed( { breed, onBack }: BreedProps ) {
	const [ imagesData, setImagesData ] = useState<string[]>( [] );
	const [ isLoaded, setIsLoaded ] = useState( false );
	const [ error, setError ] = useState<Error | null>( null );
	const [ dogImageUrl, setDogImageUrl ] = useState('');

	useEffect( () => {
		fetch( `https://dog.ceo/api/breed/${breed}/images`)
			.then( response => response.json() )
			.then( data => {
				setImagesData( data.message );
				fetch( `${imagesData[ 0 ]}`)
					.then( response => response.blob() )
					.then( dataBlob => {
						setDogImageUrl( URL.createObjectURL( dataBlob ) );
						setIsLoaded( true );
					} )
			} )
			.catch( error => {
				setError( error );
				setIsLoaded( true );
			} )
		return (()=>{})
	}, [ imagesData, breed ] );

	if ( error ) {
		return <div>{error.message}</div>
	} else if ( !isLoaded ) {
		return <div>Loading...</div>
	} else {
		return (
			<div>
				<button onClick={ onBack }>Back to the breeds list</button>
				<img src={dogImageUrl} alt={breed}/>
			</div>
		);
	}
};