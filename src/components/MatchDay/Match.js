import "./Match.scss";
import MatchSimulator from "./simulatorBeta";
import { Team, Statistic } from "./simulatorBeta";
import { useState, useEffect, useRef } from "react";

export default function MatchDay() {
    const [matchStarted, setMatchStarted] = useState(false);
    const [matchStatistic, setMatchStatistic] = useState(null);
    const [round, setRound] = useState(
        JSON.parse(localStorage.getItem("fixtures"))[0]
    );
    const [legOne, setLegOne] = useState(round.splice(0, 5));
    const [legTwo, setLegTwo] = useState(round.splice());
    const [homeTeam, setHomeTeam] = useState(
        new Team(legOne[0][0].team.name, legOne[0][0].team.players)
    );
    const [awayTeam, setAwayTeam] = useState(
        new Team(legOne[0][1].teamName, legOne[0][1].team.slice(0, 11))
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
    const [count, setCount] = useState(0);
    const [awayBadge, setAwayBadge] = useState(0);
    const [homeBadge, setHomeBadge] = useState(0);

    const handleStartMatch = () => {
        setMatchStarted(true);

        setMatchSimulator(new MatchSimulator(homeTeam, awayTeam));
        setMatchStatistic(matchSimulator?.matchStatistic);
    };

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCount((prevCount) => prevCount + 1);
        }, 1000);

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

        return () => clearInterval(intervalId);
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
    ]);

    const handleFinishMatch = () => {
        console.log("finish");
    };
    console.log(matchSimulator)
    return (
        <div className="match-container">
            {!matchStarted && (
                <button onClick={handleStartMatch}>Start Match</button>
            )}
            {matchSimulator?.matchStatistic && (
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
                        <div className="time-count">{count}</div>
                    </div>

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
                </>

                // <div>
                //     <div>{awayTeamName}</div>
                //     <div>{awayGoals}</div>
                //     <div>{awayCorners}</div>
                //     <div>{awayFouls}</div>
                //     <div>{awayPossession}</div>
                //     <div>{awayYellowCards}</div>
                //     <div>{awayRedCards}</div>
                //     <div>{awayShotsOnTarget}</div>
                //     <div>{awayThrowIns}</div>
                //     <div>:</div>
                //     <div>{homeTeamName}</div>
                //     <div>{homeGoals}</div>
                //     <div>{homeCorners}</div>
                //     <div>{homeFouls}</div>
                //     <div>{homePossession}</div>
                //     <div>{homeYellowCards}</div>
                //     <div>{homeRedCards}</div>
                //     <div>{homeShotsOnTarget}</div>
                //     <div>{homeThrowIns}</div>
                // </div>
            )}
            {matchStarted && (
                <button onClick={handleFinishMatch}>Finish Match</button>
            )}
        </div>
    );
}
// awayCornerKicks
// :
// 1
// awayFouls
// :
// 0
// awayGoals
// :
// 1
// awayPossession
// :
// 60
// awayRedCards
// :
// 0
// awayShotsOnTarget
// :
// 4
// awaySubstitutions
// :
// 0
// awayTeam
// :
// "Kopachite"
// awayThrowIns
// :
// 0
// awayYellowCards
// :
// 0
// homeCornerKicks
// :
// 1
// homeFouls
// :
// 2
// homeGoals
// :
// 0
// homePossession
// :
// 40
// homeRedCards
// :
// 0
// homeShotsOnTarget
// :
// 1
// homeSubstitutions
// :
// 3
// homeTeam
// :
// "Newcastle"
// homeThrowIns
// :
// 2
// homeYellowCards
// :
// 0
