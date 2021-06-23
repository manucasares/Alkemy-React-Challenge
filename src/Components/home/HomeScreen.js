import axios from 'axios';
import React, { useEffect, useState } from 'react'

import { cleanHeroesStats } from '../../helpers/cleanHeroesStats';
import { Search } from './Search';
import { Team } from './Team';

const initialHeroesIds = [ 385, 69, 313, 655, 370, 687 ];


export const HomeScreen = () => {

    const [ heroes, setHeroes ] = useState( [] );

    useEffect(() => {
        
        ( async() => {

            try {
           
                const initialPromises = initialHeroesIds.map( id => (
                    axios( {
                        method: 'get',
                        url: `https://superheroapi.com/api.php/${ process.env.REACT_APP_ACCESS_TOKEN }/${ id }`
                    } )
                ) );

                const [ ...heroes ] = await Promise.all( initialPromises );

                const heroesData = heroes.map( hero => hero.data );
                
                cleanHeroesStats( heroesData, setHeroes )
                
            } catch (error) {
                console.error( error );
            }
        })();
        
    }, [] )

    return (
        <div className="home__screen">
            
            <Search
                heroes={ heroes }
                setHeroes={ setHeroes }
            />

            <main className="container">
                <Team
                    alignment="good"
                    heroes={ heroes }
                    setHeroes={ setHeroes }
                />
    
                <Team
                    alignment="bad"
                    heroes={ heroes }
                    setHeroes={ setHeroes }
                />
            </main>

        </div>
    )
}
