import "./Standings.scss";

export default function Table({league}) {
 
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
            <th>Goals Scored</th>
            <th>Goals Conceeded</th>
            <th>Points</th>
          </tr>
        </thead>
        <tbody>
          {league.map((x, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>
                  {x.team.logo ? (
                    <img src={x.team.logo} alt={`${x.team.name} logo` } width="55" height="55"/>
                  ) : null}
                </td>
                <td>{x.team.name || x.teamName}</td>
                <td>{x.team.wins === 0 ? x.team.wins : x.wins}</td>
                <td>{x.team.draws === 0 ? x.team.draws : x.draws}</td>
                <td>{x.team.loses === 0 ? x.team.loses : x.loses}</td>
                <td>{x.team.scoredgoals === 0  ?x.team.scoredgoals:  x.scoredgoals}</td>
                <td>{x.team.conceededgoals === 0  ?x.team.conceededgoals:  x.conceededgoals}</td>
                <td>{x.team.points === 0  ?x.team.points:  x.points}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      
    );
}
