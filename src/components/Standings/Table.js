import { useState } from "react";
import "./Standings.scss";

export default function Table() {
    const [teams, setTeams] = useState(
        JSON.parse(localStorage.getItem("league"))
    );
    return (
        <table className="table-table">
        <thead>
          <tr>
            <th >Place</th>
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
          {teams.map((x, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>
                  {x.team.logo ? (
                    <img src={x.team.logo} alt={`${x.team.name} logo` } width="55" height="55"/>
                  ) : null}
                </td>
                <td>{x.team.name || x.teamName}</td>
                <td>{x.team.wins}</td>
                <td>{x.team.draws}</td>
                <td>{x.team.loses}</td>
                <td>{x.team.scoredgoals}</td>
                <td>{x.team.conceededgoals}</td>
                <td>{x.team.points}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      
    );
}
