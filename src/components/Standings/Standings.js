import "./Standings.scss";
import { teamGenerator } from "../Models/LeagueModel/LeagueManager";
import { useState, useEffect } from "react";
import GeneratePairings from "./GeneratePairings";
export default function Standings() {
    const [teams, setTeams] = useState(
        JSON.parse(localStorage.getItem("teams")) || []
    );
    const [userTeam, setUserTeam] = useState(
        JSON.parse(localStorage.getItem("loggedUser")) || []
    );

    useEffect(() => {
        async function fetchTeams() {
            try {
                const team = await teamGenerator.generateTeam();
                setTeams(team);
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
            <h1>STANDINGS TABLE</h1>
            <GeneratePairings
                teams={JSON.parse(localStorage.getItem("league"))}
            />
        </div>
    );
}
