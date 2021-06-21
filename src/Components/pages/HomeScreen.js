import axios from 'axios';
import React, { useEffect, useState } from 'react'

import { Team } from './Team';

export const HomeScreen = () => {

    const [ heroes, setHeroes ] = useState( [] );

    useEffect(() => {
        
        ( async() => {

            const accessToken = '10222297520160323';

            try {
           
                const [ ...heroes ] = await Promise.all([
                    axios( { method: 'get', url: `https://superheroapi.com/api.php/${ accessToken }/644` } ),
                    axios( { method: 'get', url: `https://superheroapi.com/api.php/${ accessToken }/69` } ),
                    axios( { method: 'get', url: `https://superheroapi.com/api.php/${ accessToken }/313` } ),
                    axios( { method: 'get', url: `https://superheroapi.com/api.php/${ accessToken }/655` } ),
                    axios( { method: 'get', url: `https://superheroapi.com/api.php/${ accessToken }/370` } ),
                    axios( { method: 'get', url: `https://superheroapi.com/api.php/${ accessToken }/687` } ),
                ])

                const heroesData = heroes.map( hero => hero.data );

                
                setHeroes( heroesData );
                
            } catch (error) {
                console.error( error );
            }
        })();
        
    }, [] )
    
    return (
        <div className="home__screen">
            
            <main className="container">
                <Team
                    alignment="good"
                    heroes={ heroes }
                />
    
                <Team
                    alignment="bad"
                    heroes={ heroes }
                />
            </main>

        </div>
    )
}
