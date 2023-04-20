import "./Standings.scss";
import { teamGenerator } from "../Models/LeagueModel/LeagueManager";
import { useState, useEffect } from "react";
import GeneratePairings from "./GeneratePairings";
import Table from "./Table";
import { useResultsContext } from "../LiftingStates/ResultContext";
import LastMatches from "./LastMatches";
import Loader from "../../components/MyTeam/Loader/Loader";

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
    const [leagueResults, setLeagueResults] = useState(
        JSON.parse(localStorage.getItem("leagueResults")) || []
    );
    const [results, setResults] = useResultsContext();
    const [isLoaded, setIsLoaded] = useState(false);
        

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

    const timeoutIt = setTimeout(() => {
        setIsLoaded(true);
    }, 3000);
    console.log('hui')
    return (
        <div className="standings-container">
            <div className="fixtures-container">
                {isLoaded ? (
                    <>
                        {" "}
                        <div>
                            <h1>Fixtures</h1>
                            <GeneratePairings
                                teams={JSON.parse(
                                    localStorage.getItem("league")
                                )}
                            />

                            <div className="last-matches">
                                {results && <LastMatches results={results} />}
                            </div>
                        </div>
                        <div className="table-container">
                            <h1>Table</h1>
                            <Table
                                league={league}
                                leagueResults={leagueResults}
                            />
                        </div>
                    </>
                ) : (
                    <div className="div-container">
                        {" "}
                        <Loader />
                    </div>
                )}
            </div>
        </div>
    );
}
