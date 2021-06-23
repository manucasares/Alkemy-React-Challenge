

export const cleanHeroesStats = ( heroes, setHeroes ) => {
    
    const powerstats = [ 'combat', 'durability', 'intelligence', 'power', 'speed', 'strength' ];
    const heroesCopy = JSON.parse( JSON.stringify( heroes ) );

    for ( let i = 0; i < heroes.length; i++ ) {
        
        const { powerstats: heroStats } = heroes[ i ];
        
        for ( let j = 0; j < powerstats.length; j++ ) {
            
            // Si es igual a 'null' (así viene desde la API) o no existe, lo limpiamos
            if ( heroStats[ powerstats[ j ] ] === 'null' || !heroStats[ powerstats[ j ] ] ) {
                heroesCopy[ i ].powerstats[ powerstats[ j ] ] = 0;
            }
        }
    }

    setHeroes( heroesCopy );
}