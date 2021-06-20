

export const getTotalStat = ( team, stat ) => {

    const powerStatsMapped = team.map( hero => hero.powerstats );

    const totalStat = powerStatsMapped.reduce(
                        ( totalStat, currentStat ) => totalStat + +currentStat[ stat ], 0
    );

    return totalStat;
}