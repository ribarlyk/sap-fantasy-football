// import uniqid from "uniqid";
// import { useEffect, useState } from "react";

// export default function LastMatches({ results }) {
//     const [gamesHistory, setGamesHistory] = useState(
//         JSON.parse(sessionStorage.getItem("seasonHistory")) || null
//     );

//     useEffect(() => {
//         gamesHistory === null
//             ? setGamesHistory(results)
//             : setGamesHistory((prev) => [...prev, results]);
//     }, []);
//     sessionStorage.setItem("seasonHistory", JSON.stringify(gamesHistory));

//     return (
//         <>
//             <h1>Last Matches</h1>
//             {results.map((x) => {
//                 return (
//                     <div key={uniqid()}>
//                         {x.homeTeam} {x.homeGoals} - {x.awayGoals} {x.awayTeam}
//                     </div>
//                 );
//             })}
//         </>
//     );
// }

import uniqid from "uniqid";
import { useEffect, useState } from "react";

export default function LastMatches({ results }) {
    const [gamesHistory, setGamesHistory] = useState(
        JSON.parse(sessionStorage.getItem("seasonHistory")) || []
    );

    useEffect(() => {
        if (results.length > 0 && !gamesHistory.some(game => game[0].homeTeam === results[0].homeTeam)) {
            setGamesHistory((prev) => [...prev, results]);
        }
    }, [results]);

    useEffect(() => {
        sessionStorage.setItem("seasonHistory", JSON.stringify(gamesHistory));
    }, [gamesHistory]);

    return (
        <>
            <h1>Last Matches</h1>
            {results.map((x) => {
                return (
                    <div key={uniqid()}>
                        {x.homeTeam} {x.homeGoals} - {x.awayGoals} {x.awayTeam}
                    </div>
                );
            })}
        </>
    );
}
