import "./Match.scss";
import MatchSimulator from "./simulatorBeta";
import { Team, Statistic } from "./simulatorBeta";
import { useState, useEffect, useRef } from "react";
import { useResultsContext } from "../LiftingStates/ResultContext";
import Button from "@mui/material/Button";

export default function MatchDay() {
    const [matchStarted, setMatchStarted] = useState(false);
    const [matchStatistic, setMatchStatistic] = useState(null);

    console.log("First time count");

    const getCountFromLocalStorage = () => {
        let count = JSON.parse(localStorage.getItem("loggedUser")).count;

        const savedCount = count ?? 0;
        return savedCount > 8 ? 0 : savedCount;
    };

    const [count, setCount] = useState(getCountFromLocalStorage());

    console.log("Second time count");

    //     const savedCount = localStorage.getItem("count");
    // return savedCount > 8 ? 0 : parseInt(savedCount);
    // });

    const [showFinishButton, setShowFinishButton] = useState(false);

    const [round, setRound] = useState(
        JSON.parse(localStorage.getItem("loggedUser"))?.fixtures[count] ?? 0
    );
    console.log(round);
    console.log(count);
    const [legOne, setLegOne] = useState(round.splice(0, 5));
    console.log(legOne);
    const [homeTeam, setHomeTeam] = useState(
        new Team(
            legOne[0][0]?.team?.name || legOne[0][0]?.name,
            legOne[0][0]?.team?.players?.slice(0, 11) ||
                legOne[0][0]?.players?.slice(0, 11)
        )
    );
    const [awayTeam, setAwayTeam] = useState(
        new Team(
            legOne[0][1]?.team?.name || legOne[0][1]?.name,
            legOne[0][1]?.team?.players?.slice(0, 11) ||
                legOne[0][1]?.players?.slice(0, 11)
        )
    );
    const [awayTeamName, setAwayTeamName] = useState("");
    const [awayCorners, setAwayCorners] = useState(0);
    const [awayFouls, setAwayFouls] = useState(0);
    const [awayGoals, setAwayGoals] = useState(0);
    const [awayPossession, setAwayPossession] = useState(0);
    const [awayRedCards, setAwayRedCards] = useState(0);
    const [awayShotsOnTarget, setAwayShotsOnTarget] = useState(0);
    const [awayThrowIns, setAwayThrowIns] = useState(0);
    const [awayYellowCards, setAwayYellowCards] = useState(0);
    const [homeTeamName, setHomeTeamName] = useState("");
    const [homeCorners, setHomeCorners] = useState(0);
    const [homeFouls, setHomeFouls] = useState(0);
    const [homeGoals, setHomeGoals] = useState(0);
    const [homePossession, setHomePossession] = useState(0);
    const [homeRedCards, setHomeRedCards] = useState(0);
    const [homeShotsOnTarget, setHomeShotsOnTarget] = useState(0);
    const [homeThrowIns, setHomeThrowIns] = useState(0);
    const [homeYellowCards, setHomeYellowCards] = useState(0);
    const [matchSimulator, setMatchSimulator] = useState(null);
    const [awayBadge, setAwayBadge] = useState(0);
    const [homeBadge, setHomeBadge] = useState(0);
    const [matchSeconds, setMatchSeconds] = useState(0);
    const [logs, setLogs] = useState([]);
    const [allResults, setAllResults] = useState([]);
    const [fixtures, setFixtures] = useState(
        JSON.parse(localStorage.getItem("loggedUser")).fixtures
    );
    const [userTeam, setUserTeam] = useState(
        JSON.parse(localStorage.getItem("loggedUser"))
    );
    const [currentRound, setCurrentRound] = useState(1);
    const [nextRound, setNextRound] = useState(false);
    const [showNextRoundButton, setShowNextRoundButton] = useState(false);
    const [showMatchInfo, setShowMatchInfo] = useState(false);
    const [showStartButton, setShowStartButton] = useState(true);
    const [league, setLeague] = useState(
        // JSON.parse(localStorage.getItem("loggedUser")).leagueResults ||
        JSON.parse(localStorage.getItem("loggedUser")).league || []
    );
    const [leagueResults, setleagueResults] = useState(
        // JSON.parse(localStorage.getItem("loggedUser")).leagueResults ||
        JSON.parse(localStorage.getItem("loggedUser")).leagueResults || []
    );
    const [results, setResults] = useResultsContext();
    const [test, setTest] = useState([]);
    const [timer, setTimer] = useState(0);
    const [timerActive, setTimerActive] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [homeLogo, setHomeLogo] = useState("");
    const [awayLogo, setAwayLogo] = useState("");

    const findUserAndOpponent = (fixtures, userObject) => {
        // console.log(fixtures[0][0]);
        console.log(fixtures, userObject.team.name);
        for (let i = count; i < fixtures.length; i++) {
            for (let j = 0; j < fixtures[i].length; j++) {
                const currentUserIndex = fixtures[i][j].findIndex(
                    (obj) => obj.name === userObject.team.name
                );

                if (currentUserIndex !== -1) {
                    const opponentIndex = currentUserIndex === 0 ? 1 : 0;
                    if (
                        fixtures[i][j][opponentIndex].hasOwnProperty("team") &&
                        fixtures[i][j][opponentIndex].hasOwnProperty("venue")
                    ) {
                        return {
                            userPosition: [i, j, currentUserIndex],
                            opponentPosition: [i, j, opponentIndex],
                        };
                    }
                }
            }
        }
    };

    const updateLoggedUserCount = () => {
        // setleagueResults(leagueTeamsToBeExportedToLocalStorage)

        // const updateLeagueResults = { ...userTeam, leagueResults: leagueTeamsToBeExportedToLocalStorage }hand

        // setUserTeam(updateLeagueResults);

        // Update the userTeam state

        setCount(count + 1);
        // const newCount = await getCountAsync(); // Replace this with your async function to get the new count
        // setCount(newCount);
        const updatedUserTeam = { ...userTeam, count: count + 1 };

        // const updatedUserTeam = { ...userTeam, count: count };

        setUserTeam(updatedUserTeam);

        // Save the updated userTeam object in local storage

        // Save the updated userTeam object in the users array in local storage
        const users = JSON.parse(localStorage.getItem("users"));
        const updatedUsers = users.map((user) => {
            if (user.username === userTeam.username) {
                return updatedUserTeam;
            } else {
                return user;
            }
        });

        localStorage.setItem("users", JSON.stringify(updatedUsers));
        localStorage.setItem("loggedUser", JSON.stringify(updatedUserTeam));
    };

    async function getCountAsync() {
        // Replace this with your actual async function to get the new count
        const currentCount = 0; // Replace with the current count value
        return currentCount + 1;
    }

    const setNextRoundTeams = (userPosition, opponentPosition) => {
        const nextHomeTeam =
            fixtures[userPosition[0]][userPosition[1]][userPosition[2]];
        const nextAwayTeam =
            fixtures[opponentPosition[0]][opponentPosition[1]][
                opponentPosition[2]
            ];

        console.log(nextHomeTeam);
        console.log(nextAwayTeam);
        setHomeLogo(nextHomeTeam?.team?.logo || nextHomeTeam?.logo);
        setAwayLogo(nextAwayTeam?.team?.logo || nextAwayTeam?.logo);

        setHomeTeam(
            new Team(
                nextHomeTeam?.team?.name || nextHomeTeam?.name,
                nextHomeTeam?.team?.players?.slice(0, 11) ||
                    nextHomeTeam?.players?.slice(0, 11)
            )
        );
        setAwayTeam(
            new Team(
                nextAwayTeam?.team?.name || nextAwayTeam?.name,
                nextAwayTeam?.team?.players?.slice(0, 11) ||
                    nextAwayTeam?.players?.slice(0, 11)
            )
        );
    };

    const getUserTeamAndOpponent = () => {
        let userMatch = findUserAndOpponent(fixtures, userTeam);
        console.log(userTeam);
        console.log(fixtures);
        console.log(userMatch);

        if (userMatch) {
            const isUserAway = userMatch.userPosition[2] === 1;

            if (isUserAway) {
                setNextRoundTeams(
                    userMatch.opponentPosition,
                    userMatch.userPosition
                );
            } else {
                setNextRoundTeams(
                    userMatch.userPosition,
                    userMatch.opponentPosition
                );
            }

            console.log(homeTeam);
            console.log(awayTeam);
            setShowNextRoundButton(false);
        } else {
            console.log("User match not found");
        }
    };

    const handleNextRound = () => {
        updateLoggedUserCount();
        setShowNextRoundButton(false);
        setShowMatchInfo(false);
        setMatchStarted(false);
        setMatchStatistic(null);
        setLogs([]);
        getUserTeamAndOpponent();
    };

    const simulateAllGamesFromTheLeg = () => {
        let results = [];
        let match;

        for (let i = 0; i < legOne.length; i++) {
            console.log(legOne[i][1].name);
            console.log(legOne[i][1].players);

            const homeTeam = new Team(
                legOne[i][0]?.team?.name || legOne[i][0].name,
                legOne[i][0]?.team?.players || legOne[i][0].players
            );
            const awayTeam = new Team(
                legOne[i][1]?.team?.name || legOne[i][1].name,
                legOne[i][1]?.team?.players || legOne[i][0].players
            );

            match = new MatchSimulator(homeTeam, awayTeam);
            const stats = match?.matchStatistic;
            results.push(stats);
        }

        setAllResults((prev) => [...prev, results]);
        return results;
    };

    const handleStartMatch = () => {
        setTimer(0);
        setTimerActive(true);
        setMatchStarted(true);
        setShowMatchInfo(true);
        setShowFinishButton(true);
        setTest(simulateAllGamesFromTheLeg());
        // updateLoggedUserCount();

        const logCallback = (message) => {
            setLogs((prevLogs) => [...prevLogs, message]);
        };

        setMatchSimulator((prevState) => {
            const matchSim = new MatchSimulator(
                homeTeam,
                awayTeam,
                logCallback
            );

            setMatchStatistic(matchSim.matchStatistic);
            return matchSim;
        });
    };

    const logCallback = (message) => {
        setLogs((prevLogs) => [...prevLogs, message]);
    };

    useEffect(() => {
        // console.log("assss");
        // const intervalId = setInterval(() => {
        //     setCount((prevCount) => prevCount + 1);
        //
        // }, 1000);

        let timerId = setInterval(() => {
            setTimer((prev) => {
                if (prev >= 20) {
                    clearInterval(timerId);
                    return prev;
                }
                return prev + 1;
            });
        }, 500);
        
        console.log(matchSimulator?.matchStatistic);
        setAwayCorners(matchSimulator?.matchStatistic.awayCornerKicks);
        setAwayFouls(matchSimulator?.matchStatistic.awayFouls);
        setAwayGoals(matchSimulator?.matchStatistic.awayGoals);
        setAwayPossession(matchSimulator?.matchStatistic.awayPossession);
        setAwayRedCards(matchSimulator?.matchStatistic.awayRedCards);
        setAwayShotsOnTarget(matchSimulator?.matchStatistic.awayShotsOnTarget);
        setAwayTeamName(matchSimulator?.matchStatistic.awayTeam);
        setAwayYellowCards(matchSimulator?.matchStatistic.awayYellowCards);

        setHomeCorners(matchSimulator?.matchStatistic.homeCornerKicks);
        setHomeFouls(matchSimulator?.matchStatistic.homeFouls);
        setHomeGoals(matchSimulator?.matchStatistic.homeGoals);
        setHomePossession(matchSimulator?.matchStatistic.homePossession);
        setHomeRedCards(matchSimulator?.matchStatistic.homeRedCards);
        setHomeShotsOnTarget(matchSimulator?.matchStatistic.homeShotsOnTarget);
        setHomeTeamName(matchSimulator?.matchStatistic.homeTeam);
        setHomeYellowCards(matchSimulator?.matchStatistic.homeYellowCards);
        setHomeThrowIns(matchSimulator?.matchStatistic.homeThrowIns);
        setAwayThrowIns(matchSimulator?.matchStatistic.awayThrowIns);

        return () => {
            clearInterval(timerId);
        };

        // return () => {
        //     clearInterval(intervalId);
        // };
    }, [
        matchSimulator?.matchStatistic.awayGoals,
        matchSimulator?.matchStatistic.homeGoals,
        matchSimulator?.matchStatistic.awayCornerKicks,
        matchSimulator?.matchStatistic.awayFouls,
        matchSimulator?.matchStatistic.awayGoals,
        matchSimulator?.matchStatistic.awayPossession,
        matchSimulator?.matchStatistic.awayRedCards,
        matchSimulator?.matchStatistic.awayShotsOnTarget,
        matchSimulator?.matchStatistic.awayTeam,
        matchSimulator?.matchStatistic.awayYellowCards,
        matchSimulator?.matchStatistic.homeThrowIns,
        matchSimulator?.matchStatistic.awayThrowIns,
        timerActive,
    ]);

    useEffect(() => {
        getUserTeamAndOpponent();
    }, []);

    const handleFinishMatch = () => {
        updateTable(test);

        if (homeTeam && awayTeam) {
            const updatedHomeTeam = {
                ...homeTeam,
                points: homeTeam.points + 1,
            };

            const updatedAwayTeam = {
                ...awayTeam,
                points: awayTeam.points + 1,
            };

            setHomeTeam(updatedHomeTeam);
            setAwayTeam(updatedAwayTeam);

            // setMatchStarted(false);
            setShowFinishButton(false);
            setShowStartButton(false);
            setShowNextRoundButton(true);
            setTimerActive(false);
        } else {
            console.log("HomeTeam or AwayTeam is null");
        }
    };

    function updateTable(testa) {
        console.log(testa);
        console.log(league);
        setResults(testa);
        let leagueTeamsToBeExportedToLocalStorage = league?.slice();
        console.log(leagueTeamsToBeExportedToLocalStorage);

        for (let i = 0; i < testa.length; i++) {
            let homeTeam = testa[i].homeTeam;
            let awayTeam = testa[i].awayTeam;
            let homeGoals = Number(testa[i].homeGoals);
            let awayGoals = Number(testa[i].awayGoals);

            console.log("homeTeam", homeTeam);
            console.log("awayTeam", awayTeam);

            for (let j = 0; j < league.length; j++) {
                let team =
                    leagueTeamsToBeExportedToLocalStorage[j]?.team ||
                    leagueTeamsToBeExportedToLocalStorage[j];

                console.log(team);

                if (homeTeam === (team?.name || team)) {
                    team.conceededgoals += awayGoals;
                    team.scoredgoals += homeGoals;
                } else if (awayTeam === (team?.name || team)) {
                    team.conceededgoals += homeGoals;
                    team.scoredgoals += awayGoals;
                }

                if (
                    homeGoals > awayGoals &&
                    homeTeam === (team?.name || team)
                ) {
                    team.wins += 1;
                    team.points += 3;
                } else if (
                    homeGoals < awayGoals &&
                    homeTeam === (team?.name || team)
                ) {
                    team.loses += 1;
                } else if (
                    homeGoals === awayGoals &&
                    homeTeam === (team?.name || team)
                ) {
                    team.draws += 1;
                    team.points += 1;
                }

                if (
                    awayGoals > homeGoals &&
                    awayTeam === (team?.name || team)
                ) {
                    team.wins += 1;
                    team.points += 3;
                } else if (
                    awayGoals < homeGoals &&
                    awayTeam === (team?.name || team)
                ) {
                    team.loses += 1;
                } else if (
                    awayGoals === homeGoals &&
                    awayTeam === (team?.name || team)
                ) {
                    team.draws += 1;
                    team.points += 1;
                }
            }
        }

        setleagueResults(leagueTeamsToBeExportedToLocalStorage);

        const updateLeagueResults = {
            ...userTeam,
            leagueResults: leagueTeamsToBeExportedToLocalStorage,
        };

        setUserTeam(updateLeagueResults);

        // localStorage.setItem("loggedUser", JSON.stringify(updateLeagueResults));

        // Save the user in the users array in the local storage
        // const users = JSON.parse(localStorage.getItem("users"));
        // const updatedUsers = users.map((user) => {
        //     if (user.username === userTeam.username) {
        //         return updateLeagueResults;
        //     } else {
        //         return user;
        //     }
        // });

        localStorage.setItem("loggedUser", JSON.stringify(updateLeagueResults));
        // localStorage.setItem("users", JSON.stringify(updatedUsers));
        // updateLoggedUserCount(leagueTeamsToBeExportedToLocalStorage);
    }

    // console.log("asd")

    return (
        <div className="match-container">
            {!matchStarted && (
                <Button
                    variant="contained"
                    size="large"
                    onClick={handleStartMatch}
                >
                    Start Match
                </Button>
            )}
            {matchSimulator?.matchStatistic && showMatchInfo && (
                <>
                    <div className="result-teams-container">
                        <div className="home-team-container">
                            <img
                                width="100"
                                height="100"
                                src={homeLogo}
                                alt="logo"
                            ></img>
                            <h2>{homeTeamName}</h2>
                            <h2>{homeGoals}</h2>
                        </div>
                        <span>-</span>
                        <div className="away-team-container">
                            <img
                                width="100"
                                height="100"
                                src={awayLogo}
                                alt="logo"
                            ></img>
                            <h2>{awayTeamName}</h2>
                            <h2>{awayGoals}</h2>
                        </div>
                        <h4>Time: {timer} seconds</h4>
                    </div>

                    <div className="tableContainer">
                        <table className="table-match">
                            <thead>
                                <tr>
                                    <th>HOME</th>
                                    <th>STAT</th>
                                    <th>AWAY</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{awayCorners}</td>
                                    <td>Corners</td>
                                    <td>{homeCorners}</td>
                                </tr>
                                <tr>
                                    <td>{awayFouls}</td>
                                    <td>Fouls</td>
                                    <td>{homeFouls}</td>
                                </tr>
                                <tr>
                                    <td>{awayPossession}</td>
                                    <td>Possession</td>
                                    <td>{homePossession}</td>
                                </tr>
                                <tr>
                                    <td>{awayYellowCards}</td>
                                    <td>YellowCards</td>
                                    <td>{homeYellowCards}</td>
                                </tr>
                                <tr>
                                    <td>{awayRedCards}</td>
                                    <td>RedCards</td>
                                    <td>{homeRedCards}</td>
                                </tr>
                                <tr>
                                    <td>{awayShotsOnTarget}</td>
                                    <td>Shots</td>
                                    <td>{homeShotsOnTarget}</td>
                                </tr>
                                <tr>
                                    <td>{awayThrowIns}</td>
                                    <td>ThrowIns</td>
                                    <td>{homeThrowIns}</td>
                                </tr>
                            </tbody>
                        </table>
                        <div className="logs-container">
                            <h3>Comments:</h3>
                            <ul>
                                {logs.map((log, index) => (
                                    <li key={index}>{log}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </>
            )}
            {showFinishButton && matchStarted && (
                <Button variant="contained" onClick={handleFinishMatch}>
                    Finish Match
                </Button>
            )}
            {!showStartButton && showNextRoundButton && (
                <Button variant="contained" onClick={handleNextRound}>
                    Next Round
                </Button>
            )}
        </div>
    );
}
