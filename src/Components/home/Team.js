import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { HeroCard } from "./HeroCard";
import { getAvgWeightAndHeight, getTotalPowerStat } from '../../helpers/getStats';

import { powerStats } from '../../data/stats';


export const Team = ( { alignment = '', heroes, setHeroes } ) => {

    const [ team, setTeam ] = useState( [] );
    const [ powerTeamStats, setPowerTeamStats ] = useState( [] );
    const [ avgHeightWeight, setAvgHeightWeight ] = useState( [] );

    // Seteamos los teams
    useEffect(() => {
        
        const teamByAlignment = heroes.filter( hero => hero.biography?.alignment === alignment );

        setTeam( teamByAlignment );

    }, [ heroes, alignment ]);

    // Seteamos las stats
    useEffect( () => {

        const totalPowerStats = {
            combat: getTotalPowerStat( team, 'combat' ),
            durability: getTotalPowerStat( team, 'durability' ),
            intelligence: getTotalPowerStat( team, 'intelligence' ),
            power: getTotalPowerStat( team, 'power' ),
            speed: getTotalPowerStat( team, 'speed' ),
            strength: getTotalPowerStat( team, 'strength' ),
        }

        const entries = Object.entries( totalPowerStats );

        // Ordenamos las stats de forma descendente
        const powerStatsSorted = entries.sort( ( a, b ) => b[ 1 ] - a[ 1 ] );

        setPowerTeamStats( powerStatsSorted );

        const avgStats = getAvgWeightAndHeight( team );

        setAvgHeightWeight( avgStats );

    }, [ team, heroes ])

    return (
        <section>
            <div className="team__container">
                
                <h2 className="team__title">
                    {
                        ( alignment === 'good' ) 
                            ? 'Hero Team'
                            : 'Villain Team'
                    }
                </h2>

                <hr />

                <section className="stats__container">
                    
                    <div className="stats">
                        <h3> Powerstats </h3>
                        <hr />
                        <div className="power">
                            {
                                powerTeamStats.map( stat => {
    
                                    const [ nameStat, value ] = stat;
    
                                    // Buscamos ícono de la stat
                                    const Icon = powerStats.find( stat => stat.name === nameStat ).Icon;
    
                                    return (
                                        <p
                                            key={ nameStat }
                                        >
                                            <span
                                                className="stat__icon svg"
                                                data-stat={ nameStat }
                                            >
                                                <Icon />
                                            </span>
                                            { value }
                                        </p>
                                    )
                                })
                            }
                        </div>
                    </div>
                    
                    <div className="stats avgs">
                        <h3> Average Height and Weight </h3>
                        <hr />
                        <p> <span className="stat__name">Height:</span> { avgHeightWeight[0] } </p>
                        <p> <span className="stat__name">Weight:</span> { avgHeightWeight[1] } </p>
                    </div>
                </section>

                <div className="hero__card__container">
                    {
                        team.map( hero => (
    
                            <HeroCard
                                hero={ hero }
                                heroes={ heroes }
                                setHeroes={ setHeroes }
                                key={ hero.id }
                            />
                        ) )
                    }
                </div>
            </div>
        </section>
    )
}

Team.propTypes = {
    alignment: PropTypes.string.isRequired,
    heroes: PropTypes.array.isRequired
}


