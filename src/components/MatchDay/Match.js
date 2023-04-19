import "./Match.scss"
import MatchSimulator from "./simulatorBeta";
import { Team, Statistic } from "./simulatorBeta";
import { useState, useEffect, useRef } from "react";
import { useResultsContext } from "../LiftingStates/ResultContext";
import Button from "@mui/material/Button";


export default function MatchDay() {
    const [matchStarted, setMatchStarted] = useState(false);
    const [matchStatistic, setMatchStatistic] = useState(null);
    const [count, setCount] = useState(0);
    const [round, setRound] = useState(JSON.parse(localStorage.getItem("fixtures"))[count]);
    const [legOne, setLegOne] = useState(round.splice(0, 5));
    const [homeTeam, setHomeTeam] = useState(new Team(legOne[0][0].team.name, legOne[0][0].team.players.slice(0, 11)));
    const [awayTeam, setAwayTeam] = useState(new Team(legOne[0][1].team.name, legOne[0][1].team.players.slice(0, 11)));
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
    const [league, setLeague] = useState(JSON.parse(localStorage.getItem("league")))
    const [results, setResults] = useResultsContext();
    const [test, setTest] = useState(null)
    const [fixtures, setFixtures] = useState(JSON.parse(localStorage.getItem("fixtures")));
    const [userTeam, setUserTeam] = useState(JSON.parse(localStorage.getItem("loggedUser")));
    const [currentRound, setCurrentRound] = useState(1);
    const [nextRound, setNextRound] = useState(false);
    const [showNextRoundButton, setShowNextRoundButton] = useState(false);
    const [showMatchInfo, setShowMatchInfo] = useState(false);


    const findUserAndOpponent = (fixtures, userObject) => {
        for (let i = count; i < fixtures.length; i++) {
            for (let j = 0; j < fixtures[i].length; j++) {
                const currentUserIndex = fixtures[i][j].findIndex(
                    (obj) => obj.username === userObject.username
                );
                if (currentUserIndex !== -1) {
                    const opponentIndex = currentUserIndex === 0 ? 1 : 0;
                    if (fixtures[i][j][opponentIndex].hasOwnProperty("team") && fixtures[i][j][opponentIndex].hasOwnProperty("venue")) {
                        return {
                            userPosition: [i, j, currentUserIndex],
                            opponentPosition: [i, j, opponentIndex],
                        };
                    }
                }
            }
        }
    }

    const setNextRoundTeams = (userPosition, opponentPosition) => {
        const nextHomeTeam = fixtures[userPosition[0]][userPosition[1]][userPosition[2]];
        const nextAwayTeam = fixtures[opponentPosition[0]][opponentPosition[1]][opponentPosition[2]];

        setHomeTeam(new Team(nextHomeTeam.team.name, nextHomeTeam.team.players.slice(0, 11)));
        setAwayTeam(new Team(nextAwayTeam.team.name, nextAwayTeam.team.players.slice(0, 11)));
    };

    const getUserTeamAndOpponent = () => {
        let userMatch = findUserAndOpponent(fixtures, userTeam);
        setCount((prevCount) => prevCount += 1);
      
      
        if (userMatch) {
 
          const isUserAway = userMatch.userPosition[2] === 1;
      
          // Set the next round teams accordingly
          if (isUserAway) {
            console.log("Away :",isUserAway);
            setNextRoundTeams(userMatch.opponentPosition, userMatch.userPosition);
          } else {
            console.log("home :",isUserAway);
            setNextRoundTeams(userMatch.userPosition, userMatch.opponentPosition);
          }
      
          console.log(homeTeam);
          console.log(awayTeam);
          setShowNextRoundButton(false);
        } else {
          console.log("User match not found");
        }
      };


    const handleNextRound = () => {
        setShowNextRoundButton(false);
        setShowMatchInfo(false);
        setMatchStarted(false);
        setMatchStatistic(null);
        setLogs([]);
        getUserTeamAndOpponent()
        // Add any other logic you need for the next round, like resetting scores or generating new teams
      };

    const handleStartMatch = () => {
        setMatchStarted(true);
        setShowMatchInfo(true);

        const logCallback = (message) => {
            setLogs((prevLogs) => [...prevLogs, message]);
        };

        setMatchSimulator((prevState) => {
            const matchSim = new MatchSimulator(homeTeam, awayTeam, logCallback);
            setMatchStatistic(matchSim.matchStatistic);
            return matchSim;
        });
    };

    

    useEffect(() => {
        // console.log("assss");
        // const intervalId = setInterval(() => {
        //     setCount((prevCount) => prevCount + 1);
        //     setMatchSeconds((prevSeconds) => {
        //         if (prevSeconds >= 90) {
        //             clearInterval(intervalId);
        //             return prevSeconds;
        //         }
        //         return prevSeconds + 1;
        //     });
        // }, 1000);

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


        // return () => clearInterval(intervalId);
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
        matchSimulator?.matchStatistic.awayThrowIns
    ]);

    useEffect(() => {
        getUserTeamAndOpponent();
    }, []);

    const simulateAllGamesFromTheLeg = () => {
        let results = [];
        let match;
        for (let i = 1; i < legOne.length; i++) {
            const homeTeam = new Team(
                legOne[i][0].team.name,
                legOne[i][0].team.players
            );
            const awayTeam = new Team(
                legOne[i][1].team.name,
                legOne[i][1].team.players
            );
            console.log(homeTeam, awayTeam);
            match = new MatchSimulator(homeTeam, awayTeam);

            console.log(match);
            const stats = match?.matchStatistic;
            console.log(stats.homeTeam);
            console.log(stats);
            results.push(stats);
            setTest(stats)
            let homeTeamForUpdateStats = league.filter(team => team.team.name === test.homeTeam)
            let awayTeamForUpdateStats = league.filter(team => team.team.name === test.awayTeam)
            homeTeamForUpdateStats[0].team.conceededgoals += Number(test.awayGoals)
            homeTeamForUpdateStats[0].team.draws += Number(test.awayGoals) === Number(test.homeGoals) ? 1 : 0;
            homeTeamForUpdateStats[0].team.loses += Number(test.awayGoals) > Number(test.homeGoals) ? 1 : 0
            homeTeamForUpdateStats[0].team.points += Number(test.awayGoals) < Number(test.homeGoals) ? 3 : 0
            homeTeamForUpdateStats[0].team.scoredgoals += Number(test.homeGoals)
            homeTeamForUpdateStats[0].team.wins += Number(test.awayGoals) < Number(test.homeGoals) ? 1 : 0
            awayTeamForUpdateStats[0].team.conceededgoals += Number(test.awayGoals)
            awayTeamForUpdateStats[0].team.draws += Number(test.awayGoals) === Number(test.homeGoals) ? 1 : 0;
            awayTeamForUpdateStats[0].team.loses += Number(test.awayGoals) < Number(test.homeGoals) ? 1 : 0
            awayTeamForUpdateStats[0].team.points += Number(test.awayGoals) > Number(test.homeGoals) ? 3 : 0
            awayTeamForUpdateStats[0].team.scoredgoals += Number(test.homeGoals)
            awayTeamForUpdateStats[0].team.wins += Number(test.awayGoals) > Number(test.homeGoals) ? 1 : 0
            console.log(homeTeamForUpdateStats[0].team, awayTeamForUpdateStats)
        }

        setAllResults((prev) => [...prev, results]);
        setResults((prev) => [...prev, results]);
        return results;
    };

    // const handleFinishMatch = () => {
    //     let arrayMainMatch = [awayTeamName, homeTeamName, awayGoals, homeGoals];

    //     setAllResults((prev) => [...prev, arrayMainMatch]);
    //     setResults((prev) => [...prev, arrayMainMatch]);
    //     console.log(simulateAllGamesFromTheLeg());

    //     // setShowNextRound(true);
    //     setMatchStarted(false);
    //     setShowNextRoundButton(true);
    // };

    const handleFinishMatch = () => {
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

            setMatchStarted(false);
            setShowNextRoundButton(true);
        } else {
            console.log("HomeTeam or AwayTeam is null");
        }
    };

    console.log(results)

    return (
        <div className="match-container">
            {!matchStarted && (
                <Button variant="contained" size="large" onClick={handleStartMatch}>Start Match</Button>
            )}
            {matchSimulator?.matchStatistic && (
                showMatchInfo && (
                <>
                    <div className="result-teams-container">
                        <div className="home-team-container">
                            <h2>{homeTeamName}</h2>
                            <h2>{homeGoals}</h2>
                        </div>
                        <span>-</span>
                        <div className="away-team-container">
                            <h2>{awayTeamName}</h2>
                            <h2>{awayGoals}</h2>
                        </div>
                        <h4>Time: {matchSeconds} seconds</h4>
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
                )

            )}
            {matchStarted && (
               <Button variant="contained" onClick={handleFinishMatch}>Finish Match</Button>
            )}
            {!matchStarted && showNextRoundButton && (
               <Button variant="contained" onClick={handleNextRound}>Next Round</Button>
            )}


        </div>
    );
}

