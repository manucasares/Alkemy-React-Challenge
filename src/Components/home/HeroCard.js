import React, { useState } from 'react'

import { powerStats } from '../../data/stats';
import { Info, Thrash } from '../../assets/icons';


export const HeroCard = ( { hero, heroes, setHeroes } ) => {

    const [ isExiting, setIsExiting ] = useState( false );

    const { id, name, image, powerstats } = hero;

    const handleDelete = ( id ) => {
        
        setIsExiting( true );

        setTimeout( () => {
            const newHeroes = heroes.filter( hero => hero.id !== id);
            setHeroes( newHeroes );
        }, 550 );
    }

    return (
        <section
            className={ `card hero__card
                ${ isExiting && 'isExiting' }`
            }
            key={ id }
        >
            <img className="card-img-top hero__img" src={ image.url } alt={ name } />
            <div className="card-body">
                <div className="hero__name-btn__container">
                    <h5 className="card-title hero__name"> { name } </h5>
                    <div className="hero__btn__container">
                        <span className="icon">
                            <Info />
                        </span>
                        <span
                            className="icon"
                            onClick={ () => handleDelete( id ) }
                        >
                            <Thrash />
                        </span>
                    </div>
                </div>

                <hr />

                <ul className="hero__stats">
                    {
                        powerStats.map( ( { id, Icon, name } ) => (

                            <li
                                key={ id }
                                className="hero__stat"
                            > 
                                <div
                                    className="stat__icon svg"
                                    data-stat={ name }
                                >
                                    <Icon />
                                </div>

                                { powerstats[ name ] }
                            </li>
                        ) )
                    }
                </ul>

            </div>
        </section>
    )
}
 