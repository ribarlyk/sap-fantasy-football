import "./Standings.scss";
import { teamGenerator } from "../Models/LeagueModel/LeagueManager";
import { useState, useEffect } from "react";
import GeneratePairings from "./GeneratePairings";
import Table from "./Table";
import { useResultsContext } from "../LiftingStates/ResultContext";
import LastMatches from "./LastMatches";

export default function Standings() {
    const [teams, setTeams] = useState(
        JSON.parse(localStorage.getItem("teams")) || []
    );
    const [userTeam, setUserTeam] = useState(
        JSON.parse(localStorage.getItem("loggedUser")) || []
    );
    const [league, setLeague] = useState(
        localStorage.setItem("league", JSON.stringify([...teams, userTeam])) ||
            []
    );
    const [results, setResults] = useResultsContext();

    useEffect(() => {
        async function fetchTeams() {
            try {
                const team = await teamGenerator.generateTeam();
                setTeams(team);
                setLeague([...team, userTeam]);
            } catch (error) {
                console.error(error);
            }
        }
        fetchTeams();
    }, []);

    localStorage.setItem("teams", JSON.stringify(teams));
    localStorage.setItem("league", JSON.stringify([...teams, userTeam]));

    return (
        <div className="standings-container">
            <div className="fixtures-container">
                <h1>Fixtures</h1>
                <GeneratePairings
                    teams={JSON.parse(localStorage.getItem("league"))}
                />
            </div>
            <div className="table-container">
                <h1>Table</h1>
                <Table league={league} />
            </div>

            <div className="last-matches">
               {results && <LastMatches results={results} />} 
            </div>
        </div>
    );
}
