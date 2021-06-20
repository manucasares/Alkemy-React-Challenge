import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { HeroCard } from "./HeroCard";
import { getTotalStat } from '../../helpers/getTotalStat';


export const HeroTeam = ( { alignment = '', heroes = [] } ) => {

    const [ team, setTeam ] = useState( [] );
    const [ teamStats, setTeamStats ] = useState( [] );


    // Seteamos los teams
    useEffect(() => {
        
        const teamByAlignment = heroes.filter( hero => hero.biography.alignment === alignment );

        setTeam( teamByAlignment );

    }, [ heroes, alignment ]);

    useEffect(() => {

        const totalStats = {
            combat: getTotalStat( team, 'combat' ),
            durability: getTotalStat( team, 'durability' ),
            intelligence: getTotalStat( team, 'intelligence' ),
            power: getTotalStat( team, 'power' ),
            speed: getTotalStat( team, 'speed' ),
            strength: getTotalStat( team, 'strength' ),
        }

        const entries = Object.entries( totalStats );

        const statsSorted = entries.sort( ( a, b ) => b[1] - a[ 1 ] );

        setTeamStats( statsSorted );

    }, [ team ])

    return (
        <section>

            <div className="team__container">
                {
                    teamStats.map( stat => {

                        const [ nameStat, value ] = stat;

                        return <p key={ nameStat }> { nameStat }: { value } </p>
                    })
                }

                <h2 className="team__title">
                    {
                        ( alignment === 'good' ) 
                            ? 'Hero Team'
                            : 'Villain Team'
                    }
                </h2>

                <hr />

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

HeroTeam.propTypes = {
    alignment: PropTypes.string.isRequired,
    heroes: PropTypes.array.isRequired
}


