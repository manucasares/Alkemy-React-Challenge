import React from 'react'

export const HeroCard = ( { hero } ) => {

    const { id, name, image, powerstats } = hero;

    return (
        <section
            className="card hero__card open-sans"
            key={ id }
        >
            <img className="card-img-top hero__img" src={ image.url } alt={ name } />
            <div className="card-body">
                <h5 className="card-title hero__name"> { name } </h5>
                <hr />
                <ul>
                    <li>  Combat: { powerstats.combat } </li>
                    <li>  Durability: { powerstats.durability } </li>
                    <li>  intelligence: { powerstats.intelligence } </li>
                    <li>  Power: { powerstats.power } </li>
                    <li>  Speed: { powerstats.speed } </li>
                    <li>  Strength: { powerstats.strength } </li>
                </ul>

                <div className="hero__btn__container">
                    <a href="#" className="btn btn-primary hero__btn">
                        Ver detalle
                        <i className="fas fa-info-circle"></i>
                    </a>

                    <a href="#" className="btn btn-danger hero__btn">
                        Borrar
                        <i className="fas fa-trash"></i>
                    </a>
                </div>
            </div>
        </section>
    )
}
 