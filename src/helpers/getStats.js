

export const getTotalPowerStat = ( team, stat ) => {

    const powerStatsMapped = team.map( hero => hero.powerstats );

    const totalStat = powerStatsMapped.reduce(
                        ( totalStat, currentStat ) => totalStat + +currentStat[ stat ], 0
    );

    return totalStat;
}

export const getAvgWeightAndHeight = ( team ) => {

    const statsMapped = team.map( hero => hero.appearance )

    const summedStats = statsMapped.reduce( ( totalStats, hero ) => {

        const height = hero.height[ 1 ].split(' ')[ 0 ];
        const weight = hero.weight[ 1 ].split(' ')[ 0 ];

        return [
            totalStats[ 0 ] + +height,
            totalStats[ 1 ] + +weight
        ];
    } , [ 0, 0 ] )

    const [ summedHeight, summedWeight ] = summedStats;

    return [
        ( summedHeight / team.length ).toFixed( 2 ),
        ( summedWeight / team.length ).toFixed( 2 )
    ]
}