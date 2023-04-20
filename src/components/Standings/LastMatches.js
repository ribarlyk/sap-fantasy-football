import uniqid from "uniqid";
export default function LastMatches({ results }) {
    console.log(results);

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
// export default function LastMatches({ results }) {
//     console.log(results);

//     return (
//         <>
//             <h1>Last Matches</h1>

//             <div>
//                 {results
//                     .map((eachResult) => eachResult)
//                     .map((match, index) => {
//                         console.log(match[index]);
//                         return (
//                             <div key={index}>
//                                 {match[index].awayTeam} {match[index].awayGoals}
//                                 - {match[index].homeGoals}{" "}
//                                 {match[index].homeTeam}
//                             </div>
//                         );
//                     })}
//             </div>
//         </>
//     );
// }
