import "./Match.scss";
import MatchSimulator from "./simulatorBeta";
import { Team, Statistic } from "./simulatorBeta";
import { useState, useEffect } from "react";

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
    console.log(homeTeam, awayTeam);

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
    const handleStartMatch = () => {
        setMatchStarted(true);

        const matchSimulator = new MatchSimulator(homeTeam, awayTeam);
        setMatchStatistic(matchSimulator.matchStatistic);
    };

    useEffect(() => {
        setAwayCorners(matchStatistic?.awayCornerKicks);
        setAwayFouls(matchStatistic?.awayFouls);
        setAwayGoals(matchStatistic?.awayGoals);
        setAwayPossession(matchStatistic?.awayPossession);
        setAwayRedCards(matchStatistic?.awayRedCards);
        setAwayShotsOnTarget(matchStatistic?.awayShotsOnTarget);
        setAwayGoals(matchStatistic?.awayGoals);
        setAwayTeamName(matchStatistic?.awayTeam);
        setAwayYellowCards(matchStatistic?.awayYellowCards);

        setHomeCorners(matchStatistic?.homeCornerKicks);
        setHomeFouls(matchStatistic?.homeFouls);
        setHomeGoals(matchStatistic?.homeGoals);
        setHomePossession(matchStatistic?.homePossession);
        setHomeRedCards(matchStatistic?.homeRedCards);
        setHomeShotsOnTarget(matchStatistic?.homeShotsOnTarget);
        setHomeGoals(matchStatistic?.homeGoals);
        setHomeTeamName(matchStatistic?.homeTeam);
        setHomeYellowCards(matchStatistic?.homeYellowCards);
    }, [
        // awayCorners,
        // awayGoals,
        // awayFouls,
        // awayPossession,
        // awayRedCards,
        // awayShotsOnTarget,
        // awayThrowIns,
        // awayYellowCards,
        // homeCorners,
        // homeGoals,
        // homeFouls,
        // homePossession,
        // homeRedCards,
        // homeShotsOnTarget,
        // homeThrowIns,
        // homeYellowCards,
    ]);
    console.log(matchStatistic);
    return (
        <div className="match-container">
            {!matchStarted && (
                <button onClick={handleStartMatch}>Start Match</button>
            )}
            {matchStatistic && (
                <div>
                    <div>{awayTeamName}</div>
                    <div>{awayCorners}</div>
                    <div>{awayGoals}</div>
                    <div>{awayFouls}</div>
                    <div>{awayPossession}</div>
                    <div>{awayYellowCards}</div>
                    <div>{awayRedCards}</div>
                    <div>{awayShotsOnTarget}</div>
                    <div>{awayThrowIns}</div>
                    <div>:</div>
                    <div>{homeTeamName}</div>
                    <div>{homeCorners}</div>
                    <div>{homeGoals}</div>
                    <div>{homeFouls}</div>
                    <div>{homePossession}</div>
                    <div>{homeYellowCards}</div>
                    <div>{homeRedCards}</div>
                    <div>{homeShotsOnTarget}</div>
                    <div>{homeThrowIns}</div>
                </div>
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
