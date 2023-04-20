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
        JSON.parse(localStorage.getItem("loggedUser"))
    );
    const [league, setLeague] = useState([]);
    const [leagueResults, setLeagueResults] = useState(
        JSON.parse(localStorage.getItem("loggedUser")).leagueResults || []
    );
    const [results, setResults] = useResultsContext();
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        async function fetchTeams() {
            try {
                const team = await teamGenerator.generateTeam();
                console.log("first useefect", team);
                setTeams(team);
            } catch (error) {
                console.error(error);
            }
        }
        fetchTeams();

    }, []);

    useEffect(() => {
        console.log("seconduseefect");
        const leagueTwo = [...teams, userTeam.team];
        setLeague(leagueTwo);
        const updateLeague = { ...userTeam, league: leagueTwo };
        setUserTeam(updateLeague);
        
        // Update users in local storage
        const users = JSON.parse(localStorage.getItem("users"));
        const updatedUsers = users.map((user) => {
            if (user.username === userTeam.username) {
                return updateLeague;
            } else {
                return user;
            }
        });

        localStorage.setItem("loggedUser", JSON.stringify(updateLeague));
        localStorage.setItem("users", JSON.stringify(updatedUsers));
        localStorage.setItem("teams", JSON.stringify(teams));

    }, [teams]);

    useEffect(() => {
        console.log("fourthuseefect");

        const timeoutIt = setTimeout(() => {
            setIsLoaded(true);
        }, 3000);

        // Clean up the timeout when the component is unmounted
        return () => {
            clearTimeout(timeoutIt);
        };
    }, []);


    return (
        <div className="standings-container">
            <div className="fixtures-container">
                {isLoaded ? (
                    <>
                        {" "}
                        <div>
                            <h1>Fixtures</h1>
                            <GeneratePairings
                                teams={
                                    JSON.parse(localStorage.getItem("loggedUser")).league
                                }
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

