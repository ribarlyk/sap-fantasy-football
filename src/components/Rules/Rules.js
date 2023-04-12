import React from 'react';
import './Rules.scss'; 

function Rules() {
  return (
    <div className="fantasy-football-rules">
      <h2>Rules for our Fantasy Football League</h2>

      <div className="team-creation">
        <h3>Team Creation</h3>
        <ol>
          <li>Each team must have a unique name.</li>
          <li>Each team consists of a fixed number of players (e.g. 10 players) from any professional football team.</li>
          <li>Players can be added or dropped from a team throughout the season based on availability and performance.</li>
        </ol>
      </div>

      <div className="scoring">
        <h3>Scoring</h3>
        <ol>
          <li>Points are awarded to each team based on the performance of their players in professional football games.</li>
          <li>Points are awarded for touchdowns, field goals, extra points, and yardage gained.</li>
          <li>Points may be deducted for turnovers or penalties.</li>
          <li>The team with the highest number of points at the end of the season is declared the winner.</li>
        </ol>
      </div>

      <div className="league-management">
        <h3>League Management</h3>
        <ol>
          <li>A league commissioner or administrator is responsible for managing the league.</li>
          <li>The commissioner sets the draft order for selecting players at the start of the season.</li>
          <li>The commissioner may also set rules for waivers, trades, and other league activities.</li>
          <li>Disputes or rule violations may be resolved through league voting or by the commissioner's decision.</li>
        </ol>
      </div>
    </div>
  );
}

export default Rules;