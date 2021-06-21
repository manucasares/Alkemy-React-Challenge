import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { HeroCard } from "./HeroCard";
import { getAvgWeightAndHeight, getTotalPowerStat } from '../../helpers/getStats';


export const Team = ( { alignment = '', heroes = [] } ) => {

    const [ team, setTeam ] = useState( [] );
    const [ powerTeamStats, setPowerTeamStats ] = useState( [] );
    const [ avgHeightWeight, setAvgHeightWeight ] = useState( [] );

    // Seteamos los teams
    useEffect(() => {
        
        const teamByAlignment = heroes.filter( hero => hero.biography.alignment === alignment );

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

        const powerStatsSorted = entries.sort( ( a, b ) => b[ 1 ] - a[ 1 ] );

        setPowerTeamStats( powerStatsSorted );

        const avgStats = getAvgWeightAndHeight( team );

        setAvgHeightWeight( avgStats );

    }, [ team ])

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
                    <div className="stats power">
                        <h3> Powerstats </h3>
                        <hr />
                        {
                            powerTeamStats.map( stat => {
                                
                                const [ nameStat, value ] = stat;
                                return (
                                    <p
                                        key={ nameStat }
                                    >
                                        <span className="stat__name">{ nameStat }:</span> { value }
                                    </p>
                                )
                            })
                        }
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


