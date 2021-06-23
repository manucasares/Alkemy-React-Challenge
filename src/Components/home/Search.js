import React, { useState } from 'react';
import { useFormik } from 'formik';
import axios from 'axios';

import { Spinner } from '../home/Spinner';
import { SearchIcon } from '../../assets/icons';
import { cleanHeroesStats } from '../../helpers/cleanHeroesStats';


const validate = ( formValues ) => {

    const errors = {};
    const { search_value } = formValues;

    if ( !search_value ) {
        errors.search_value = '¡El campo está vacío!';
    } 

    return errors;
}

export const Search = ( { heroes, setHeroes } ) => {

    const [ foundHeroes, setFoundHeroes ] = useState( [] );

    // UI States
    const [ error, setError ] = useState( false );
    const [ notFound, setNotFound ] = useState( false );
    const [ loading, setLoading ] = useState( false );
    const [ alreadyExists, setAlreadyExists ] = useState( false );
    const [ heroAdded, setHeroAdded ] = useState( false );


    const formik = useFormik({

        initialValues: {
          search_value: '',
        },
        validate,
        onSubmit: async( formValues ) => {

            try {
                setAlreadyExists( false );
                setError( false );
                setNotFound( false );
                setLoading( true );
                setFoundHeroes( [] );

                const res = await axios({
                    method: 'get',
                    url: `https://superheroapi.com/api.php/${ process.env.REACT_APP_ACCESS_TOKEN }/search/${ formValues.search_value }`,
                })

                setLoading( false );

                if ( res.status !== 200 ) {
                    // Error de la API
                    setError( true );
                    return;
                }

                if ( res.data.response === 'error' ) {
                    // No se encontró un heroe
                    setNotFound( true );
                    return;
                }

                console.log(res)

                // Seteamos los heroes encontrados
                setFoundHeroes( res.data.results );

            } catch ( error ) {
                console.error( error );
                setLoading( false );
            }
        },
    });

    const handleAddHero = ( heroToAdd ) => {
        
        // Antes comprobamos que ya no esté agregado
        const alreadyInHeroes = heroes.find( hero => hero.id === heroToAdd.id );

        if ( alreadyInHeroes ) {
            setAlreadyExists( true );
            return;
        }

        cleanHeroesStats( [ ...heroes, heroToAdd ], setHeroes );

        setAlreadyExists( false );

        setHeroAdded( true );
        setTimeout(() => {
            setHeroAdded( false );
        }, 1500);
    }

    return (
        <div className="home__search container">
            
            <form
                onSubmit={ formik.handleSubmit }
                className="search__form"
            >
                <div className="input-container">
                    <input
                        type="text"
                        className="input"
                        name="search_value"
                        placeholder="Search for a hero..."
                        onChange={ formik.handleChange }
                        onBlur={ formik.handleBlur }
                        value={ formik.values.email }
                        autoComplete="off"
                        maxLength="50"
                    />
                    <SearchIcon />
                </div>

                <div className="error-container">
                    {
                        ( formik.errors.search_value && formik.touched.search_value ) &&
                            <div className="alert alert-danger"> { formik.errors.search_value } </div>
                    }
                </div>
            </form>

            {
                ( error ) &&
                    <div className="alert alert-danger">
                        Ha ocurrido un error, intente nuevamente.
                    </div>
            }

            {
                ( notFound ) &&
                    <div className="alert alert-warning">
                        No se encontraron Heroes para esa búsqueda...
                    </div>
            }

            {
                ( alreadyExists ) &&
                <div className="alert alert-danger">
                    ¡No es posible agregar un Heroe que ya se encuentra en un equipo!
                </div>
            }

            {
                ( loading ) &&
                    <div className="spinner__container rounded">
                        <Spinner />
                    </div>
            }

            {
                <div className={ `hero__added ${ heroAdded && 'show' }` }>
                    ¡Héroe añadido exitósamente!
                </div>
            }

            {
                ( foundHeroes.length !== 0 ) &&
                    <div className="search__results rounded">
                        {
                            foundHeroes.map( hero => (
                                <div
                                    className="hero__found"
                                    key={ hero.id }
                                >
                                    <img
                                        className="hero__img"
                                        src={ hero.image.url }
                                        alt={ hero.name }
                                    />
                                    <div className="hero__name__btn">
                                        <p className="hero__name"> { hero.name } </p>
                                        <button
                                            className="btn btn-dark"
                                            onClick={ () => handleAddHero( hero ) }
                                        >
                                            Agregar
                                        </button>
                                    </div>
                                </div>
                            ) )
                        }
                    </div>
            }
        </div>
    )
}
   