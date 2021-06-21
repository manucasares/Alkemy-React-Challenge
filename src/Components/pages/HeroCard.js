import React from 'react'

import { Combat, Intelligence, Power, Durability, Strength, Speed } from '../../assets/icons';


export const HeroCard = ( { hero } ) => {

    const stats = [
        {
            id: 1,
            Icon: Combat,
            name: 'combat' 
        },
        {
            id: 2,
            Icon: Intelligence,
            name: 'intelligence' 
        },
        {
            id: 3,
            Icon: Power,
            name: 'power' 
        },
        {
            id: 4,
            Icon: Durability,
            name: 'durability' 
        },
        {
            id: 5,
            Icon: Strength,
            name: 'strength' 
        },
        {
            id: 6,
            Icon: Speed,
            name: 'speed' 
        },
    ];

    const { id, name, image, powerstats } = hero;

    return (
        <section
            className="card hero__card open-sans"
            key={ id }
        >
            <img className="card-img-top hero__img" src={ image.url } alt={ name } />
            <div className="card-body">
                <div className="hero__name-btn__container">
                    <h5 className="card-title hero__name"> { name } </h5>
                    <div className="hero__btn__container">
                        <i className="fas fa-info-circle icon"></i>
                        <i className="fas fa-trash icon"></i>
                    </div>
                </div>

                <hr />

                <ul className="hero__stats">
                    {
                        stats.map( ( { id, Icon, name } ) => (

                            <li
                                key={ id }
                                className="hero__stat stat__icon"
                            > 
                                <div
                                    className="svg"
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
 