// import "./Standings.scss";

// export default function Table({ league, leagueResults }) {
//     console.log(leagueResults);
//     return (
//         <table className="table-table">
//             <thead>
//                 <tr>
//                     <th>Place</th>
//                     <th>Badge</th>
//                     <th>TEAM</th>
//                     <th>Wins</th>
//                     <th>Draws</th>
//                     <th>Losses</th>
//                     <th>Scored</th>
//                     <th>Conceeded</th>
//                     <th>Points</th>
//                 </tr>
//             </thead>
//             <tbody>
//                 {leagueResults.length > 0
//                     ? leagueResults
//                           .sort((a, b) => b.team.points - a.team.points)
//                           .map((x, index) => {
//                               return (
//                                   <tr key={index}>
//                                       <td>{index + 1}</td>
//                                       <td>
//                                           {x.team.logo ? (
//                                               <img
//                                                   src={x.team.logo}
//                                                   alt={`${x.team.name} logo`}
//                                                   width="55"
//                                                   height="55"
//                                               />
//                                           ) : null}
//                                       </td>
//                                       <td>{x.team.name}</td>
//                                       <td>{x.team.wins}</td>
//                                       <td>{x.team.draws}</td>
//                                       <td>{x.team.loses}</td>
//                                       <td>{x.team.scoredgoals}</td>
//                                       <td>{x.team.conceededgoals}</td>
//                                       <td>{x.team.points}</td>
//                                   </tr>
//                               );
//                           })
//                     : league
//                           .sort((a, b) => b.team.points - a.team.points)
//                           .map((x, index) => {
//                               return (
//                                   <tr key={index}>
//                                       <td>{index + 1}</td>
//                                       <td>
//                                           {x.team.logo ? (
//                                               <img
//                                                   src={x.team.logo}
//                                                   alt={`${x.team.name} logo`}
//                                                   width="55"
//                                                   height="55"
//                                               />
//                                           ) : null}
//                                       </td>
//                                       <td>{x.team.name}</td>
//                                       <td>{x.team.wins}</td>
//                                       <td>{x.team.draws}</td>
//                                       <td>{x.team.loses}</td>
//                                       <td>{x.team.scoredgoals}</td>
//                                       <td>{x.team.conceededgoals}</td>
//                                       <td>{x.team.points}</td>
//                                   </tr>
//                               );
//                           })}
                
//             </tbody>
//         </table>
//     );
// }
// import "./Standings.scss";

// export default function Table({ league, leagueResults }) {
//     console.log(leagueResults);
//     return (
//         <table className="table-table">
//             <thead>
//                 <tr>
//                     <th>Place</th>
//                     <th>Badge</th>
//                     <th>TEAM</th>
//                     <th>Wins</th>
//                     <th>Draws</th>
//                     <th>Losses</th>
//                     <th>Scored</th>
//                     <th>Conceeded</th>
//                     <th>Points</th>
//                 </tr>
//             </thead>
//             <tbody>
//                 {(leagueResults.length > 0 ? leagueResults : league)
//                     .sort((a, b) => ((b?.team?.points || 0) || (b?.points || 0)) - ((a?.team?.points || 0) || ((a?.points || 0)) )
//                     .map((x, index) => {
//                         return (
//                             <tr key={index}>
//                                 <td>{index + 1}</td>
//                                 <td>
//                                     {x?.team?.logo ? (
//                                         <img
//                                             src={x?.team?.logo || x?.logo }
//                                             alt={`${x.team.name} logo`}
//                                             width="55"
//                                             height="55"
//                                         />
//                                     ) : null}
//                                 </td>
//                                 <td>{x?.team?.name || x?.name}</td>
//                                 <td>{x?.team?.wins || 0}</td>
//                                 <td>{x?.team?.draws || 0}</td>
//                                 <td>{x?.team?.loses || 0}</td>
//                                 <td>{x?.team?.scoredgoals || 0}</td>
//                                 <td>{x?.team?.conceededgoals || 0}</td>
//                                 <td>{x?.team?.points || 0}</td>
//                             </tr>
//                         );
//                     })}
//             </tbody>
//         </table>
//     );
// }
import "./Standings.scss";

export default function Table({ league, leagueResults }) {
    console.log(leagueResults);
    return (
        <table className="table-table">
            <thead>
                <tr>
                    <th>Place</th>
                    <th>Badge</th>
                    <th>TEAM</th>
                    <th>Wins</th>
                    <th>Draws</th>
                    <th>Losses</th>
                    <th>Scored</th>
                    <th>Conceeded</th>
                    <th>Points</th>
                </tr>
            </thead>
            <tbody>
                {(leagueResults.length > 0 ? leagueResults : league)
                    .sort((a, b) => ((b?.team?.points || 0) || (b?.points || 0)) - ((a?.team?.points || 0) || (a?.points || 0)))
                    .map((x, index) => {
                        return (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>
                                    {x?.team?.logo || x?.logo? (
                                        <img
                                            src={x?.team?.logo || x?.logo }
                                            alt='logo' 
                                            width="55"
                                            height="55"
                                        />
                                    ) : null}
                                    {console.log(x.logo)}
                                </td>
                                <td>{x?.team?.name || x?.name}</td>
                                <td>{x?.team?.wins || x?.wins || 0}</td>
                                <td>{x?.team?.draws || x?.draws || 0}</td>
                                <td>{x?.team?.loses || x?.loses || 0}</td>
                                <td>{x?.team?.scoredgoals || x?.scoredgoals || 0}</td>
                                <td>{x?.team?.conceededgoals || x?.conceededgoals || 0}</td>
                                <td>{x?.team?.points || x?.points || 0}</td>
                            </tr>
                        );
                    })}
            </tbody>
        </table>
    );
}
